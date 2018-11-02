import React from 'react'
import {Route, withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {Navbar} from './components'
import Routes from './routes'
import {AllProducts} from './components/products'
import {fetchProducts, fetchCategories} from './store'

class App extends React.Component {
  componentDidMount() {
    this.props.fetchProducts()
    this.props.fetchCategories()

    if (!this.props.user.id) {

     if (!localStorage.cart) {
     // let guestCart = JSON.stringify([{id: 1, quantity: 2}])

       localStorage.setItem('cart', [])

       console.log('localstorage', localStorage);
     }
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
    fetchCategories: () => dispatch(fetchCategories())
  }
}
const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
