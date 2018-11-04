/* global describe beforeEach it */
const {expect} = require('chai')
const db = require('../db')
const {Order, Product} = require('../db/models')
const app = require('../index')
// const Cart = db.model('cart')
// const agent = require('supertest')(app)
const {
  createUserWithCart,
  createUserWithNoCart
} = require('../utils/createUsers')

describe('Category API routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/orders/', () => {
    beforeEach(async () => {
      await db.sync({force: true})
      await Product.bulkCreate([
        {
          title: 'Blue Shirt',
          description: 'This is a blue shirt',
          price: 1000,
          quantity: 20,
          categories: [1, 2]
        },
        {
          title: 'Red Shirt',
          description: 'This is a red shirt',
          price: 2000,
          quantity: 10,
          categories: [2, 3]
        },
        {
          title: 'Green Shirt',
          description: 'This is a green shirt',
          price: 1500,
          quantity: 15,
          categories: [4, 5]
        }
      ])
    })
    it('GET /api/orders returns empty array for no orders', async () => {
      const user = await createUserWithNoCart('cart@cart.com')

      const res = await user.get('/api/orders').expect(200)
      expect(res.body).to.be.an('array')
      expect(res.body.length).to.be.equal(0)
    })
    it('GET /api/orders returns an array of length 1 for user with 1 order', async () => {
      const user = await createUserWithNoCart('cart@cart.com')
      //use test method for posting so we don't have to
      //write cart logic yet
      await user
        .post('/api/orders/test')
        .send({products: [{id: 1, quantity: 1, price: 100}]})

      const res = await user.get('/api/orders').expect(200)
      expect(res.body).to.be.an('array')
      expect(res.body.length).to.be.equal(1)
    })
    it('GET /api/orders returns an array of length 2 for user with 2 order', async () => {
      const user = await createUserWithNoCart('cart@cart.com')
      await user
        .post('/api/orders/test')
        .send({products: [{id: 1, quantity: 1, price: 100}]})

      await user
        .post('/api/orders/test')
        .send({products: [{id: 2, quantity: 1, price: 200}]})

      const res = await user.get('/api/orders').expect(200)
      //console.log(res.body)
      expect(res.body).to.be.an('array')
      expect(res.body.length).to.be.equal(2)
    })

    it('POST /api/orders saves prices at time of purchase', async () => {
      const user = await createUserWithNoCart('cart@cart.com')
      const res = await user.post('/api/orders/').send({
        products: [{id: 2, quantity: 1}, {id: 1, quantity: 3}]
      })
      expect(res.body.message).to.be.an('array')
      expect(res.body.message.length).to.be.equal(2)
      expect(res.body.message[0].price).to.be.equal(2000)
      expect(res.body.message[1].price).to.be.equal(1000)
    })
    it('POST /api/orders clears cart for a logged in user', async () => {
      const user = await createUserWithCart('cart@cart.com')
      //user has this cart:
      //    products: [{id: 1, quantity: 2}, {id: 2, quantity: 2}]
      const res = await user.post('/api/orders/').send({
        products: [{id: 1, quantity: 2}, {id: 2, quantity: 2}]
      })

      // check if cart was emptied after purchase
      const cart = await user.get('/api/cart')
      expect(cart.body.products).to.be.an('array')
      expect(cart.body.products.length).to.be.equal(0)
    })
    it('POST /api/orders makes 1 order if posted once', async () => {
      const user = await createUserWithCart('cart@cart.com')

      await user.post('/api/orders/').send({
        products: [{id: 1, quantity: 2}, {id: 2, quantity: 2}]
      })
      const res = await user.get('/api/orders').expect(200)
      expect(res.body).to.be.an('array')
      expect(res.body.length).to.be.equal(1)
    })
    it('POST /api/orders makes 2 orders if 2 separate orders are made', async () => {
      const user = await createUserWithCart('cart@cart.com')

      await user.post('/api/orders/').send({
        products: [{id: 1, quantity: 2}, {id: 2, quantity: 2}]
      })

      await user.put('/api/cart/add').send({id: 1, quantity: 2})
      await user.put('/api/cart/add').send({id: 2, quantity: 5})
      await user.post('/api/orders/').send({
        products: [{id: 1, quantity: 2}, {id: 2, quantity: 5}]
      })
      const res = await user.get('/api/orders').expect(200)
      expect(res.body).to.be.an('array')
      expect(res.body.length).to.be.equal(2)
    })
    it('PUT /api/orders/:orderId updates order status', async () => {
      const user = await createUserWithNoCart('cart@cart.com')
      //use test method for posting so we don't have to
      //write cart logic yet
      await user
        .post('/api/orders/test')
        .send({products: [{id: 1, quantity: 1, price: 100}]})

      const res = await user
        .put('/api/orders/1')
        .send({status: 'shipped'})
        .expect(200)
      expect(res.body[0].status).to.be.equal('shipped')
    })
    it('POST /api/orders makes 1 order and updates the quantity in Products Table', async () => {
      //original quantity for product 1: 20, 2: 10
      //expected quantity for product 1: 18, 2: 8
      const user = await createUserWithCart('cart@cart.com')

      await user.post('/api/orders/').send({
        products: [{id: 1, quantity: 2}, {id: 2, quantity: 2}]
      })

      const res = await user.get('/api/products/1').expect(200)
      expect(res.body.quantity).to.be.equal(18)
      const res2 = await user.get('/api/products/2').expect(200)
      expect(res2.body.quantity).to.be.equal(8)
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
