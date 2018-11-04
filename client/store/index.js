import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import products from './products'
import orders from './orders'
import {singleProduct as product} from './products'
import filter from './filter'
import categories from './categories'
import cart from './cart'

const reducer = combineReducers({
  user,
  products,
  filter,
  categories,
  product,
  cart,
  orders
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './products'
export * from './filter'
export * from './categories'
export * from './cart'
export * from './orders'
