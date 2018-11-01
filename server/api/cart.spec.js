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
    // beforeEach(() => {
    //   return Category.bulkCreate([{name: 'Shirt'}, {name: 'Red'}])
    // })
    it('GET /api/cart for preexisting cart', async () => {
      const user = await createUserWithCart('cart@cart.com')
      const res = await user.get('/api/cart').expect(200)
      expect(res.body.products).to.be.an('array')
      expect(res.body.products.length).to.be.greaterThan(0)
    })
    it.only('GET /api/cart for no cart creates and returns an empty cart', async () => {
      const user = await createUserWithNoCart('nocart@cart.com')
      const res = await user.get('/api/cart').expect(200)
      expect(res.body.products).to.be.an('array')
      expect(res.body.products.length).to.be.equal(0)
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
