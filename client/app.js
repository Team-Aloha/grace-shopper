import React from 'react'
import {Route, withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {Navbar} from './components'
import Routes from './routes'
import AllProducts from './components/products/AllProducts'
import {fetchProducts} from './store'

class App extends React.Component {
  componentDidMount() {
    this.props.fetchProducts()
  }
  render() {
    return (
      <div>
        {/* <AllProducts /> */}
        <Navbar />
        <Routes />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: () => dispatch(fetchProducts())
  }
}

export default withRouter(connect(null, mapDispatchToProps)(App))
