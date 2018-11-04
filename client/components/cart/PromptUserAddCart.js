import React from 'react'
import {connect} from 'react-redux'
import {getLocalCart, deleteProduct, setCart, sendOrder} from '../../store'
import {default as SingleCartItem} from './SingleCartItem'
import {fetchProducts} from '../../store'

class PromptUserAddLocalCart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cart: [],
      loading: true
    }
  }
  componentDidMount() {
    // this.props.fetchProducts()
    let localCart = JSON.parse(localStorage.getItem('cart'))
    this.setState({cart: localCart})
    this.props.setCart(localCart)
    this.setState({loading: false})
  }
  render() {
    // console.log('the cart', this.state.cart)
    // console.log('the products', this.props.products)

    if (this.state.loading && !this.props.products.length) {
      return <div>nothing to load</div>
    } else {
      let productsInCart = []
      let totalAmount = 0

      this.state.cart.forEach(product => {
        productsInCart.push(
          this.props.products.filter(prod => prod.id === product.id)
        )
      })
      return (
        <div className="container">
          <h5 className="center">
            Do you want to add these current items to your cart?
          </h5>
          <div className="row">
            <div className="col s12 xl12">
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
                            displayItem.price * this.state.cart[i].quantity
                          return (
                            <tr>
                              <td>{displayItem.title}</td>

                              <td>
                                <div className="input-field">
                                  <input
                                    name="quantity"
                                    id="quantity"
                                    type="number"
                                    min="0"
                                    className="validate"
                                    value={displayItem.quantity}
                                  />
                                </div>
                              </td>
                              <td>{displayItem.price}</td>
                              <td>{displayItem.quantity * item.price}</td>
                              <td>
                                <button
                                  type="button"
                                  className="btn btn-small waves-effect waves-light red lighten-2"
                                  onClick={() =>
                                    props.handleRemove(displayItem.id)
                                  }
                                >
                                  Remove
                                </button>
                              </td>
                            </tr>
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
            </div>
          </div>
        </div>
      )
    }
  }
}

const mapState = state => {
  const {products} = state
  return {
    products
  }
}
const mapDispatch = dispatch => {
  return {
    setCart: cart => {
      dispatch(setCart(cart))
    },
    fetchProducts: () => dispatch(fetchProducts())
  }
}

export default connect(mapState, mapDispatch)(PromptUserAddLocalCart)
