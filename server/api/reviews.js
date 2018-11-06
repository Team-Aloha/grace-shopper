const router = require('express').Router()
const {Order, Product, Cart, User, Review} = require('../db/models')

const {isLoggedIn, adminsOnly} = require('../utils/apiMiddleware')

router.get('/', isLoggedIn, async (req, res, next) =>{
  try {
    const reviews = await Review.findAll()
    res.json(reviews)
  } catch (err) {
    next(err)
  }
})

router.get('/:productId', async (req, res, next) => {
  try {
    const reviews = await Review.findAll({
      where: {
        productId: productId
      }
    })
    res.json(reviews)
  } catch (err) {
    next(err)
  }
})

module.exports = router
