const express = require('express')
const productRouter = require('./router/product')
const cartRouter = require('./router/cart')
const app = express()
const sequelize = require('./db/database')

const Product = require('./model/product')
const User = require('./model/user')
const Cart = require('./model/cart')
const CartItem = require('./model/cart-item')

User.hasMany(Product,{onDelete:'CASCADE'})
Product.belongsTo(User)
User.hasOne(Cart)
Cart.belongsTo(User) 
Cart.belongsToMany(Product,{through:CartItem})
Product.belongsToMany(Cart,{through:CartItem}) 

app.use(express.json())
app.use(productRouter)
app.use(cartRouter) 

sequelize.sync().then(result=>{
    return User.findByPk(1)
}).then(user=>{
    if(!user){
        return User.create({name:"deep",email:"dk@gmail.com"})
    }
    return user
}).then(user=>{
    //console.log(user)
    app.listen('3000',()=>{
        console.log('Server run on port 3000')
    })   
}).catch(()=>{
    console.log('can not connect port 3000')
})
