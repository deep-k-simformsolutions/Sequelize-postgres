const express = require('express')
const Cart = require('../model/cart')
const CartItem=require('../model/cart-item')
const auth = require('../middleware/auth')
const Product = require('../model/product')

const router = express.Router()

router.post('/cart',auth,async (req,res)=>{
    try {
        const cart = await req.user.createCart()
        res.send(cart)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/cartitem',auth,async(req,res)=>{
    try {
        const cart = await req.user.getCart()
        let product = await cart.getProducts({where:{id:req.query.id}})
        if(product.length > 0){
            const oldquantity = product[0].cartitem.quantity
            await cart.addProduct(product,{through:{quantity:oldquantity+1}})
        }
        else{
            product = await Product.findByPk(req.query.id)
            await cart.addProduct(product,{through:{quantity:1}})
        }
        res.redirect('/cartitem')
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/cart',auth,async(req,res)=>{
    
    try {
        const cart = await req.user.getCart()
        res.send(cart) 
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/cartitem',auth,async (req,res)=>{
    try {
        const cart = await req.user.getCart()
        res.send(await cart.getProducts())
    } catch (error) {
        res.status(400).send()
    }
})

module.exports = router 