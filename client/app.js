import React from 'react'
import {Route, withRouter, Link} from 'react-router-dom'
import {Navbar} from './components'
import Routes from './routes'
import AllProducts from './components/products/AllProducts'
import UserHome from './components/user-home'

class App extends React.Component {
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

export default App
