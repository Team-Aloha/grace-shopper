import React from 'react'
import {connect} from 'react-redux'
import {getCart, deleteProduct, setCart} from '../../store'
import {default as SingleCartItem} from './SingleCartItem'

class Cart extends React.Component {
  constructor() {
    super()
    this.state = {
      loaded: false,
      cart: []
    }
  }

  r
  handleRemove = id => {
    console.log('trying to remove id ', id)
    console.log(this.state)
    this.props.deleteProduct(id)
  }

  handleUpdate = () => {
    console.log('trying to update  ')
  }
  componentDidMount() {
    //ask if theres a user

    if (!this.props.user.id) {
      let guestCart = JSON.parse(localStorage.getItem('cart'))

      this.props.setCart(guestCart)
      this.setState({loaded: true})
    } else {
      this.props.getCart()
      console.log('mount')

      this.setState({loaded: true})
    }
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
        </React.Fragment>
      )
    }
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
    }
  }
}

export default connect(mapState, mapDispatch)(Cart)
