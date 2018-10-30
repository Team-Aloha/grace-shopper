const {expect} = require('chai')
const db = require('../index')
const Category = db.model('category')

describe('Category model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  afterEach(() => {
    return db.sync({force: true})
  })

  it('has a name field', async () => {
    const category = Category.build({
      name: 'Blue'
    })
    expect(category.name).to.equal('Blue')

  })

  it('requires a name', async () => {
    const category = Category.build({})
    try {
      await category.validate()
      throw Error('validation should have failed with no name')
    }
    catch(err){
      expect(err.message).to.contain('notNull Violation: category.name cannot be null')
    }
  })


})
