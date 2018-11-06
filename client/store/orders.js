import axios from 'axios'

const SET_ORDERS = 'SET_ORDERS'
const SET_ONE_ORDER = 'SET_ONE_ORDER'

const ADMIN_CHANGE_STATUS = 'ADMIN_CHANGE_STATUS'

const defaultOrders = []

//action creators

const setOrders = orders => ({type: SET_ORDERS, orders})
const setOneOrder = order => ({type: SET_ONE_ORDER, order})
const adminChangeStatus = order => ({type: ADMIN_CHANGE_STATUS, order})
//thunk

export const fetchOrders = () => async dispatch => {
  const response = await axios.get('/api/orders')
  const orders = response.data
  dispatch(setOrders(orders))
}

export const fetchAdminOrders = () => async dispatch => {
  const response = await axios.get('/api/orders/admin')
  const orders = response.data
  dispatch(setOrders(orders))
}

export const fetchOneOrder = orderId => async dispatch => {
  console.log(orderId, 'orderId in store')
  const response = await axios.get(`/api/orders/${orderId}`)
  const order = response.data
  dispatch(setOneOrder(order))
}

export const adminSetOrderStatus = (id, status) => async dispatch => {
  console.log('thunk ', id, status)
  const response = await axios.put(`/api/orders/${id}`, {status})
  dispatch(adminChangeStatus(response.data))
}

//reducer

export default function(state = defaultOrders, action) {
  switch (action.type) {
    case SET_ORDERS:
      return action.orders
    case ADMIN_CHANGE_STATUS: {
      const newOrders = state
      newOrders.map(order => {
        if (order.id === action.order.id) return action.order
        return action.order
      })
      return newOrders
    }
    default:
      return state
  }
}

//I don't think we use this anymore so can be removed
export function singleOrder(state = {}, action) {
  switch (action.type) {
    case SET_ONE_ORDER:
      return action.order

    default:
      return state
  }
}
