import React from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchOneProduct, updateProduct, fetchOrders} from '../../store'
import {fetchCategories} from '../../store'
import store from '../../store'
const numeral = require('numeral')

const getTotalAmount = products => {
  let totalAmount = products
    .map((item, i) => {
      const displayItem = item
      return displayItem.price * displayItem.quantity
    })
    .reduce((a, b) => a + b, 0)
  return numeral(+totalAmount / 100).format('$0,0.00')
}

export class OrderList extends React.Component {
  componentDidMount() {
    const userId = this.props.match.params.userId
    //call thunk here
    this.props.fetchOrders()
    console.log(this.props, 'props')
  }

  getProductName = id => {
    console.log('called')
    const productInfo = this.props.products.filter(product => id === product.id)
    console.log('debug ', productInfo)
    if (productInfo[0]) {
      return productInfo[0].title
    }
    return ''
  }

  render() {
    if (Object.keys(this.props.user).length < 1) {
      return <div>User not logged in...</div>
    }
    return (
      <React.Fragment>
        <div className="card">
          <div className="card-content" id="order-card">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Products</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {this.props.orders.map(order => {
                  return (
                    <tr key={order.id}>
                      <td>{order.createdAt.toString().slice(0, -14)}</td>
                      <td>
                        {order.products.map(product => (
                          <p key={product.id}>
                            <Link to={`/products/${product.id}`}>
                              {this.getProductName(product.id)}
                            </Link>
                          </p>
                        ))}
                      </td>
                      <td>{getTotalAmount(order.products)}</td>
                      <td>
                        <Link to={`/orders/${order.id}`}>{order.status}</Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  const {user, orders, products, cart} = state
  return {
    user,
    orders,
    products,
    cart
  }
}

//put thunk to fetch orders on props

const mapDispatchToProps = dispatch => ({
  fetchOrders: () => dispatch(fetchOrders())
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OrderList)
)
