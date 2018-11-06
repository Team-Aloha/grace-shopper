import history from '../history'
import axios from 'axios'

/**
 * ACTION TYPES
 */
const SET_CART = 'SET_CART'
const PLACE_ORDER = 'PLACE_ORDER'
const CHECK_LOCALSTORAGE = 'CHECK_LOCALSTORAGE'
const TOAST_ERROR = 'TOAST_ERROR'

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

export const checkLocalStorage = () => ({
  type: CHECK_LOCALSTORAGE
})
export const sendError = error => ({
  type: TOAST_ERROR,
  error
})

/**
 * THUNK CREATORS
 */
//get cart
export const getCart = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/cart/')

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
it expects a response:
{
  status: 'success' or 'fail'
  message: if success: an object containing order, if fail a message why
}
*/
export const sendOrder = (
  products,
  type,
  token,
  userInfo
) => async dispatch => {
  try {
    console.log('received order in think')
    console.log(userInfo)
    const {data} = await axios.post('/api/orders/', {
      products,
      type,
      token,
      userInfo
    })
    if (data.status === 'success') {
      if (type !== 'registered')
        localStorage.setItem('cart', JSON.stringify([]))
      dispatch(placeOrder())
    } else {
      console.log('YOUR ORDER FAILED.')
    }
  } catch (err) {
    console.log(err)
    dispatch(sendError(err))
  }
}
/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CART:
      return action.cart
    case PLACE_ORDER:
      return []
    default:
      return state
  }
}

export function localCartMiddleware(store) {
  return next => action => {
    if (action.type === CHECK_LOCALSTORAGE) {
      let state = store.getState()
      const isAuthenticated = !!state.user.id

      let localStorageCart = localStorage.getItem('cart')
        ? JSON.parse(localStorage.getItem('cart'))
        : []

      if (!isAuthenticated) {
        // unauthenticated user
        return store.dispatch(setCart(localStorageCart))
      } else {
        // authenticated user
        if (localStorageCart.length > 0) {
          localStorageCart.forEach(item => {
            store.dispatch(putProductToCart(item))
          })
          localStorageCart = []
          localStorage.setItem('cart', JSON.stringify([]))
        }
        return store.dispatch(getCart())
      }
    }

    // Call the next dispatch method in the middleware chain.
    let returnValue = next(action)

    // This will likely be the action itself, unless
    // a middleware further in chain changed it.
    return returnValue
  }
}
