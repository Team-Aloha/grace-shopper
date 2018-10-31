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

export default withRouter(connect(null, mapDispatchToProps)(App))
