const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('orders', {
  status: {
    type: Sequelize.ENUM,
    values: ['processing', 'shipped', 'received', 'cancelled'],
    defaultValue: 'processing'
  },
  products: {
    type: Sequelize.ARRAY(Sequelize.JSONB)
  },
  address: {
    type: Sequelize.STRING
  },
  zip: {
    type: Sequelize.INTEGER
  },
  city: {
    type: Sequelize.STRING
  },
  state: {
    type: Sequelize.STRING
  }
})

module.exports = Order
