import history from '../history'
import axios from 'axios'
/**
 * ACTION TYPES
 */
const SET_CART = 'SET_CART'
const PLACE_ORDER = 'PLACE_ORDER'
// const ADD_PRODUCT = 'ADD_PRODUCT'
// const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
// const CHANGE_QUANTITY = 'CHANGE_QUANTITY'

/**
 * INITIAL STATE
 */
const initialState = []

/**
 * ACTION CREATORS
 */
export const setCart = cart => ({
  type: SET_CART,
  cart
})

export const placeOrder = () => ({
  type: PLACE_ORDER
})

/**
 * THUNK CREATORS
 */
//get cart
export const getCart = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/cart/')
    console.log(data.products)
    dispatch(setCart(data.products))
  } catch (err) {
    console.error(err)
  }
}
//add product
export const putProductToCart = product => async dispatch => {
  try {
    const {data} = await axios.put('/api/cart/add', product)
    dispatch(setCart(data.products))
  } catch (err) {
    console.log(err)
  }
}
//delete item
export const deleteProduct = product => async dispatch => {
  try {
    const {data} = await axios.put('/api/cart/remove', product)
    dispatch(setCart(data.products))
  } catch (err) {
    console.log(err)
  }
}
//change quantity
export const updateQuantity = product => async dispatch => {
  try {
    const {data} = await axios.put('/api/cart/quantity', product)
    dispatch(setCart(data.products))
  } catch (err) {
    console.log(err)
  }
}

//this is the THUNK for creating an order.
//the API expects an object that looks like this:
/*
{
  products: [array of objects...AKA the cart],
  type: 'registered' or 'guest'
}
*/
export const sendOrder = (products, type) => async dispatch => {
  try {
    console.log('i am testing to see how to tell if i am logged in')
    const {data} = await axios.post('/api/orders/', {products, type})
    console.log(data)
    dispatch(placeOrder())
  } catch (err) {
    console.log(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  console.log(action)
  switch (action.type) {
    case SET_CART:
      return action.cart
    case PLACE_ORDER:
      return []
    default:
      return state
  }
}
