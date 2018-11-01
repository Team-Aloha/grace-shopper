import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, cartItemCount}) => (
  <div>
    <nav>
      <div class="nav-wrapper">
        <a href="#" class="brand-logo">
          Logo
        </a>

        <ul id="nav-mobile" class="right hide-on-med-and-down">
          {isLoggedIn ? (
            <React.Fragment>
              {cartItemCount > 0 ? (
                <li>
                  <span class="badge">{cartItemCount}</span>
                </li>
              ) : (
                <div />
              )}

              <li>
                <Link to="/cart">
                  {' '}
                  <i class="material-icons left">shopping_cart</i> Cart
                </Link>
              </li>
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/products">Products</Link>
              </li>
              <li>
                <Link to="/categories">Categories</Link>
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
                <Link to="/cart">
                  {' '}
                  <i class="material-icons left">shopping_cart</i> Cart
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
