/* global describe beforeEach it */
const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')

const app = require('../index')
const Category = db.model('category')
const agent = require('supertest')(app)

describe('Category Routers routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/categories/', () => {
    beforeEach(() => {
      return Category.bulkCreate([{name: 'Shirt'}, {name: 'Red'}])
    })
    it('GET /api/categories', async () => {
      const res = await agent.get('/api/categories').expect(200)
      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal('Shirt')
      expect(res.body[1].name).to.be.equal('Red')
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
