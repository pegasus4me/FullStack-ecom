const withAuth = require('../withAuth')
const jwt = require('jsonwebtoken')
const secret = 'meilleure boutique de la terre'



module.exports = (app, db) => {
    const userModel = require('../models/UserModels')(db)
    app.get('/api/v1/user/checkToken', withAuth , async(req, res, next) => {
        const data = await userModel.getOneUser(req.id)
        data.code ?  res.json({code : 500, err : data}) : 
        res.json({code: 200 , msg : "user trouvé" , user : data[0]})
    })

}
