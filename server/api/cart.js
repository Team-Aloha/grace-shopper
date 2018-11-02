const router = require('express').Router()
const {Cart} = require('../db/models')

router.get('/', async (req, res, next) => {
  //findorCreate a cart so every user has a cart when this is initialized
  try {
    const cart = await Cart.findOrCreate({
      where: {userId: req.user.id}
    })
    res.json(cart[0])
  } catch (err) {
    next(err)
  }
})

//route for adding an item to cart
//req.body is expected to be in this format:
// {id: ##, quantity: ##}
router.put('/add', async (req, res, next) => {
  try {
    //get user's current cart and set the products to
    //newProducts
    const cart = await Cart.findOne({
      where: {userId: req.user.id}
    })
    const {id, quantity} = req.body
    const newProducts = cart.products
    //now check if it is already in cart...add quantity if so

    let found = false
    newProducts.map(product => {
      //if product is in cart just add to its quantity
      if (product.id === req.body.id) {
        product.quantity = +product.quantity + +req.body.quantity
        found = true
      }
      return product
    })
    //if product is not in cart, push it to the end
    if (!found) newProducts.push({id, quantity})

    //update cart in database w/ new cart
    const [numRows, affectedRows] = await Cart.update(
      {products: newProducts},
      {
        where: {userId: req.user.id},
        returning: true
      }
    )
    //send new cart back to thunk request
    res.json(affectedRows[0])
  } catch (err) {
    next(err)
  }
})

//remove an item from cart
//req.body is expected to be in this format:
// {id: ##,}
router.put('/remove', async (req, res, next) => {
  try {
    const {id} = req.body
    //get current cart
    const cart = await Cart.findOne({
      where: {userId: id}
    })
    let found = false
    //filter, only return items that DONT match req.body.id
    const newProducts = cart.products.filter(product => {
      if (product.id !== req.body.id) {
        return product
      } else found = true
    })
    //if we didn't remove anything, just sent back the current
    //cart and don't update DB
    if (!found) {
      res.json(cart)
    } else {
      //we removed something from the cart so
      //update the database
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

//route for changing cart quantity
//req.body is expected to be in this format:
// {id: ##, quantity: ##}
//quantity is the NEW quantity
router.put('/quantity', async (req, res, next) => {
  try {
    const {id, quantity} = req.body
    //get current Cart in db
    const cart = await Cart.findOne({
      where: {userId: req.user.id}
    })
    const newProducts = cart.products
    //now check if it is already in cart...add quantity if so

    //map through products...if ID is found, update id
    let found = false
    newProducts.map(product => {
      if (product.id === id) {
        product.quantity = +quantity
        found = true
      }
      return product
    })
    //if ID is not found, append to the end of cart
    if (!found) newProducts.push(req.body)
    //update the database
    const [numRows, affectedRows] = await Cart.update(
      {products: newProducts},
      {
        where: {userId: req.user.id},
        returning: true
      }
    )
    //send back new cart
    res.json(affectedRows[0])
  } catch (err) {
    next(err)
  }
})
module.exports = router
