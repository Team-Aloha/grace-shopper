const router = require('express').Router()
const {Cart} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const cart = await Cart.findOrCreate({
      where: {userId: req.user.id}
    })
    res.json(cart[0])
  } catch (err) {
    next(err)
  }
})

router.put('/add', async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: {userId: req.user.id}
    })
    const {id, quantity} = req.body
    const newProducts = cart.products
    //now check if it is already in cart...add quantity if so

    let found = false
    newProducts.map(product => {
      if (product.id === req.body.id) {
        product.quantity += req.body.quantity
        found = true
      }
      return product
    })
    if (!found) newProducts.push({id, quantity})
    const [numRows, affectedRows] = await Cart.update(
      {products: newProducts},
      {
        where: {userId: req.user.id},
        returning: true
      }
    )
    res.json(affectedRows[0])
  } catch (err) {
    next(err)
  }
})

router.put('/remove', async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: {userId: req.user.id}
    })
    let found = false
    const newProducts = cart.products.filter(product => {
      if (product.id !== req.body.id) {
        return product
      } else found = true
    })
    if (!found) {
      res.json(cart)
    } else {
      const [numRows, affectedRows] = await Cart.update(
        {products: newProducts},
        {
          where: {userId: req.user.id},
          returning: true
        }
      )
      res.json(affectedRows[0])
    }
  } catch (err) {
    next(err)
  }
})

router.put('/quantity', async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: {userId: req.user.id}
    })
    const newProducts = cart.products
    //now check if it is already in cart...add quantity if so

    let found = false
    newProducts.map(product => {
      if (product.id === req.body.id) {
        product.quantity = req.body.quantity
        found = true
      }
      return product
    })
    if (!found) newProducts.push(req.body)
    const [numRows, affectedRows] = await Cart.update(
      {products: newProducts},
      {
        where: {userId: req.user.id},
        returning: true
      }
    )
    res.json(affectedRows[0])
  } catch (err) {
    next(err)
  }
})
module.exports = router
