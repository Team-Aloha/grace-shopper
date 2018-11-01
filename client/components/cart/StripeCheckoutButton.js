import React, {Component} from 'react'
import {connect} from 'react-redux'
import StripeCheckout from 'react-stripe-checkout'
require('../../../secrets')
//   import { handleToken } from '...store_path'

class StripeCheckoutButton extends Component {
  render() {
    debugger
    return (
      <StripeCheckout
        name="GraceShopper"
        description="$5 for a shirt"
        amount={500}
        token={token => console.log(token)}
        // token={token=>this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn waves-effect waves-light btn-large blue lighten-2">
          Continue to Checkout
        </button>
      </StripeCheckout>
    )
  }
}
const mapDispatchToProps = dispatch => {
  return {
    // handleToken: handleToken
  }
}

export default connect(null, mapDispatchToProps)(StripeCheckoutButton)
