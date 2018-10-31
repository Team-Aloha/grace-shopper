import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES'
const ADD_CATEGORIES = 'ADD_CATEGORIES'
const SET_CATEGORIES = 'SET_CATEGORIES'
const REMOVE_CATEGORIES = 'REMOVE_CATEGORIES'
const AMEND_CATEGORIES = 'AMEND_CATEGORIES'

/**
 * INITIAL STATE
 */

const initialState = []
/**
 * ACTION CREATORS
 */
export const setCategories = categories => ({type: SET_CATEGORIES, categories})

/**
 * THUNK CREATORS
 */
export const fetchCategories = () => async dispatch => {
  const response = await axios.get('/api/categories')
  const categories = response.data
  dispatch(setCategories(categories))
}
/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_CATEGORIES:
      return state
    case SET_CATEGORIES:
      return action.categories
    case ADD_CATEGORIES:
      return state
    case REMOVE_CATEGORIES:
      return state
    case AMEND_CATEGORIES:
      return state
    default:
      return state
  }
}
