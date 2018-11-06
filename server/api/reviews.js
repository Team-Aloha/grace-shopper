const router = require('express').Router()
const {Order, Product, Cart, User, Review} = require('../db/models')

const {isLoggedIn, adminsOnly} = require('../utils/apiMiddleware')

router.get('/', async (req, res, next) =>{
  try {
    const reviews = await Review.findAll({
      include: [
        {model: User}
      ]
    })
    res.json(reviews)
  } catch (err) {
    next(err)
  }
})

router.get('/:productId', async (req, res, next) => {
  try {
    const reviews = await Review.findAll({
      where: {
        productId: req.params.productId
      }
    })
    res.json(reviews)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {stars, text} = req.body.review
    const {productId} = req.body
    console.log(req.body, 'req.body')
    const newReview = await Review.create({
      stars,
      text,
      productId
    })
    res.json(newReview)
  } catch (err) {
    next(err)
  }
})
module.exports = router
