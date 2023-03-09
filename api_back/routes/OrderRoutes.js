const stripe = require('stripe')('YOUR SK_TEST')
const withAuth = require('../withAuth')

module.exports = (app, db) => {
        
        const orderModels = require('../models/OrderModels')(db)
        const cosModels = require('../models/CosModel')(db)
        const userModels = require('../models/UserModels') (db)
    
   //*route de sauvegarde d'une commande
    
   app.post('/api/v1/saveOrder', async(req, res, next) => {
        let totalAmount = 0
        let userId = req.params.id
         //enregistrement de l'order (fonction)
        const register = await orderModels.saveOneOrder(userId, totalAmount)
        //on récup dans l'objet de réponse l'insertId (l'id qu'il vient d'insérer dans le bdd)
        const insertId = register.insertId 
                
        //on boucle sur le panier passé dans req.body.basket (pour enregistrer le detail de chaque produit)
    
        req.body.basket.map(async (b) => { 
        
        //on récup les infos d'un cosmetique par son id 
            let cosmetic = await cosModels.getOneCosmetics(b.id)
            //on ajoute une propriété safePrice à l'objet du tour de boucle en lui affectant le prix de beer en chiffre à virgule
            b.savePrice = parseFloat(cosmetic[0].price)
            //on appel la fonction pour sauvegarder un détail de cette commande en envoyant l'id de la commande et le produit du tour de boucle
            const save = await orderModels.saveOneOrderDetail( insertId, b)
            //on additionne au totalAmount la quantité du produit demandé multiplié par le safePrice
            totalAmount += parseInt(b.quantityInCart)* parseFloat(b.savePrice)
            //on met à jour le montant total de la commmande (fonction)
            const update = await orderModels.updateTotalAmount(insertId, totalAmount)
        })
        //on retourne le json de 200 avec l'id de la commande qu'on vient d'enregistrer
        res.json({code : 200, orderId:  insertId})
    })
    
    
   //* route de gestion du paiement (va analyser le bon fonctionnement du paiement)
    
   app.post('/api/v1/payment',withAuth, async(req, res, next) => {
        
        let data = await orderModels.getOneOrder(req.params.id)
        const paymentIntent = await stripe.paymentIntents({
                amount: data[0].totalAmount*100, 
                currency: 'eur',
                metadata: {integration_check: 'accept_a_payment'},
                receipt_email: req.body.email 
        })
        res.json({client_secret: paymentIntent['client_secret']})
    })
    
    
   //*route de modification du status de paiement de la commande
    app.put('/api/v1/updateStatut' , async(req, res, next) => {
        let data = await orderModels.updateStatus(req.params.id, req.body.status)
        data.code ? res.json({code : 500, msg:  "une errerur es survenue"}) : 
        res.json({code : 200, msg : 'status mis a jour avec succés'})
    })   


    app.get('/api/v1/order/all', withAuth, async (req, res, next)=>{
        let orders = await orderModels.getAllOrders()
        if(orders.code){
            res.json({status: 500, msg: "Erreur", err: orders})
        }
        res.json({status: 200, result: orders})
    })

    //route de récupération d'une commande
    app.get('/api/v1/order/getOneOrder/:id', withAuth, async (req, res, next) =>{
        let id = req.params.id
        let order = await orderModels.getOneOrder(id)
        console.log(order)
        if(order.code){
            res.json({code: 500, msg: "Erreur", err: order})
        }else{
             //on peut récupérer les infos de l'utilisateur
            let user = await userModels.getOneUser(order[0].user_id)
             if(user.code){
                res.json({code: 500, msg: "Erreur", err: user})
             }else{
                 let myUser = {
                    firstName: user[0].firstName,
                    lastName: user[0].lastName,
                    address: user[0].address,
                    zip: user[0].zip,
                    city: user[0].city,
                    phone: user[0].phone,
                 }
                 //récupération des détails de la commande
                let details = await orderModels.getAllDetails(id)
                if(details.code){
                    res.json({code: 500, msg: "Erreur", err: details})
                }
                res.json({code: 200, order: order[0], user: myUser, orderDetail: details})
             }
        }
    })

}