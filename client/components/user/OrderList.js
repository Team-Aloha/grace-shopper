import React from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchOneProduct, updateProduct, fetchOrders} from '../../store'
import {fetchCategories} from '../../store'
import store from '../../store'

const getTotalAmount = products => {
  let totalAmount = products
    .map((item, i) => {
      const displayItem = item
      return displayItem.price * displayItem.quantity
    })
    .reduce((a, b) => a + b, 0)
  return `${totalAmount}`
}

const DUMMY_ORDERS = [
  {
    id: 1,
    createdAt: '1/1/2018',
    status: 'shipped',
    products: [
      [
        {
          id: 1,
          title: 'blue shirt',
          price: 100,
          quantity: 1,
          imageUrl: 'defaultShirt.png'
        }
      ],
      [
        {
          id: 2,
          title: 'red shirt',
          price: 200,
          quantity: 1,
          imageUrl: 'defaultShirt.png'
        }
      ]
    ]
  },
  {
    id: 2,
    createdAt: '1/1/2018',
    status: 'pending',
    products: [
      [
        {
          id: 1,
          title: 'pink shirt',
          price: 500,
          quantity: 1,
          imageUrl: 'defaultShirt.png'
        }
      ],
      [
        {
          id: 2,
          title: 'yellow shirt',
          price: 500,
          quantity: 2,
          imageUrl: 'defaultShirt.png'
        }
      ]
    ]
  }
]

export class OrderList extends React.Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     readOnly: true,
  //     orders: []
  //   }
  // store.dispatch(fetchOneCampus(campusId))
  // this.handleChange = this.handleChange.bind(this)
  //this.handleSubmit = this.handleSubmit.bind(this)
  //this.toggleEditProfile = this.toggleEditProfile.bind(this)

  // componentDidUpdate(prevProps, prevState) {
  //   // After fetching redux has passed in the student as
  //   // props, now we want to set those values to our local state
  //   if (prevProps.orders !== this.props.orders) {
  //     this.setState({
  //       orders: this.props.orders
  //     })
  //   }
  // }

  componentDidMount() {
    const userId = this.props.match.params.userId
    //call thunk here
    this.props.fetchOrders()
    console.log(this.props, 'props')
  }

  getProductName = id => {
    const productInfo = this.props.products.filter(product => id === product.id)
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
                      <td>{order.createdAt}</td>
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
