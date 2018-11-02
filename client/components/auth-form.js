import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {withRouter} from 'react-router-dom'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div className="container">
      <div className="row" />
      <div className="card">
        <div className="card-content">
          <form onSubmit={handleSubmit} name={name}>
            <div class="input-field col s12">
              <input id="email" type="email" class="validate" />
              <label for="email">Email</label>
            </div>
            <div class="input-field col s12">
              <input id="password" type="password" class="validate" />
              <label for="password">Password</label>
            </div>
            <div className="col x12 center-align">
              <button className="btn">{displayName}</button>
            </div>
            {error && error.response && <div> {error.response.data} </div>}
          </form>
        </div>
      </div>

      <a href="/auth/google">{displayName} with Google</a>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = withRouter(connect(mapLogin, mapDispatch)(AuthForm))
export const Signup = withRouter(connect(mapSignup, mapDispatch)(AuthForm))

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
