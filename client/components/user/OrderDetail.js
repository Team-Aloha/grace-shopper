import React from 'react'

import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchOneProduct, updateProduct} from '../../store'
import {fetchCategories} from '../../store'
import store from '../../store'

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
    const userId = this.props.match.params.userId
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
  render() {
    if (Object.keys(this.props.user).length < 1) {
      return <div>User not logged in...</div>
    }

    return (
      <div className="container">
        <h3 className="center-align">Order</h3>
        <div className="card">
          <div className="card-content" id="order-card">
            <ul className="collection">
              {DUMMY_PRODUCTS.map(product => (
                <li className="collection-item avatar">
                  {/* <i className="material-icons circle red">play_arrow</i> */}
                  <Link to={`/products/${product.id}`}>
                    <img
                      className="order-image left"
                      src="/defaultShirt.png"
                      alt=""
                    />
                  </Link>
                  <p>
                    <h6 className="item-title">{`${product[0].title}`}</h6>{' '}
                    <br />
                  </p>
                  <a href="#!" className="secondary-content">
                    <p>
                      Price: {product[0].price} <br />
                      Quantity: {product[0].quantity}
                    </p>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch: dispatch
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OrderDetail)
)
