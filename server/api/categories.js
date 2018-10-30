const router = require('express').Router()
const {Category} = require('../db/models')
const Sequelize = require('sequelize')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.findAll()
    res.json(categories)

  } catch (err) {
    next(err)
  }
})
