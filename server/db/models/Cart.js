const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  products: {
    type: Sequelize.ARRAY(Sequelize.JSONB),
    defaultValue: []
  }
})

module.exports = Cart
