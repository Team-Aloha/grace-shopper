const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('orders', {
  status: {
    type: Sequelize.ENUM,
    values: ['processing', 'shipped', 'recieved']
  },
  products: {
    type: Sequelize.ARRAY(Sequelize.JSONB)
  }
})

module.exports = Order
