const express = require('express')
const Product = require('../model/product')
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/product',auth,async (req, res) => {
    try {
        await Product.sync()
        //const product = Product.build({...req.body,userId:req.user.id})
        const product = await req.user.createProduct(req.body)               //method ==> req.user.createModelname({})  ==>Magic association method
        //await product.save()
        res.send(product)
    } catch (error) {
        res.status(400).send(error)
    }
})
router.get('/product',auth,async (req, res) => {
    try {
        const product = await req.user.getProducts({where:{id:req.query.id}})
        //const product = await Product.findAll()
        if (!product) {
            res.status(404).send('Product not found')
        }
        res.send(product)
    } catch (error) {              
        res.status(400).send(error)
    }
})
router.patch('/product/:id', async (req, res) => {
    const keyArray = ['title', 'price', 'description']
    const updateArray = Object.keys(req.body)
    const isContain = updateArray.every((updatekey) => {
        return keyArray.includes(updatekey)
    })
    if (!isContain) {
        res.send('invalid key')
    }
    try {
        const product = await Product.findByPk(req.params.id)
        updateArray.forEach((updatekey) => {
            product[updatekey]= req.body[updatekey]
        })
        await product.save()
        res.send(product)
    } catch (error) {
        res.status(400).send(error)
    }
})
router.delete('/product/:id',async (req,res)=>{
    try {
        const product = await Product.findByPk(req.params.id)
        await product.destroy()
        res.redirect('/product')
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router