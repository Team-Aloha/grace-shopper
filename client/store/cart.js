import history from '../history'
import axios from 'axios'
/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'

/**
 * INITIAL STATE
 */
const initialState = []

/**
 * ACTION CREATORS
 */
export const gotCart = cart => ({
  type: GET_CART,
  cart
})

/**
 * THUNK CREATORS
 */
export const getCart = () => async dispatch => {
  try {
    //uncomment when implemented
    const test = await axios.get('/api/cart/')
    const {data} = await axios.get('/api/cart/')
    // console.log(test.data.products)
    // const data = [{id: 1, quantity: 2}, {id: 2, quantity: 3}]
    //const data = []
    dispatch(gotCart(data.products))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart
    default:
      return state
  }
}
