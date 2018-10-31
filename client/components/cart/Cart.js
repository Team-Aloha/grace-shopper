import React from 'react'
import {connect} from 'react-redux'
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
      let totalAmount = 0
      this.props.cart.forEach(product => {
        productsInCart.push(
          this.props.products.filter(prod => prod.id === product.id)
        )
      })
      return (
        <React.Fragment>
          <div className="card">
            <div className="card-content">
              <table>
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>Total Price</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {productsInCart.map((item, i) => {
                    if (item[0]) {
                      //here to prevent render errors
                      const displayItem = item[0]
                      totalAmount +=
                        displayItem.price * this.props.cart[i].quantity
                      return (
                        <SingleCartItem
                          key={displayItem.id}
                          item={displayItem}
                          quantity={this.props.cart[i].quantity}
                        />
                      )
                    }
                  })}
                </tbody>
              </table>
            </div>
          </div>
          Cart Subtotal: {totalAmount}
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
