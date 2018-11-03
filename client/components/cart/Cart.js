import React from 'react'
import {connect} from 'react-redux'
import {getCart, deleteProduct, setCart, sendOrder} from '../../store'
import {default as SingleCartItem} from './SingleCartItem'

class Cart extends React.Component {
  handleRemove = id => {
    
    //if user is not logged in, remove item
    if (!this.props.user.id) {
      let guestCart = JSON.parse(localStorage.getItem('cart'))
      //filter out ID you are removing
      let guestCartToAdd = JSON.stringify(
        guestCart.filter(product => {
          return product.id !== id
        })
      )
      localStorage.setItem('cart', [guestCartToAdd])
      this.props.setCart([guestCartToAdd])
    } else {
      //if they are logged in, dispatch thunk to remove
      this.props.deleteProduct(id)
    }
  }

  handlePlaceOrder = (products, type) => {
    console.log('placing order', products, type)
    if (!this.props.user.id) localStorage.setItem(JSON.stringify([]))
    this.props.sendOrder(products, type)
  }
  componentDidMount() {
    //ask if theres a user
    if (!this.props.user.id) {
      let guestCart = JSON.parse(localStorage.getItem('cart'))
      this.props.setCart(guestCart)
    } else {
      this.props.getCart()
    }
  }
  render() {
    const productsInCart = []
    let totalAmount = 0
    this.props.cart.forEach(product => {
      productsInCart.push(
        this.props.products.filter(prod => prod.id === product.id)
      )
    })
    return (
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
                  totalAmount += displayItem.price * this.props.cart[i].quantity
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
        <button
          type="button"
          onClick={() =>
            this.handlePlaceOrder(
              this.props.cart,
              this.props.user.id ? 'registered' : 'guest'
            )
          }
        >
          Place Order Test
        </button>
      </div>
    )
  }
}

const mapState = state => {
  const {cart, products, user} = state
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
