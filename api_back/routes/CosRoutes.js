const fs = require('fs')
const withAuth = require('./AuthRoutes')


module.exports = (app, db) => {
    
    const cosModel = require('../models/CosModel')(db)

    // ***** ROUTES ******* //

    app.get('/api/v1/cosmetics', async(req, res, next) => {
        const products = await cosModel.getAllCosmetics()
        products.code ? res.json({code : 500 , msg: "une erreur est survenue", result : products }):
        res.json({code : 200, msg: "working fine", result : products})  
    })

    //route permettant de récuperer une seule Cosmetique
    app.get("/api/v1/one/:id" , async(req, res, next) => {
        let id = req.params.id
        const  data =  await cosModel.getOneCosmetics(id)
        data.code ? res.json({code : 500, msg : "une erreur est survenue"}):
        res.json({code : 200 , msg : "l'article a bien eté trouvé" , result : data[0]})   
    })

    //route permettant d'enregistrer un seul Cosmetique:
    app.post('/api/v1/newCosmetic', async(req, res, next) => {
        const product  = await cosModel.saveOneCosmetics(req)
        product.code ? res.json({code: 500, msg: "une erreur est survenue"}):
        res.json({code : 200, msg: "votre produit a bien eté enregistré"})
    })

    //route d'ajout d'une image dans l'api (stock une image et retourne au front le nom de l'image stocké)
    app.post('/api/v1/pic', async(req, res, next) => {
        !req.files || Object.keys(req.files).length === 0 && res.json({code : 400, msg : "impossible de recuperer la photo"})
        req.files.image.mv("public/img" + req.files.image.name, (err) => {
           err && res.json({ code : 500, msg: "l'image a pas pu etre save"})
        })
        res.json({code : 200, msg: "image bien enregistré", url : req.files.image.name})
    })

    //route permettant de modifier une bière
    app.put('/api/v1/modifyCos/:id', async(req, res, next) => {
        let id = req.params.id
        const data = await cosModel.modifyOneCosmetics(req, id)
        data.code ? res.json({code: 500, msg: "une erreur est survenue"}): 
        res.json({code : 200 , msg: "votre produit a bien eté modifié"})
    })

    //route permettant de supprimer une bière
    app.delete('/api/v1/deleteCos/:id', async(req, res, next)=> {
        let id = req.params.id
        const data = await cosModel.deleteOneCosmetics(id)
        data.code ? res.json({code : 500, msg : "une erreur est survenue"}):
        res.json({code: 200 , msg : "votre produit a eté supprimé avec succés"})
    })

}
