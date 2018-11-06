import React from 'react'
import {connect} from 'react-redux'
import {getCart, deleteProduct, setCart, sendOrder} from '../../store'
import {default as SingleCartItem} from './SingleCartItem'
const numeral = require('numeral')

class Cart extends React.Component {
  handleRemove = id => {
    //if user is not logged in, remove item
    if (!this.props.user.id) {
      let guestCart = JSON.parse(localStorage.getItem('cart'))
      //filter out ID you are removing
      const guestCartToAdd = guestCart.filter(product => product.id !== +id)

      localStorage.setItem('cart', JSON.stringify(guestCartToAdd))
      this.props.setCart(guestCartToAdd)
    } else {
      //if they are logged in, dispatch thunk to remove
      this.props.deleteProduct(id)
    }
  }

  handlePlaceOrder = (products, type) => {
    //console.log('placing order!!', products, type)
    // if (!this.props.user.id) localStorage.setItem('cart', JSON.stringify([]))
    this.props.sendOrder(products, type, this.props.user.id)
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
    if (this.props.cart.length < 1) {
      return <div>There are no items in your cart...</div>
    }
    return (
      <div className="card">
        <div className="card-content">
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Inventory</th>
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
                      inventory={
                        this.props.products[this.props.cart[i].id - 1].quantity
                      }
                      handleRemove={this.handleRemove}
                    />
                  )
                }
              })}
              <tr>
                <td />
                <td />
                <td />
                <td>
                  <b>Cart Subtotal:</b>
                </td>
                <td>{numeral(totalAmount / 100).format('$0,0.00')}</td>
                <td />
              </tr>
            </tbody>
          </table>
        </div>
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
