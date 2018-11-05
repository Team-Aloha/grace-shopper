import React from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import store from '../../store'
import CheckoutForm from './CheckoutForm'
import {default as Cart} from './Cart'

class CheckoutPage extends React.Component {
  componentDidMount() {}

  handleChange(evt) {}

  handleSubmit = evt => {}

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="center-align">
              <h3>Review your order</h3>
            </div>
          </div>
          <div className="row">
            <div className="col s12 xl5">
              <CheckoutForm />
            </div>
            <div className="col s12 xl7">
              <Cart />
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  const {cart} = state
  return {
    cart
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CheckoutPage)
)
