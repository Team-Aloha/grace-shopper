const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'defaultshirt.png'
  },
  categories: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    allowNull: false,

    validate: {
      isNotEmpty(categoryArray) {
        if (categoryArray.length === 0) {
          throw new Error('Must have at least one category!')
        }
      }
    }
  }
})

module.exports = Product
