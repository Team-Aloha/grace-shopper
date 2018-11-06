const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('reviews', {
  stars: {
    type: Sequelize.INTEGER,
    validate: {
      max: 5,
      min: 0
    }
  },
  text: {
    type: Sequelize.TEXT,
    validate: {
      len: {
        args: [15, 250],
        msg: "Review must be between 15 and 250 characters"
      }
    }
  }
})

module.exports = Review
