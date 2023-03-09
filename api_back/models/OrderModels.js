module.exports = (_db)=>{
    db = _db
    return OrderModel
}

class OrderModel {
    
    //validation d'une commande
    static saveOneOrder(userId, totalAmount){
        //le status sera "not payed" par défault
        let data = "INSERT INTO orders (user_id, totalAmount , creationTimestamp, status) VALUES (?, ?, NOW(), 'not payed')"
        return db.query(data, [totalAmount, userId])
        .then(res => res)
        .catch(err => err)
    }
    
    static saveOneOrderDetail(order_id, cosmetic){
        let data = "INSERT INTO orderdetails (order_id, beer_id, quantity, total) VALUES (?, ?, ?, ?) "
        let total = parseInt(cosmetic.quantityInCart) * parseFloat(cosmetic.savePrice)
        return db.query(data,[order_id, cosmetic.id, cosmetic.quantityInCart, total])
        .then(res => res)
        .catch(err => err)
    }
    
    static updateTotalAmount(order_id, totalAmount){
        let data = "UPDATE orders SET totalAmount = ? WHERE id  = ?"
        return db.query(data, [totalAmount, order_id])
        .then(res => res)
        .catch(err => err)
    }
    
    static getOneOrder(id){
        let data = "SELECT * FROM orders WHERE id = ?"
        return db.query(data, [id])
        .then(res => res)
        .catch(err => err)
    }
    
    static updateStatus(orderId, status){
        let data = "UPDATE orders SET status = ? WHERE id = ?"
        return db.query(data, [orderId, status])
        .then(res => res)
        .catch(err => err)
    }

    //récupération de toutes les commandes
    static getAllOrders(){
        return db.query('SELECT * FROM orders')
        .then((res)=>{
            return res
        })
        .catch((err)=>{
            return err
        })
    }

    //récupération des détails d'une commande
    static getAllDetails(orderId){
        let order = 'SELECT orderdetails.id, orderdetails.quantity, total, name, description, photo FROM orderdetails INNER JOIN cosmetics ON cosmetics.id = orderdetails.cosmetics_id WHERE order_id = ?'
        console.log(order)
        return db.query(order, [orderId])
        .then((response)=>{
            return response
        })
        .catch((err) => {
            return err
        })
    }
    

}