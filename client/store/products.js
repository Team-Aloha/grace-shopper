import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
//const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
const ADD_PRODUCT = 'ADD_PRODUCT'
const SET_PRODUCTS = 'SET_PRODUCTS'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
const AMEND_PRODUCT = 'AMEND_PRODUCT'

/**
 * INITIAL STATE
 */
// const defaultProducts = [
//   {
//     title: 'Shirt 1',
//     desc: 'foo',
//     price: 9.99,
//     categories: [2, 1]
//   },
//   {
//     title: 'Shirt 2',
//     desc: 'bar',
//     price: 9.99,
//     categories: [2, 4]
//   }
// ]

const defaultProducts = []

/**
 * ACTION CREATORS
 */
export const setProducts = products => ({type: SET_PRODUCTS, products})
export const addProduct = product => ({type: ADD_PRODUCT, product})

/**
 * THUNK CREATORS
 */
export const fetchProducts = () => async dispatch => {
  const response = await axios.get('/api/products')
  const products = response.data
  dispatch(setProducts(products))
}

export const postProduct = campus => {
  return async dispatch => {
    const response = await axios.post('/api/products', product)
    const newProduct = response.data
    dispatch(addProduct(newProduct))
  }
}

/**
 * REDUCER
 */
export default function(state = defaultProducts, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products
    case ADD_PRODUCT:
      return [...state, action.product]
    case REMOVE_PRODUCT:
      return state
    case AMEND_PRODUCT:
      return state
    default:
      return state
  }
}
