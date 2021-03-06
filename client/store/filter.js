import history from '../history'

/**
 * ACTION TYPES
 */
const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

/**
 * INITIAL STATE
 */
const initialState = {
  visibilityFilter: -1
}

/**
 * ACTION CREATORS
 */
export const setVisibilityFilter = newFilterType => ({
  type: SET_VISIBILITY_FILTER,
  visibilityFilter: newFilterType
})

/**
 * THUNK CREATORS
 */

/**
 * REDUCER
 */
export default function(
  state = {
    visibilityFilter: -1
  },
  action
) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return {visibilityFilter: action.visibilityFilter}
    default:
      return state
  }
}
