/* global describe beforeEach it */
const {expect} = require('chai')
const db = require('../db')

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

  describe('/api/cart/', () => {
    beforeEach(() => {
      return db.sync({force: true})
    })
    it('GET /api/cart for preexisting cart', async () => {
      const user = await createUserWithCart('cart@cart.com')
      const res = await user.get('/api/cart').expect(200)
      expect(res.body.products).to.be.an('array')
      expect(res.body.products.length).to.be.greaterThan(0)
    })
    it('GET /api/cart for no cart creates and returns an empty cart', async () => {
      const user = await createUserWithNoCart('nocart@cart.com')
      const res = await user.get('/api/cart').expect(200)
      expect(res.body.products).to.be.an('array')
      expect(res.body.products.length).to.be.equal(0)
    })

    it('PUT /api/cart/add adds object to empty cart', async () => {
      //make a user with no cart, then query /api/cart to make sure they have one in table
      const user = await createUserWithNoCart('nocart@cart.com')
      await user.get('/api/cart').expect(200)

      const res = await user
        .put('/api/cart/add')
        .send({id: 1, quantity: 2})
        .expect(200)
      expect(res.body.products).to.be.an('array')
      expect(res.body.products.length).to.be.equal(1)
    })
    it('PUT /api/cart/add when requested twice with SAME product, returns a cart with updated product quantity (adds quantities)', async () => {
      //make a user with no cart, then query /api/cart to make sure they have one in table
      const user = await createUserWithNoCart('nocart@cart.com')
      await user.get('/api/cart').expect(200)

      //add the same item twice and check its quantity
      await user.put('/api/cart/add').send({id: 1, quantity: 2})
      const res = await user.put('/api/cart/add').send({id: 1, quantity: 5})
      expect(res.body.products).to.be.an('array')
      expect(res.body.products.length).to.be.equal(1)
      expect(res.body.products[0].quantity).to.be.equal(7)
    })
    it('PUT /api/cart/add when requested twice with different products, returns a cart with two different products', async () => {
      //make a user with no cart, then query /api/cart to make sure they have one in table
      const user = await createUserWithNoCart('nocart@cart.com')
      await user.get('/api/cart').expect(200)

      await user.put('/api/cart/add').send({id: 1, quantity: 2})
      const res = await user.put('/api/cart/add').send({id: 2, quantity: 5})
      expect(res.body.products).to.be.an('array')
      expect(res.body.products.length).to.be.equal(2)
    })
    it('PUT /api/cart/add when requested THRICE with 2 different products, returns a cart with two different products, one with updated quantity from duplicate items', async () => {
      //make a user with no cart, then query /api/cart to make sure they have one in table
      const user = await createUserWithNoCart('nocart@cart.com')
      await user.get('/api/cart').expect(200)

      await user.put('/api/cart/add').send({id: 1, quantity: 1})
      await user.put('/api/cart/add').send({id: 2, quantity: 5})

      const res = await user.put('/api/cart/add').send({id: 2, quantity: 3})
      expect(res.body.products).to.be.an('array')
      expect(res.body.products.length).to.be.equal(2)
      expect(res.body.products[0].quantity).to.be.equal(1)
      expect(res.body.products[1].quantity).to.be.equal(8)
    })
    it('PUT /api/cart/remove returns an empty object if you try to remove from an empty cart', async () => {
      //make a user with no cart, then query /api/cart to make sure they have one in table
      const user = await createUserWithNoCart('nocart@cart.com')
      await user.get('/api/cart').expect(200)
      await user.put('/api/cart/add').send({id: 1, quantity: 1})

      const res = await user
        .put('/api/cart/remove')
        .send({id: 1})
        .expect(200)
      expect(res.body.products).to.be.an('array')
      expect(res.body.products.length).to.be.equal(0)
    })
    it('PUT /api/cart/remove returns an empty object if you add 1 object then remove that object', async () => {
      //make a user with no cart, then query /api/cart to make sure they have one in table
      const user = await createUserWithNoCart('nocart@cart.com')
      await user.get('/api/cart').expect(200)

      await user.put('/api/cart/add').send({id: 1, quantity: 1})

      const res = await user
        .put('/api/cart/remove')
        .send({id: 1})
        .expect(200)
      expect(res.body.products).to.be.an('array')
      expect(res.body.products.length).to.be.equal(0)
    })
    it('PUT /api/cart/remove returns a cart with 1 product if you add 1 product then remove a product NOT in the cart', async () => {
      //make a user with no cart, then query /api/cart to make sure they have one in table
      const user = await createUserWithNoCart('nocart@cart.com')
      await user.get('/api/cart').expect(200)

      await user.put('/api/cart/add').send({id: 1, quantity: 1})

      const res = await user
        .put('/api/cart/remove')
        .send({id: 2})
        .expect(200)
      expect(res.body.products).to.be.an('array')
      expect(res.body.products.length).to.be.equal(1)
    })
    it('PUT /api/cart/remove returns a cart with 1 product if you add 2 products then remove 1 object', async () => {
      //make a user with no cart, then query /api/cart to make sure they have one in table
      const user = await createUserWithNoCart('nocart@cart.com')
      await user.get('/api/cart').expect(200)

      await user.put('/api/cart/add').send({id: 1, quantity: 1})
      await user.put('/api/cart/add').send({id: 2, quantity: 3})

      const res = await user
        .put('/api/cart/remove')
        .send({id: 1})
        .expect(200)
      expect(res.body.products).to.be.an('array')
      expect(res.body.products.length).to.be.equal(1)
    })
    it('PUT /api/cart/remove returns a cart with 2 products if you add 3 products then remove 1 object', async () => {
      //make a user with no cart, then query /api/cart to make sure they have one in table
      const user = await createUserWithNoCart('nocart@cart.com')
      await user.get('/api/cart').expect(200)

      await user.put('/api/cart/add').send({id: 1, quantity: 1})
      await user.put('/api/cart/add').send({id: 2, quantity: 3})
      await user.put('/api/cart/add').send({id: 3, quantity: 4})

      const res = await user
        .put('/api/cart/remove')
        .send({id: 2})
        .expect(200)
      expect(res.body.products).to.be.an('array')
      expect(res.body.products.length).to.be.equal(2)
    })
    it('PUT /api/cart/quantity returns a cart with 1 product that is added if you try to update quantity of an empty cart', async () => {
      //make a user with no cart, then query /api/cart to make sure they have one in table
      const user = await createUserWithNoCart('nocart@cart.com')
      await user.get('/api/cart').expect(200)
      const res = await user
        .put('/api/cart/quantity')
        .send({id: 1, quantity: 2})
      expect(res.body.products).to.be.an('array')
      expect(res.body.products.length).to.be.equal(1)
    })
    it('PUT /api/cart/quantity returns a cart with 1 product that has its quantity updated if you try to update quantity', async () => {
      //make a user with no cart, then query /api/cart to make sure they have one in table
      const user = await createUserWithNoCart('nocart@cart.com')
      await user.get('/api/cart').expect(200)
      await user.put('/api/cart/add').send({id: 1, quantity: 1})

      const res = await user
        .put('/api/cart/quantity')
        .send({id: 1, quantity: 200})
      expect(res.body.products).to.be.an('array')
      expect(res.body.products.length).to.be.equal(1)
      expect(res.body.products[0].quantity).to.be.equal(200)
    })
    it('PUT /api/cart/quantity returns a cart with 3 products that has 3 products added and only has 1 quantity updated', async () => {
      //make a user with no cart, then query /api/cart to make sure they have one in table
      const user = await createUserWithNoCart('nocart@cart.com')
      await user.get('/api/cart').expect(200)
      await user.put('/api/cart/add').send({id: 1, quantity: 1})
      await user.put('/api/cart/add').send({id: 2, quantity: 2})
      await user.put('/api/cart/add').send({id: 3, quantity: 1})

      const res = await user
        .put('/api/cart/quantity')
        .send({id: 2, quantity: 200})
      expect(res.body.products).to.be.an('array')
      expect(res.body.products.length).to.be.equal(3)
      expect(res.body.products[1].quantity).to.be.equal(200)
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
