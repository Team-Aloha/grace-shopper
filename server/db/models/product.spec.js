/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Product = db.model('product')

describe('Product model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  afterEach(() => {
    return db.sync({force: true})
  })
  it('has following fields: title, description, price, quantity, imageUrl, categories', async () => {
    const product = Product.build({
      title: 'Test Shirt',
      description: 'This is a shirt',
      price: 100,
      quantity: 10,
      imageUrl: 'test.png',
      categories: ['Test']
    })
    expect(product.title).to.equal('Test Shirt')
    expect(product.description).to.equal('This is a shirt')
    expect(product.price).to.equal(100)
    expect(product.quantity).to.equal(10)
    expect(product.imageUrl).to.equal('test.png')
    expect(product.categories).to.deep.equal(['Test'])
  })

  it('requires a title, description, price, and categories', async () => {
    const product = Product.build({})
    try {
      await product.validate()
      throw Error(
        'validation should have failed with no title, description, price, quantity, or categories'
      )
    } catch (err) {
      expect(err.message).to.contain(
        'notNull Violation: product.title cannot be null'
      )
      expect(err.message).to.contain(
        'notNull Violation: product.description cannot be null'
      )
      expect(err.message).to.contain(
        'notNull Violation: product.price cannot be null'
      )

      expect(err.message).to.contain(
        'notNull Violation: product.categories cannot be null'
      )
    }
  })
  it('price must be an integer > 0', async () => {
    const product = Product.build({
      title: 'Test Shirt',
      description: 'This is a shirt',
      price: -1,
      quantity: 0,
      imageUrl: 'test.png',
      categories: ['Test']
    })
    try {
      await product.validate()
      throw Error('validation should have failed with negative price')
    } catch (err) {
      expect(err.message).to.contain(
        'Validation error: Validation min on price failed'
      )
    }
  })
  it('quantity must be an integer > 0', async () => {
    const product = Product.build({
      title: 'Test Shirt',
      description: 'This is a shirt',
      quantity: -1,
      price: 10,
      imageUrl: 'test.png',
      categories: ['Test']
    })
    try {
      await product.validate()
      throw Error('validation should have failed with negative quantity')
    } catch (err) {
      expect(err.message).to.contain(
        'Validation error: Validation min on quantity failed'
      )
    }
  })

  it('default imageUrl if left blank', async () => {
    const product = Product.build({
      title: 'Test Shirt',
      description: 'This is a shirt',
      quantity: 2,
      price: 10,
      categories: ['Test']
    })
    await product.validate()
    expect(product.imageUrl).to.be.a('string')
    expect(product.imageUrl.length).to.be.greaterThan(1)
  })

  it('must have at least one category', async () => {
    const product = Product.build({
      title: 'Test Shirt',
      description: 'This is a shirt',
      quantity: 1,
      price: 10,
      imageUrl: 'test.png',
      categories: []
    })
    try {
      await product.validate()
      throw Error('validation should have failed with no categories')
    } catch (err) {
      expect(err.message).to.contain(
        'Validation error: Must have at least one category!'
      )
    }
  })
})
