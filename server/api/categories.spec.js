/* global describe beforeEach it */
const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')

const app = require('../index')
const Category = db.model('category')
const sinon = require('sinon')
const agent = require('supertest')(app)

describe('Category Routers routes', () => {
  const {findAll: categoryFindAll} = Category

  beforeEach(() => {
    Category.findAll = sinon.spy(() => [
      {id: 1, name: 'Shirt'},
      {id: 2, name: 'Blue'}
    ])
  })
  afterEach(() => {
    Category.findAll = categoryFindAll
  })
  it('GET /api/categories responds with all categories', async () => {
    const response = await agent.get('/api/categories').expect(200)
    expect(response.body).to.deep.equal([
      {id: 1, name: 'Shirt'},
      {id: 2, name: 'Blue'}
    ])
    expect(Category.findAll.calledOnce).to.be.equal(true)
  })
}) // end describe('/api/users')
