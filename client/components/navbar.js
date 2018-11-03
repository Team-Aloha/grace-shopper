import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, cartItemCount}) => (
  <div>
    <nav>
      <div className="nav-wrapper">
        <a href="#" className="brand-logo">
          <Link to="/home">Logo</Link>
        </a>

        <ul id="nav-mobile" className="right hide-on-med-and-down">
          {isLoggedIn ? (
            <React.Fragment>
              {cartItemCount > 0 ? (
                <li>
                  <span className="badge">{cartItemCount}</span>
                </li>
              ) : (
                <div />
              )}

              <li>
                <Link to="/checkoutPage">
                  {' '}
                  <i className="material-icons left">shopping_cart</i> Cart
                </Link>
              </li>
              <li />
              <li>
                <Link to="/products">Products</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <a href="#" onClick={handleClick}>
                  Logout
                </a>
              </li>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <li>
                <Link to="/checkoutPage">
                  {' '}
                  <i className="material-icons left">shopping_cart</i> Cart
                </Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
              <li>
                <Link to="/products">Products</Link>
              </li>
              <li>
                <Link to="/categories">Categories</Link>
              </li>
            </React.Fragment>
          )}
        </ul>
      </div>
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    cartItemCount: state.cart.length
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Navbar))

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
