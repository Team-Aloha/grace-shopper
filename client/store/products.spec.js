// /* global describe beforeEach afterEach it */

// import {expect} from 'chai'
// import {fetchProducts, setOneProduct} from './products'
// import axios from 'axios'
// import MockAdapter from 'axios-mock-adapter'
// import configureMockStore from 'redux-mock-store'
// import thunkMiddleware from 'redux-thunk'
// import history from '../history'

// const middlewares = [thunkMiddleware]
// const mockStore = configureMockStore(middlewares)

// describe('thunk creators', () => {
//   let store
//   let mockAxios

//   const initialState = {user: {}}

//   beforeEach(() => {
//     mockAxios = new MockAdapter(axios)
//     store = mockStore(initialState)
//   })

//   afterEach(() => {
//     mockAxios.restore()
//     store.clearActions()
//   })

//   describe('products', () => {
//     it('eventually dispatches the GET PRODUCTS action', async () => {
//       const products = []
//       mockAxios.onGet('/api/products').replyOnce(200, products)
//       await store.dispatch(fetchProducts())
//       const actions = store.getActions()
//       expect(actions[0].type).to.be.equal('SET_PRODUCTS')
//       expect(actions[0].products).to.be.equal(products)
//     })
//   })

//   describe('fetch one product', () => {
//     it('fetches one product', async () => {
//       const product = []
//       mockAxios.onPost('/api/products/1').replyOnce(200)
//       await store.dispatch(setOneProduct())
//       const actions = store.getActions()
//       expect(actions[0].type).to.be.equal('SET_ONE_PRODUCT')
//       expect(actions[0].products).to.be.equal(product)
//     })
//   })
// })
