import history from '../history'

/**
 * ACTION TYPES
 */
const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

/**
 * INITIAL STATE
 */
const initialState = {
  visibilityFilter: 'ALL'

}

/**
 * ACTION CREATORS
 */
export const setVisibilityFilter = (newFilterType) => ({
  type: SET_VISIBILITY_FILTER,
  visibilityFilter: newFilterType
});

/**
 * THUNK CREATORS
 */


/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return { visibilityFilter: action.visibilityFilter};
    default:
      return state
  }
}
