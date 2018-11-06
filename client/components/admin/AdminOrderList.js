import React from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchAdminOrders, adminSetOrderStatus} from '../../store'
import numeral from 'numeral'
import {default as AdminOrderListRow} from './AdminOrderListRow'

const getTotalAmount = products => {
  let totalAmount = products
    .map((item, i) => {
      const displayItem = item
      return displayItem.price * displayItem.quantity
    })
    .reduce((a, b) => a + b, 0)
  return `${totalAmount}`
}

export class AdminOrderList extends React.Component {
  componentDidMount() {
    //call thunk here
    this.props.fetchAdminOrders()
  }

  getProductName = id => {
    const productInfo = this.props.products.filter(product => id === product.id)
    if (productInfo[0]) {
      return productInfo[0].title
    }
    return ''
  }

  render() {
    return (
      <React.Fragment>
        <table className="table-responsive">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User ID</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {this.props.orders.map(order => {
              return (
                <AdminOrderListRow
                  key={order.id}
                  order={order}
                  adminSetOrderStatus={this.props.adminSetOrderStatus}
                />
              )
            })}
          </tbody>
        </table>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  const {orders} = state
  return {
    orders
  }
}

const mapDispatchToProps = dispatch => ({
  fetchAdminOrders: () => dispatch(fetchAdminOrders()),
  adminSetOrderStatus: (id, status) => dispatch(adminSetOrderStatus(id, status))
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AdminOrderList)
)
