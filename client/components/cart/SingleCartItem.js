import React from 'react'
import {connect} from 'react-redux'
import {updateQuantity, deleteProduct} from '../../store'
const numeral = require('numeral')

//this needs to be a stateful component so we can link the
//quantity to a variable
class SingleCartItem extends React.Component {
  constructor() {
    super()
    this.state = {quantity: 0}
  }
  handleChange = evt => {
    this.setState({quantity: evt.target.value})
    //they are logged in, so use thunk to update store / database
    if (this.props.user.id) {
      this.props.updateQuantity({
        id: this.props.item.id,
        quantity: +evt.target.value
      })
    } else {
      //they are not logged in...gotta do local storage changes then
      //update store!
      console.log('I AM UPDATING CART ON LOCALSTORAGE')
      const newCart = JSON.parse(localStorage.cart).map(product => {
        if (product.id === this.props.item.id) {
          product.quantity = +evt.target.value
        }
        return product
      })
      console.log(newCart)
      localStorage.setItem('cart', JSON.stringify(newCart))
    }
  }

  componentDidMount() {
    this.setState({quantity: this.props.quantity})
  }

  render() {
    //calculate unit price and convert to currency
    const price = numeral(this.props.item.price/100).format('$0,0.00')
    //calculate total price and convert to currency
    const total = numeral((this.props.quantity * this.props.item.price)/100).format('$0,0.00')


    return (
      <React.Fragment>
        <tr>
          <td>{this.props.item.title}</td>

          <td>
            <div className="input-field">
              <input
                name="quantity"
                id="quantity"
                type="number"
                min="0"
                className="validate"
                value={this.state.quantity}
                onChange={this.handleChange}
              />
            </div>
          </td>
          <td>{this.props.inventory}</td>
          <td>{price}</td>{/* price calculated line right below render*/}
          <td>{total}</td>{/* price calculated line right below render */}
          <td>
            <button
              type="button"
              className="btn btn-small waves-effect waves-light red lighten-2"
              onClick={() => this.props.handleRemove(this.props.item.id)}
            >
              Remove
            </button>
          </td>
        </tr>
      </React.Fragment>
    )
  }
}

const mapState = state => {
  const {cart, user} = state
  return {
    cart,
    user
  }
}

const mapDispatch = dispatch => {
  return {
    updateQuantity: product => {
      dispatch(updateQuantity(product))
    },
    deleteProduct: id => {
      dispatch(deleteProduct({id}))
    }
  }
}

export default connect(mapState, mapDispatch)(SingleCartItem)
