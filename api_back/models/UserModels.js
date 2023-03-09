const bcrypt = require('bcrypt')
const saltRounds = 10

module.exports = (_db) => {
    db=_db
    return UserModel
}
class UserModel {
    static saveOneUser(req){
        let data = 'INSERT INTO users (firstName, lastName, email, password, role, address, zip, city, phone, creationTimestamp) VALUES (?, ?, ?, ?, "user", ?, ?, ?, ?, NOW())'
          return bcrypt.hash(req.body.password, saltRounds)
        .then((hash) => {
            return  db.query(data,[req.body.firstName, req.body.lastName, req.body.email, hash, req.body.address, req.body.zip, req.body.city, req.body.phone])
            .then(res => res)
            .catch(err => err)
        })
        .catch(err => console.log(err))
    }
    
    static getUserByEmail(email){
        let data = "SELECT * FROM users WHERE email = ?"
        return db.query(data,[email])
        .then(res => res)
        .catch(err => err)
        
    }
    
    static getOneUser(id){
        let data = "SELECT * FROM users WHERE id = ?"
        return db.query(data,[id])
        .then(res => res)
        .catch(err => err)
        
    }
    
    static updateUser(req, userId){
        let data = "UPDATE users SET firstName = ?, lastName = ?, email = ?, password = ?, role = ?, address = ?, zip = ?, city = ?, phone = ?, creationTimestamp = NOW() , connexionTimestamp = null WHERE id = ?"
        return bcrypt.hash(req.body.password, saltRounds)
        .then((hash) => {
            return db.query(data,[req.body.firstName, req.body.lastName, req.body.email, hash, req.body.role, req.body.address, req.body.zip, req.body.city, req.body.phone, userId])
            .then(res => res)
            .catch(err => err)
        })
        .catch(err => err)
        
    }

    // static updateConnectionUser(id){
    //     let data = ""
        
    // }
}