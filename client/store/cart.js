import history from '../history'
import axios from 'axios'
/**
 * ACTION TYPES
 */
const SET_CART = 'SET_CART'
const PLACE_ORDER = 'PLACE_ORDER'
const CHECK_LOCALSTORAGE = 'CHECK_LOCALSTORAGE'

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
  switch (action.type) {
    case SET_CART:
      return action.cart
    case PLACE_ORDER:
      return []
    default:
      return state
  }
}

export function checkLocalStorageListener() {
  const store = arguments[0]
  const state = store.getState()
  console.log('the state', state)

  const isAuthenticated = state.user.id ? true : false

  let localStorageCart = localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart'))
    : []

  if (!isAuthenticated) {
    console.log('is authenticated')
    if (state.cart.length === 0 && localStorage.length > 0) {
      console.log(
        'the state.cart is empty and there is something in local storage'
      )
      console.log('the local storage cart', localStorageCart)
    }
    if (state.cart.length > 0) {
      console.log('the state.cart is not empty')
      console.log('the cart', localStorageCart)
    }
  } else {
    console.log('the user is authenticated')
  }
}

export function localCartMiddleware(store) {
  return next => action => {
    if (action.type === CHECK_LOCALSTORAGE) {
      let state = store.getState()
      const isAuthenticated = state.user.id ? true : false

      let localStorageCart = localStorage.getItem('cart')
        ? JSON.parse(localStorage.getItem('cart'))
        : []

      if (!isAuthenticated) {
        if (state.cart.length === 0 && localStorage.length > 0) {
          console.log(
            'the state.cart is empty and there is something in local storage'
          )
          console.log('the local storage cart', localStorageCart)
          return store.dispatch(setCart(localStorageCart))
        }
        if (state.cart.length > 0) {
          console.log('the state.cart is not empty')
          console.log('the cart', localStorageCart)
        }
      } else {
        console.log('the user is authenticated')
      }
    }

    // Call the next dispatch method in the middleware chain.
    let returnValue = next(action)

    // This will likely be the action itself, unless
    // a middleware further in chain changed it.
    return returnValue
  }
}
