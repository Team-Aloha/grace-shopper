import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCart, sendOrder} from '../../store'
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

  onToken = (products, id, userInfo) => token => {
    console.log('placing order WITH STRIPE!!', userInfo)
    console.log(userInfo)
    // if (!this.props.user.id) localStorage.setItem('cart', JSON.stringify([]))
    this.props.sendOrder(products, id, token, userInfo)
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
          token={this.onToken(
            this.props.cart,
            this.props.user.id ? 'registered' : 'guest',
            this.props.userInfo
          )}
          stripeKey="pk_test_k70oj61a7xpuXfEySnZR79IH"
        >
          <button
            type="button"
            className="btn waves-effect waves-light btn-large blue lighten-2"
          >
            Checkout
          </button>
        </StripeCheckout>
      )
    }
  }
}
const mapStateToProps = state => {
  const {cart, products, user} = state
  return {
    cart,
    products,
    user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCart: () => {
      dispatch(getCart())
    },
    sendOrder: (products, type, token, userInfo) => {
      dispatch(sendOrder(products, type, token, userInfo))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  StripeCheckoutButton
)
