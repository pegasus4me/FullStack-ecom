const bcrypt = require('bcrypt')
const saltRounds = 10
//librairie qui va générer un token de connexion
const jwt = require('jsonwebtoken')
const secret = 'meilleure boutique de la terre'
const withAuth = require('../withAuth')

module.exports = (app, db)=>{
    const userModel = require('../models/UserModels')(db)
    
    //*route d'enregistrement d'un utilisateur
    
    app.post('/api/v1/register', async(req, res, next) => {

        console.log(req.body)
        // mail correct
        let verifyEmail = await userModel.getUserByEmail(req.body.email)
        if(verifyEmail.code){
            res.json({code: 500 , msg : "echec d'enregistrement", resultat : verifyEmail})
        }
        
        if(verifyEmail.length > 0){
            if(verifyEmail[0].email === req.body.email){
                res.json({status: 401, msg: "Email déjà utilisé."})
            }
        } else {
            // enregistrement user
            let user = await userModel.saveOneUser(req)
            console.log(user)
            if(user.code){
                
                res.json({code : 500, msg: "une erreur est survenue..."})
            }
            res.json({code: 200 , msg: "user enregistré"})
            
        }
    })
    
    //*route de connexion d'un utilisateur (c'est ici qu'on va créer le token et l'envoyer vers le front)
    
    app.post('/api/v1/login', async(req, res, next) => {
        
        if(req.body.mail === ""){
            res.json({code : 401, msg: "le mail ne peut pas etre vide"})
        }
        let user = await userModel.getUserByEmail(req.body.email)
        
        if(user.code){
            res.json({code : 500, msg: "une erreur est survenue..."})
        }
        
        if(user.length === 0 ) {
            res.json({code: 401, msg: "utilisateur introuvable..."})
        }
        // ---------------- password --------
        let compare = await bcrypt.compare(req.body.password, user[0].password)

        if(compare) {
            const payload = {id : user[0].id, firstName: user[0].firstName , email : user[0].email, lastName : user[0].lastName}
            const token = jwt.sign(payload, secret)
            res.json({code : 200, msg: "succes!" , msg : token , id : user[0].id})
        } else {
            res.json({code : 401, msg : "mot de passe incorrect"})
        }
        

    })

 
    
    //route de modification des utilisateurs
    app.put('/api/v1/modify/:id', async(req, res, next) => {
        let id = req.params.id
        let updateUser = await userModel.updateUser(req, id)
        if(updateUser.code) {

            res.json({code : 500, msg: "une erreur est survenue"})
        } else{
            res.json({code: 200 , msg : "user mis a jour"})
        }
        
    })

}