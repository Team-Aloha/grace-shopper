import React from 'react'

import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchOneProduct, updateProduct} from '../../store'
import {fetchCategories, fetchOrders} from '../../store'
import store from '../../store'
const numeral = require('numeral')

const DUMMY_USER = {
  address: '13 elm',
  city: 'chicago',
  state: 'il',
  zip: 60651
}

class OrderDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      address: '',
      city: '',
      state: '',
      zip: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    // After fetching redux has passed in the student as
    // props, now we want to set those values to our local state
    if (prevProps.user !== this.props.user) {
      this.setState({
        ...this.props.user
      })
    }
  }

  componentDidMount() {
    const orderId = this.props.match.params.orderId
    this.props.fetchOrders()
    this.setState({...this.props.user})
  }

  handleChange(evt) {
    evt.preventDefault()
    const user = {[evt.target.name]: evt.target.value}
    this.setState({user})
  }

  handleSubmit = evt => {
    evt.preventDefault()
  }

  getProductName = id => {
    const productInfo = this.props.products.filter(product => id === product.id)
    if (productInfo[0]) {
      return productInfo[0].title
    }
    return ''
  }

  getProductImage = id => {
    const productInfo = this.props.products.filter(product => id === product.id)
    if (productInfo[0]) {
      return productInfo[0].imageUrl
    }
    return ''
  }

  render() {
    console.log(this.props, 'propsorderdetail')
    if (Object.keys(this.props.user).length < 1) {
      return <div>User not logged in...</div>
    }
    const orderId = Number(this.props.match.params.orderId)
    const order = this.props.orders.filter(item => item.id === +orderId)[0]
    if (order) {
      return (
        <div className="container">
          <h3 className="center-align">Order</h3>
          <div className="card">
            <div className="card-content" id="order-card">
              <ul className="collection">
                {order.products.map(product => (
                  <li className="collection-item avatar" key={product.id}>
                    {/* <i className="material-icons circle red">play_arrow</i> */}
                    <Link to={`/products/${product.id}`}>
                      <img
                        className="order-image left"
                        src={`/${this.getProductImage(product.id)}`}
                        alt=""
                      />
                    </Link>
                    <h6 className="item-title">
                      {this.getProductName(product.id)}
                    </h6>{' '}
                    <br />
                    <a href="#!" className="secondary-content">
                      <p>
                        Price: {numeral(product.price / 100).format('$0,0.00')}{' '}
                        <br />
                        Quantity: {product.quantity}
                      </p>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <h3 className="center-align">Shipped To</h3>
          <div className="card">
            <div className="card-content" id="order-card">
              <div className="input-field">
                <input
                  name="address"
                  id="address"
                  type="text"
                  className="validate"
                  value={this.props.user.address}
                  onChange={this.handleChange}
                  readOnly={true}
                />
                <label className="active" htmlFor="address">
                  Address
                </label>
              </div>
              <div className="input-field">
                <input
                  name="city"
                  id="city"
                  type="text"
                  className="validate"
                  value={this.props.user.city}
                  onChange={this.handleChange}
                  readOnly={true}
                />
                <label className="active" htmlFor="city">
                  City
                </label>
              </div>
              <div className="input-field">
                <input
                  name="state"
                  id="state"
                  type="text"
                  className="validate"
                  value={this.props.user.state}
                  onChange={this.handleChange}
                  readOnly={true}
                />
                <label className="active" htmlFor="state">
                  State
                </label>
              </div>
              <div className="input-field">
                <input
                  name="zip"
                  id="zip"
                  type="text"
                  pattern="[0-9]{5}"
                  className="zip"
                  value={this.props.user.zip}
                  onChange={this.handleChange}
                  readOnly={true}
                />
                <label className="active" htmlFor="zip">
                  Zip
                </label>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return <div />
    }
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    orders: state.orders,
    products: state.products
  }
}

const mapDispatchToProps = dispatch => ({
  fetchOrders: () => dispatch(fetchOrders())
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OrderDetail)
)
