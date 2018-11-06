import React from 'react'

import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchOneProduct, updateProduct} from '../../store'
import {fetchCategories, fetchOrders} from '../../store'
import store from '../../store'

const DUMMY_USER = {
  address: '13 elm',
  city: 'chicago',
  state: 'il',
  zip: 60651
}
const DUMMY_PRODUCTS = [
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

class OrderDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    // store.dispatch(fetchOneCampus(campusId))
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.toggleEditProfile = this.toggleEditProfile.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    // After fetching redux has passed in the student as
    // props, now we want to set those values to our local state
    if (prevProps.user !== this.props.user) {
      this.setState({
        order: this.props.user
      })
    }
  }

  componentDidMount() {
    const orderId = this.props.match.params.orderId
    this.props.fetchOrders()
    // console.log(this.props, 'props for orderdetail')
    console.log(orderId, 'orderId')
  }

  handleChange(evt) {
    evt.preventDefault()
    const user = {[evt.target.name]: evt.target.value}
    this.setState({user})
  }

  handleSubmit = evt => {
    evt.preventDefault()
  }
  toggleEditProfile = () => {
    this.setState({readOnly: !this.state.readOnly})
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
    console.log(this.props.orders, 'props.order')
    console.log(order, 'order')
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
                    <p>
                      <h6 className="item-title">
                        {this.getProductName(product.id)}
                      </h6>{' '}
                      <br />
                    </p>
                    <a href="#!" className="secondary-content">
                      <p>
                        Price: {product.price} <br />
                        Quantity: {product.quantity}
                      </p>
                    </a>
                  </li>
                ))}
                {/* <h3 className="center-align">Shipped To {order.address} {order.city} {order.state}</h3> */}
              </ul>
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
