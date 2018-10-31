import React from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {getCart} from '../../store'
import SingleCartItem from './SingleCartItem'

class Cart extends React.Component {
  constructor() {
    super()
    this.state = {
      loaded: false
    }
  }
  componentDidMount() {
    this.props.getCart()
    this.setState({loaded: true})
  }
  render() {
    if (!this.state.loaded) {
      return <React.Fragment>I AM LOADING</React.Fragment>
    } else if (this.props.cart.length === 0) {
      return (
        <React.Fragment>Your cart is empty! Go buy some stuff</React.Fragment>
      )
    } else {
      //we have a cart time to load it
      const productsInCart = []
      this.props.cart.forEach(product => {
        productsInCart.push(
          this.props.products.filter(prod => prod.id === product)
        )
      })
      console.log('my cart is ', productsInCart)
      return (
        <React.Fragment>
          {productsInCart.map(item => {
            if (item[0]) {
              //here to prevent render errors
              const displayItem = item[0]
              return <SingleCartItem key={displayItem.id} />
            }
          })}
        </React.Fragment>
      )
    }
  }
}

const mapState = state => {
  const {cart, products} = state
  return {
    cart,
    products
  }
}
const mapDispatch = dispatch => {
  return {
    getCart: () => {
      dispatch(getCart())
    }
  }
}

export default connect(mapState, mapDispatch)(Cart)
