import history from '../history'
import axios from 'axios'
/**
 * ACTION TYPES
 */
const SET_CART = 'SET_CART'
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

/**
 * THUNK CREATORS
 */
//get cart
export const getCart = () => async dispatch => {
  try {
    //uncomment when implemented
    // const test = await axios.get('/api/cart/')
    // console.log(test)
    const {data} = await axios.get('/api/cart/')
    // console.log(test.data.products)
    // const data = [{id: 1, quantity: 2}, {id: 2, quantity: 3}]
    //const data = []
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

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  console.log(action)
  switch (action.type) {
    case SET_CART:
      return action.cart

    default:
      return state
  }
}
