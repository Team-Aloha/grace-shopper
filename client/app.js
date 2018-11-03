import React from 'react'
import {Route, withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {Navbar} from './components'
import Routes from './routes'
import {AllProducts} from './components/products'
import {fetchProducts, fetchCategories, getCart, setCart} from './store'

class App extends React.Component {
  componentDidMount() {
    this.props.fetchProducts()
    this.props.fetchCategories()

    if (!this.props.user.id) {
      if (!localStorage.cart) {
        const guestCart = JSON.stringify([])
        localStorage.setItem('cart', guestCart)
      }
      this.props.setCart(JSON.parse(localStorage.cart))
    }
  }
  render() {
    return (
      <div>
        <Navbar />
        <Routes />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
    fetchCategories: () => dispatch(fetchCategories()),
    setCart: cart => dispatch(setCart(cart)),
    getCart: () => dispatch(getCart())
  }
}
const mapStateToProps = state => {
  const {user, cart} = state
  return {
    user,
    cart
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
