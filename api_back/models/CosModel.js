// ***** EXPORT  VERS =>  BEER ROUTES
module.exports = (_db) => {
    db = _db;
    return CosModel;
}

// **** CLASS ****
class CosModel {

    static getAllCosmetics(){
        const data  = "SELECT * FROM cosmetics"
        return db.query(data,[])
        .then(res => res)
        .catch(err=> err)
    }
    
    static getOneCosmetics(id){
        const data =  "SELECT * FROM cosmetics WHERE id = ?"
        return db.query(data, [id])
        .then(res => res)
        .catch(err => err)
    }
    
    static saveOneCosmetics(req){
        const data = "INSERT INTO cosmetics (name, description, price, photo, quantity, creationTimestamp) VALUES (?, ?, ?, ?, ?, NOW())"
        return db.query(data, [req.body.name, req.body.description, req.body.price, req.body.photo, req.body.quantity])
        .then(res => res)
        .catch( err => err)
    }
    
    static modifyOneCosmetics(req, id){
        const data = "UPDATE cosmetics SET name = ?,  description = ?, price = ?, photo = ?, quantity = ?, creationTimestamp = NOW() WHERE id = ? "
        return db.query(data, [req.body.name, req.body.description, req.body.price, req.body.photo, req.body.quantity, id])
        .then(res => res)
        .catch(err => err)
    }
    static deleteOneCosmetics(id){
        const data = "DELETE FROM cosmetics WHERE id = ?"
        return db.query(data, [id])
        .then(res => res)
        .catch(err => err)
    }
}


