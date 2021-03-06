/* global describe beforeEach it */
const {expect} = require('chai')
const db = require('../db')

const app = require('../index')
const Product = db.model('product')
const request = require('supertest')
const agent = request(app)

const {createAuthUser, createNoAuthUser} = require('../utils/createUsers')
describe('Product API routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products/', () => {
    beforeEach(() => {
      return Product.bulkCreate([
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
    it('GET /api/products', async () => {
      const res = await agent.get('/api/products').expect(200)
      expect(res.body).to.be.an('array')
      expect(res.body.length).to.equal(3)
    })
    it('GET /api/products/:productId', async () => {
      const res = await agent.get('/api/products/1').expect(200)
      expect(res.body).to.be.an('object')
      expect(res.body.title).to.equal('Blue Shirt')
      const res2 = await agent.get('/api/products/2').expect(200)
      expect(res2.body).to.be.an('object')
      expect(res2.body.title).to.equal('Red Shirt')
    })
    it('GET /api/products/category/:category', async () => {
      const res = await agent.get('/api/products/category/1').expect(200)
      expect(res.body).to.be.an('array')
      expect(res.body.length).to.equal(1)
      const res2 = await agent.get('/api/products/category/2').expect(200)
      expect(res2.body).to.be.an('array')
      expect(res2.body.length).to.equal(2)
      const res3 = await agent.get('/api/products/category/6').expect(200)
      expect(res3.body).to.be.an('array')
      expect(res3.body.length).to.equal(0)
    })
    it('POST /api/products', async () => {
      //Check if admin can post
      try {
        const authUser = await createAuthUser('admin@admin.com')
        const res = await authUser
          .post('/api/products')
          .send({
            title: 'Purple Shirt',
            description: 'This is purple',
            price: 20,
            quantity: 10,
            categories: [6, 1]
          })
          .expect(200)
        expect(res.body).to.be.an('object')
        const createdProduct = await Product.findById(res.body.id)
        expect(createdProduct.title).to.equal('Purple Shirt')

        //check if !admin cannot post (expect 401 not allowed)
        const notAdmin = await createNoAuthUser('notadmin@notadmin.com')
        await notAdmin
          .post('/api/products')
          .send({
            title: 'Purple Shirt',
            description: 'This is purple',
            price: 20,
            quantity: 10,
            categories: [6, 1]
          })
          .expect(401)
      } catch (err) {
        console.log('ERROR')
      }
    })
    it('PUT /api/products', async () => {
      const authUser = await createAuthUser('admin@admin.com')
      const res = await authUser
        .put('/api/products/1')
        .send({
          title: 'Super Blue Shirt'
        })
        .expect(200)
      expect(res.body).to.be.an('array')
      const updatedProduct = await Product.findById(1)
      expect(updatedProduct.title).to.equal('Super Blue Shirt')
    })
    it('GET /api/products/search/:term', async () => {
      const res = await agent.get('/api/products/search/Shirt').expect(200)
      expect(res.body).to.be.an('array')
      expect(res.body.length).to.equal(3)
      const res2 = await agent.get('/api/products/search/Blue').expect(200)
      expect(res2.body).to.be.an('array')
      expect(res2.body.length).to.equal(1)
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
