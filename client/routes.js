import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import {Login, Signup, UserHome, Cart, AdminOrderList, Home} from './components'
import {CheckoutForm, CheckoutPage} from './components/cart'
import {me} from './store'
import {AllProducts, ProductDetail} from './components/products'
import {
  EditProductForm,
  AddProductForm,
  AdminUserList,
  Dashboard
} from './components/admin'
import {Profile, ProfilePage, OrderList, OrderDetail} from './components/user'
/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isAdmin} = this.props

    return (
      <Switch>
        {/* Home Page */}
        <Route exact path="/" component={Home} />

        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/cart" component={Cart} />
        <Route path="/checkout" component={CheckoutForm} />
        <Route path="/checkoutPage" component={CheckoutPage} />
        <Route path="/profile" component={ProfilePage} />

        {/* Products */}
        <Route exact path="/products" component={AllProducts} />
        <Route exact path="/products/:productId" component={ProductDetail} />

        {/* Orders */}
        <Route path="/orders/:orderId" component={OrderDetail} />

        <Route path="/home" component={UserHome} />
        {isAdmin && (
          <Switch>
            <Route exact path="/admin" component={Dashboard} />
            <Route
              path="/admin/products/:productId/edit"
              component={EditProductForm}
            />
            <Route path="/admin/orders" component={AdminOrderList} />
            <Route path="/admin/products/add" component={AddProductForm} />
            <Route path="/admin/users" component={AdminUserList} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isAdmin: !!state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
