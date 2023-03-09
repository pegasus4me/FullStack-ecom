const express  = require('express')
const app = express()
// ********************



const cors  = require('cors')
app.use(cors())

const fileUpload =  require('express-fileupload')
app.use(fileUpload({
    createParentPath : true
}))

/* parse les url*/
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(express.static(__dirname+'/public'))


let config;
if(!process.env.HOST){
    config = require("./config-offline")
} else {
    config = require('./config')
}

// connection to the database
const host = process.env.HOST || config.db.host
const database = process.env.DATABASE_DB || config.db.database
const user = process.env.USER_DB || config.db.user
const password  = process.env.PASSWORD || config.db.password

// ********** IMPORT ROUTES *********** //
const cos_routes = require('./routes/CosRoutes')
const user_routes = require('./routes/UserRoutes')
const order_routes = require('./routes/OrderRoutes')
const auth_routes = require('./routes/AuthRoutes')
// ************************************ //
const mysql = require('promise-mysql')
mysql.createConnection({
    host: host,
    database: database,
    user: user,
    password: password
}).then((db) => {

    setInterval(async ()=>{
        let res = await db.query('SELECT 1')
    }, 10000)
    
    app.get('/', async(req, res, next) => {
        res.json({code : 200 , msg: "tout est ok!"})
    })
    //****** APPEL ROUTES ***********/
    cos_routes(app, db)
    auth_routes(app, db)
    user_routes(app, db)
    order_routes(app, db)
})
.catch((err) => {
    console.log(err)
})








// ********************************
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`listen...port ${PORT}`)
})