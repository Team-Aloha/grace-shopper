import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
const ADD_PRODUCT = 'ADD_PRODUCT'
const SET_PRODUCTS = 'SET_PRODUCTS'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
const AMEND_PRODUCT = 'AMEND_PRODUCT'

/**
 * INITIAL STATE
 */
const defaultProducts = [
  {
    title: 'Shirt 1',
    desc: 'foo',
    price: 9.99,
    category: ['silk']
  },
  {
    title: 'Shirt 2',
    desc: 'bar',
    price: 9.99,
    category: ['cotton']
  }
]

/**
 * ACTION CREATORS
 */
export const setProducts = products => ({type: SET_PRODUCTS, products})

/**
 * THUNK CREATORS
 */
export const fetchProducts = () => async dispatch => {
  const response = await axios.get('/api/products')
  const products = response.data
  dispatch(setProducts(products))
}

/**
 * REDUCER
 */
export default function(state = defaultProducts, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return state
    case ADD_PRODUCT:
      return state
    case REMOVE_PRODUCT:
      return state
    case AMEND_PRODUCT:
      return state
    default:
      return state
  }
}
