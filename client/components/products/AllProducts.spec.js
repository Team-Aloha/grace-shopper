import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {AllProducts} from './AllProducts'

const adapter = new Adapter()
enzyme.configure({adapter})

describe.only('AllProducts', () => {
  let allProducts

  beforeEach(() => {
    allProducts = shallow(<AllProducts />)
  })

  it('renders the email in an h3', () => {
    // expect(userHome.find('h3').text()).to.be.equal('Welcome, cody@email.com')
    expect(true).to.be.equal(false)
  })
})
