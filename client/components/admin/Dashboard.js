import React from 'react'
import {connect} from 'react-redux'
import {Link, withRouter, Switch, Route} from 'react-router-dom'

const Dashboard = props => {
  const {isAdmin} = props
  if (!isAdmin) {
    props.history.push('/products')
  } else {
    return (
      <div className="container">
        <div className="row">
          <nav id="category-nav">
            <div className="nav-wrapper">
              <ul className="left hide-on-med-and-down">
                <li>
                  <a className="white-text" href="">
                    Admin Actions:
                  </a>
                </li>
                <li>
                  <Link className="white-text" to="/admin/products">
                    View Products
                  </Link>
                </li>
                <li>
                  <Link className="white-text" to="/admin/products/add">
                    Add Products
                  </Link>
                </li>
                <li>
                  <Link className="white-text" to="/admin/orders">
                    View Orders
                  </Link>
                </li>
                <li>
                  <Link className="white-text" to="/admin/users">
                    View Users
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    )
  }
}
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isAdmin: !!state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {}
}

export default withRouter(connect(mapState, mapDispatch)(Dashboard))
