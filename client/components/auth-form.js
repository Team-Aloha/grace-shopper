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
      <div className="row center" />
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
            <div class="input-field col s12 center">
              <button className="btn btn-med login-button">
                {displayName}
              </button>
            </div>
            {error && error.response && <div> {error.response.data} </div>}
          </form>
          <div className="center" id="or-div">
            or
          </div>
          <div class="input-field col s12 center">
            <a href="/auth/google">
              <button className="btn btn-med red login-button">
                {' '}
                <i class="fab fa-google google-icon" /> Sign in with Google
              </button>
            </a>
          </div>
        </div>
      </div>
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
