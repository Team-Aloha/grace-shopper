import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCart} from '../../store'
import StripeCheckout from 'react-stripe-checkout'
if (process.env.NODE_ENV !== 'production') require('../../../secrets')
//   import { handleToken } from '...store_path'

class StripeCheckoutButton extends Component {
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
    } else {
      const productsInCart = []

      this.props.cart.forEach(product => {
        productsInCart.push(
          this.props.products.filter(prod => prod.id === product.id)
        )
      })
      let totalAmount = productsInCart
        .map((item, i) => {
          if (item[0]) {
            const displayItem = item[0]
            return displayItem.price * this.props.cart[i].quantity
          }
        })
        .reduce((a, b) => a + b, 0)
      return (
        <StripeCheckout
          name="GraceShopper"
          description={`${totalAmount} for Grace Shopper`}
          amount={totalAmount}
          token={token => console.log(token)}
          // token={token=>this.props.handleToken(token)}
          stripeKey={process.env.REACT_APP_STRIPE_KEY}
        >
          <button className="btn waves-effect waves-light btn-large blue lighten-2">
            Checkout
          </button>
        </StripeCheckout>
      )
    }
  }
}
const mapStateToProps = state => {
  return {
    cart: state.cart,
    products: state.products
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCart: () => {
      dispatch(getCart())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  StripeCheckoutButton
)
