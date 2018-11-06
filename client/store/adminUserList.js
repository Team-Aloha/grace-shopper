import axios from 'axios'

/**
 * ACTION TYPES
 */
export const ADMIN_GET_USERS = 'ADMIN_GET_USERS'
const ADMIN_CHANGE_STATUS = 'ADMIN_CHANGE_STATUS'
//export const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultUsers = []

/**
 * ACTION CREATORS
 */
const adminGetUsers = users => ({type: ADMIN_GET_USERS, users})
const adminChangeStatus = user => ({type: ADMIN_CHANGE_STATUS, user})
//const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */
export const adminFetchUsers = () => async dispatch => {
  try {
    const res = await axios.get('/api/users')
    dispatch(adminGetUsers(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const adminSetUserPriviledge = (id, isAdmin) => async dispatch => {
  console.log('thunk ', id, isAdmin)
  const response = await axios.put(`/api/users/${id}`, {isAdmin})
  dispatch(adminChangeStatus(response.data))
}

/**
 * REDUCER
 */
export default function(state = defaultUsers, action) {
  switch (action.type) {
    case ADMIN_GET_USERS:
      return action.users
    case ADMIN_CHANGE_STATUS: {
      const newState = state.map(user => {
        if (user.id !== action.user[0].id) {
          return user
        } else return action.user[0]
      })
      return newState
    }
    default:
      return state
  }
}
