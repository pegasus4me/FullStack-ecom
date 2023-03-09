const jwt = require('jsonwebtoken')
const secret = "meilleure boutique de la terre"

const withAuth = (req, res, next) => {
    
   const token = req.headers['x-access-token']
    console.log(token)
   if(token === undefined) {
        res.json({code : 404 , msg : "token not found"})
   } else {
        jwt.verify(token, secret, (err, decoded) => {

            if(err) {
                res.json({code : 401 , msg : "error : token id invalid"})
            } else {
                req.id = decoded.id
                next()
            }
        })
   }
}
module.exports = withAuth