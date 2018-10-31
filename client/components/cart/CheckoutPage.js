import React from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import store from '../../store'
import CheckoutForm from './CheckoutForm'
// import Cart from './Cart'

class CheckoutPage extends React.Component {
  componentDidMount() {}

  handleChange(evt) {}

  handleSubmit = evt => {}

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col s12 xl8">
              <CheckoutForm />
            </div>
          </div>
          {/* <Cart /> */}
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CheckoutPage)
)
