const router = require('express').Router()
const {Product} = require('../db/models')
const Sequelize = require('sequelize')
module.exports = router
const {adminsOnly} = require('../utils/apiMiddleware')

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      order: ['id']
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId)
    res.json(product)
  } catch (err) {
    next(err)
  }
})

router.get('/category/:category', async (req, res, next) => {
  try {
    const category = await Product.findAll({
      where: {
        categories: {
          [Sequelize.Op.contains]: [req.params.category]
        }
      }
    })
    res.json(category)
  } catch (err) {
    next(err)
  }
})

router.post('/', adminsOnly, async (req, res, next) => {
  try {
    const {title, price, description, quantity, categories, imageUrl} = req.body
    const newProduct = await Product.create({
      title,
      price,
      description,
      quantity,
      categories,
      imageUrl
    })

    res.json(newProduct)
  } catch (err) {
    next(err)
  }
})

router.put('/:productId', adminsOnly, async (req, res, next) => {
  try {
    const {title, price, description, quantity, categories, imageUrl} = req.body
    const updatedProduct = await Product.update(req.body, {
      returning: true,
      where: {id: req.params.productId}
    })
    res.json(updatedProduct[1])
  } catch (err) {
    next(err)
  }
})

router.get('/search/:term', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: {
        [Sequelize.Op.or]: [
          {title: {[Sequelize.Op.like]: '%' + req.params.term + '%'}},
          {description: {[Sequelize.Op.like]: '%' + req.params.term + '%'}}
        ]
      }
    })
    res.json(products)
  } catch (error) {
    next(error)
  }
})
