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
export const getCart = () => dispatch => {
  try {
    console.log('in think creator for getCart')
    //uncomment when implemented
    //const {data} = await axios.get('/api/cart/')
    const data = [{id: 1, quantity: 2}, {id: 2, quantity: 3}]
    //const data = []
    dispatch(gotCart(data))
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
