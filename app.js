const express = require('express')
const productRouter = require('./router/product')
const app = express()
const sequelize = require('./db/database')

const Product = require('./model/product')
const User = require('./model/user')

User.hasMany(Product,{onDelete:'CASCADE'})
Product.belongsTo(User)

app.use(express.json())
app.use(productRouter) 

sequelize.sync().then((product)=>{
    app.listen('3000',()=>{
        console.log('Server on port 3000')
    })   
}).catch(()=>{
    console.log('can not connect')
})
