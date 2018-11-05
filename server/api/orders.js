const router = require('express').Router()
const {Order, Product, Cart} = require('../db/models')

const {isLoggedIn, adminsOnly, testingOnly} = require('../utils/apiMiddleware')
const stripe = require('stripe')(process.env.EXPRESS_STRIPE_KEY)
/*TODO:

look where i can refactor to fetch from cart instead of getting info from server
however i need this logic anyway for getting info from non logged in...so mayvbe
not do this
*/

router.get('/', isLoggedIn, async (req, res, next) => {
  try {
    const orders = await Order.findAll({where: {userId: req.user.id}})
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.put('/:orderId', adminsOnly, async (req, res, next) => {
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

//this is a test post route for unittests ONLY
router.post('/test', testingOnly, async (req, res, next) => {
  try {
    //only allow this route to be ran during testing
    const {products} = req.body
    const order = await Order.create({
      status: 'processing',
      userId: req.user.id,
      products
    })

    res.json(order)
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
      // console.log(productInfo)

      const updatedProducts = []
      const orderProducts = products.map(item => {
        const {id, quantity} = item

        //filter found products to find  the price that matches the id

        const foundPrice = productInfo.filter(prod => {
          if (+id === +prod.id) {
            // console.log('found item has id ', id)
            // console.log('we want to buy ', quantity)
            // console.log('on server it has ', prod.quantity)
            if (+prod.quantity >= +quantity) {
              //this item is allowed to be purchased. push it to updatedProducts
              //updateProducts contains the new quantity that will be
              //posted in the database
              updatedProducts.push({id, quantity: prod.quantity - quantity})
            } else {
              //if there is not enough quantity, send fail status with msg
              response.status = 'failed'
              response.message.push(
                `There are not enough ${prod.title} in stock`
              )
            }
            return prod
          }
        })
        //foundPrice is now an array of size 1 so pull price from it
        const {price} = foundPrice[0]
        return {id, quantity, price}
      })
      // console.log('DEBUG')
      // console.log(updatedProducts)
      // console.log(orderProducts)

      //orderProducts is now what we will send to our orders DB!!
      //if we have failed, no need to do anything else
      console.log('MAKING AN ORDER with ', orderProducts)
      if (response.status !== 'failed') {
        console.log('TIME TO ACCUM')
        let totalPrice = 0
        orderProducts.forEach(prod => {
          totalPrice += +prod.quantity * +prod.price
        })
        console.log(req.body.token)
        //if logged in, delete cart
        const charge = await stripe.charges.create({
          amount: totalPrice,
          currency: 'usd',
          description: 'test order',
          source: req.body.token.id
        })
        console.log(charge)
        if (charge.status === 'succeeded') {
          if (req.user) {
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
          //update database for updated quantity
          updatedProducts.forEach(async newProduct => {
            await Product.update(
              {quantity: newProduct.quantity},
              {where: {id: newProduct.id}}
            )
          })
          response.status = 'success'
          response.message = orderProducts
        } else {
          response.status = 'failed'
          response.message.push('Stripe error!')
        }
      }
    } //end of else
    let status
    if (response.status === 'failed') {
      status = 400
    } else status = 200
    res.status(status).json(response)
  } catch (err) {
    next(err)
  }
})

module.exports = router
