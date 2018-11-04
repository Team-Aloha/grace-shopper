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
    //create response object
    const response = {
      status: '',
      message: []
    }
    if (products.length === 0) {
      response.status = 'fail'
      response.message.push('No blank orders')
    } else {
      console.log('DEBUG: do we continue')
      //create array of IDs so we can fetch the price info from Product
      const ids = products.map(item => item.id)
      const productInfo = await Product.findAll({
        where: {
          id: {$in: ids}
        },
        attributes: ['id', 'title', 'price', 'quantity']
      })

      //make order array...
      //order array needs to have a products with: [{id, quantity, price}]
      //also need to check if quantity allows order here
      console.log(productInfo)

      const updatedProducts = []
      const orderProducts = products.map(item => {
        const {id, quantity} = item

        //filter found products to find  the price that matches the id
        //maybe add a check here if quantity is allowed?

        const foundPrice = productInfo.filter(prod => {
          if (+id === +prod.id) {
            console.log('found item has id ', id)
            console.log('we want to buy ', quantity)
            console.log('on server it has ', prod.quantity)
            if (+prod.quantity >= +quantity) {
              //this item is allowed to be purchased. push it to updatedProducts
              updatedProducts.push({id, quantity: prod.quantity - quantity})
            } else {
              response.status = 'failed'
              response.message.push(
                `There are not enough ${prod.title} in stock`
              )
            }
            return prod
          }
        })
        //check if we have failed here
        //foundPrice is now an array of size 1 so pull price from it
        const {price} = foundPrice[0]
        return {id, quantity, price}
      })
      console.log('DEBUG')
      console.log(updatedProducts)
      console.log(orderProducts)

      //orderProducts is now what we will send to our orders DB!!
      //first lets delete the cart
      if (response.status !== 'failed') {
        if (req.user) {
          //only need to delete cart for a logged in user
          await Cart.update(
            {products: []},
            {returning: true, where: {userId: req.user.id}}
          )
        }

        //make new order
        const logId = !req.user ? null : req.user.id
        await Order.create({
          products: orderProducts,
          userId: logId
        })
        response.status = 'success'
        response.message.push(orderProducts)
      }

      //update database
      updatedProducts.forEach(async newProduct => {
        await Product.update(
          {quantity: newProduct.quantity},
          {where: {id: newProduct.id}}
        )
      })
    } //end of else
    res.json(response)
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
