import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import {logout} from '../store'
import M from 'materialize-css'

const AdminDropdown = props => (
  <ul id="dropdown1" class="dropdown-content">
    <li>
      <a href="#!">one</a>
    </li>
    <li>
      <a href="#!">two</a>
    </li>
  </ul>
)
const UserDropDown = props => (
  <ul id="dropdown1" class="dropdown-content">
    <li>
      <a href="#!">one</a>
    </li>
    <li>
      <a href="#!">two</a>
    </li>
  </ul>
)

function DropDown(props) {
  const isAdmin = this.props.user.isAdmin
  if (isAdmin) {
    return <AdminDropdown />
  }
  return <UserDropDown />
}

class Navbar extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    M.Sidenav.init(this.sidenav)
  }
  render() {
    const {handleClick, isLoggedIn, cartItemCount} = this.props

    return (
      <div className="navbar-fixed">
        <ul id="dropdown1" className="dropdown-content">
          <li>
            <a href="#!">one</a>
          </li>
          <li>
            <a href="#!">two</a>
          </li>
        </ul>
        <nav>
          <div className="container nav-wrapper">
            <Link className="brand-logo white" to="/home">
              Logo
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
                    <a
                      className="dropdown-trigger"
                      href="#!"
                      data-target="dropdown1"
                    >
                      Dropdown<i
                        className="material-icons right"

                      >
                        arrow_drop_down
                      </i>
                    </a>
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
  }
}
/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user,
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
