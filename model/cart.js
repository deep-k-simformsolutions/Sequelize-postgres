const {DataTypes, STRING} = require('sequelize')

const sequelize = require('../db/database')

const Cart = sequelize.define('cart',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    }
})

module.exports = Cart