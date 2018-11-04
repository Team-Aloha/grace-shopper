import axios from 'axios'

const SET_ORDERS = 'SET_ORDERS'
const SET_ONE_ORDER = 'SET_ONE_ORDER'

const defaultOrders = []

//action creators

const setOrders = orders => ({type: SET_ORDERS, orders})
const setOneOrder = order => ({type: SET_ONE_ORDER, order})

//thunk

export const fetchOrders = () => async dispatch => {
  const response = await axios.get('/api/orders')
  const orders = response.data
  dispatch(setOrders(orders))
}

export const fetchOneOrder = orderId => async dispatch => {
  const response = await axios.get(`/api/orders/${orderId}`)
  const order = response.data
  dispatch(setOneOrder(order))
}

//reducer

export default function(state = defaultOrders, action) {
  switch (action.type) {
    case SET_ORDERS:
      return action.orders

    default:
      return state
  }
}

export function singleOrder(state = {}, action) {
  switch (action.type) {
    case SET_ONE_ORDER:
      return action.orders

    default:
      return state
  }
}
