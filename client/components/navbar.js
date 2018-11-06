import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, cartItemCount}) => (
  <div className="navbar-fixed">
    <nav>
      <div className="container nav-wrapper">
        <Link className="brand-logo black-text font-effect-fire-animation titleHome" to="/">
         <i className="material-icons left">spa</i> Palm Tees
        </Link>

        <ul id="nav-mobile" className="right hide-on-med-and-down">
          {isLoggedIn ? (
            <React.Fragment>
              {cartItemCount > 0 ? (
                <li id="count-badge">
                  <Link to="/checkoutPage">
                    {' '}
                    <span className="badge">{cartItemCount}</span>
                  </Link>
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
                <Link to="/admin">Admin Tools</Link>
              </li>
              <li>
                <a href="#" onClick={handleClick}>
                  Logout
                </a>
              </li>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {cartItemCount > 0 ? (
                <li id="count-badge">
                  <Link to="/checkoutPage">
                    {' '}
                    <span className="badge">{cartItemCount}</span>
                  </Link>
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
    cartItemCount: state.cart
      .map(item => item.quantity)
      .reduce((a, b) => +a + +b, 0)
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
