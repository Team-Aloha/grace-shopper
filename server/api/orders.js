const router = require('express').Router()
const {Order, Product, Cart} = require('../db/models')

/*TODO:
1.  make this check for quantity T_T
2. ...look where i can refactor to fetch from cart instead of getting info from server
^^ however i need this logic anyway for getting info from non logged in
*/

//this is a test post route for unittests ONLY
router.post('/test', async (req, res, next) => {
  try {
    //only allow this route to be ran during testing
    if (process.env.NODE_ENV === 'test') {
      const {products} = req.body
      const order = await Order.create({
        status: 'processing',
        userId: req.user.id,
        products
      })

      res.json(order)
    }
  } catch (err) {
    next(err)
  }
})

//taking an order
router.post('/', async (req, res, next) => {
  try {
    const {products} = req.body

    //create array of IDs so we can fetch the price info from Product
    const ids = products.map(item => item.id)
    const productInfo = await Product.findAll({
      where: {
        id: {$in: ids}
      },
      attributes: ['id', 'price']
    })

    //make order array...
    //order array needs to have a products with: [{id, quantity, price}]
    const orderProducts = products.map(item => {
      const {id, quantity} = item

      //filter found products to find  the price that matches the id
      const foundPrice = productInfo.filter(prod => {
        if (+id === +prod.id) {
          return prod
        }
      })

      //foundPrice is now an array of size 1 so pull price from it
      const {price} = foundPrice[0]
      return {id, quantity, price}
    })

    //orderProducts is now what we will send to our orders DB!!
    //first lets delete the cart
    if (req.user) {
      //only need to delete cart for a logged in user
      await Cart.update(
        {products: []},
        {returning: true, where: {userId: req.user.id}}
      )
    }

    //make new order
    await Order.create({
      products: orderProducts,
      userId: req.user.id || null
    })
    res.json(orderProducts)
  } catch (err) {
    next(err)
  }
})

router.put('/:orderId', async (req, res, next) => {
  const {status} = req.body
  try {
    const updatedOrder = await Order.update(
      {status},
      {
        returning: true,
        where: {id: req.params.orderId}
      }
    )
    res.json(updatedOrder[1])
  } catch (err) {
    next(err)
  }
})
router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({where: {userId: req.user.id}})
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

module.exports = router
