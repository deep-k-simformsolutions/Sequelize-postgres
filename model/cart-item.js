const {DataTypes, STRING} = require('sequelize')

const sequelize = require('../db/database')

const CartItem = sequelize.define('cartitem',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    quantity:{
        type:DataTypes.INTEGER
    }
})

module.exports = CartItem