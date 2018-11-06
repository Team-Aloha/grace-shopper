import React from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import store from '../../store'
import Profile from './Profile'
import OrderList from './OrderList'

class ProfilePage extends React.Component {
  componentDidMount() {}

  handleChange(evt) {}

  handleSubmit = evt => {}

  render() {
    return (
      <React.Fragment>
        <div className="sand">
          <div className="container">
            <div className="row">
              <div className="center-align titleHome">
                <h3>Your Profile</h3>
              </div>
            </div>
            <div className="row">
              <div className="col s12 xl5">
                <Profile />
              </div>
              <div className="col s12 xl7">
                <h5 className="center-align">Orders</h5>
                <OrderList />
              </div>
            </div>
          </div>
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
  connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
)
