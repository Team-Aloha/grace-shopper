const router = require('express').Router()
const {Cart} = require('../db/models')

router.get('/', async (req, res, next) => {
  console.log(req.user.id)
  try {

    const cart = await Cart.findAll()
    res.json(cart)

  } catch (err) {
    next(err)
  }

})


module.exports = router
