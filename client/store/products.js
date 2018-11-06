import axios from 'axios'

/**
 * ACTION TYPES
 */
//const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
const ADD_PRODUCT = 'ADD_PRODUCT'
const SET_PRODUCTS = 'SET_PRODUCTS'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
const AMEND_PRODUCT = 'AMEND_PRODUCT'

const SET_ONE_PRODUCT = 'SET_ONE_PRODUCT'

const defaultProducts = []

/**
 * ACTION CREATORS
 */
export const setProducts = products => ({type: SET_PRODUCTS, products})
export const addProduct = product => ({type: ADD_PRODUCT, product})
export const setOneProduct = product => ({type: SET_ONE_PRODUCT, product})
export const amendProduct = product => ({type: AMEND_PRODUCT, product})

/**
 * THUNK CREATORS
 */
export const fetchProducts = () => async dispatch => {
  const response = await axios.get('/api/products')
  const products = response.data
  dispatch(setProducts(products))
}

export const postProduct = product => {
  return async dispatch => {
    const response = await axios.post('/api/products', product)
    const newProduct = response.data
    dispatch(addProduct(newProduct))
  }
}

export const fetchOneProduct = productId => async dispatch => {
  const response = await axios.get(`/api/products/${productId}`)
  const product = response.data
  dispatch(setOneProduct(product))
}

export const updateProduct = product => {
  return async dispatch => {
    console.log('in thunk')
    const response = await axios.put(`/api/products/${product.id}`, product)
    if (response.status === 200) {
      const updatedProduct = response.data
      console.log('updated product', updatedProduct)
      // dispatch(setOneProduct(updatedProduct))
      dispatch(amendProduct(updatedProduct))
    } else {
      throw new Error('Failed to update product')
    }
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
    case AMEND_PRODUCT: {
      // const newState = state.map(prod => {
      //   if (prod.id !== action.id) {
      //     return prod
      //   } else return action.prodiuct
      // })
      return [...state, action.product]
    }
    default:
      return state
  }
}

export function singleProduct(state = {}, action) {
  switch (action.type) {
    case SET_ONE_PRODUCT:
      return action.product
    default:
      return state
  }
}
