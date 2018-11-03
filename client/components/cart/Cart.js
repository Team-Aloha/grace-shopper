import React from 'react'
import {connect} from 'react-redux'
import {getCart, deleteProduct, setCart, sendOrder} from '../../store'
import {default as SingleCartItem} from './SingleCartItem'

class Cart extends React.Component {
  constructor() {
    super()
    this.state = {
      loaded: false,
      cart: []
    }
  }

  handleRemove = id => {
    // if (!this.props.user.id) {
    //   this.props.products = this.props.products.filter(product => {
    //    return product.id !== id
    //   })

    // }
    console.log('trying to remove id ', id)
    console.log(this.props, 'this.props')
    this.props.deleteProduct(id)
  }

  handlePlaceOrder = (products, type) => {
    console.log('placing order', products, type)
    this.props.sendOrder(products, type)
  }

  componentDidMount() {
    //ask if theres a user
    //this is currently running before it finishes getting the user data
    //from the store so it is always saying they are not
    //logged in...not quite sure how to fix...
    //using the update hooks just creates an infinite loop
    if (!this.props.user.id) {
      let guestCart = JSON.parse(localStorage.getItem('cart'))
      console.log('I AM NOT LOGGED IN SO SENDING MY LOCALSTORAGE')
      this.props.setCart(guestCart)
      this.setState({loaded: true})
    } else {
      this.props.getCart()
      console.log('i am logged in and getting my cart')
      this.setState({loaded: true})
    }

    //comment above and uncomment this to test
    // this.props.getCart()
    // console.log('i am logged in and getting my cart')
    // this.setState({loaded: true})
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
                          handleRemove={this.handleRemove}
                          sendQuantityBack={this.receiveStateFromChild}
                        />
                      )
                    }
                  })}
                  <tr>
                    <td />
                    <td />
                    <td>
                      <b>Cart Subtotal:</b>
                    </td>
                    <td>{totalAmount}</td>
                    <td />
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <button
            type="button"
            onClick={() => this.handlePlaceOrder(this.props.cart, 'registered')}
          >
            Place Order Test
          </button>
        </React.Fragment>
      )
    }
  }
}

const mapState = state => {
  const {cart, products, user} = state
  // console.log('i have mapped state to props')
  return {
    cart,
    products,
    user
  }
}
const mapDispatch = dispatch => {
  return {
    setCart: cart => {
      dispatch(setCart(cart))
    },
    getCart: () => {
      // console.log('i am getting my cart using redux')
      dispatch(getCart())
    },
    deleteProduct: id => {
      dispatch(deleteProduct({id}))
    },
    sendOrder: (products, type) => {
      dispatch(sendOrder(products, type))
    }
  }
}

export default connect(mapState, mapDispatch)(Cart)
