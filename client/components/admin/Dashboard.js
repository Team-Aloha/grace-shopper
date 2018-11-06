import React from 'react'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'

const Dashboard = props => {
  return (
    <div className="container">
      <div className="row">
        <nav id="category-nav">
          <div className="nav-wrapper">
            <ul className="left hide-on-med-and-down">
              <li>
                <a className="white-text" href="">
                  Admin Actions:
                </a>
              </li>
              <li>
                <a className="white-text" onClick={() => console.log('foo')}>
                  Add Products
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  )
}

const mapState = state => {
  return {}
}

const mapDispatch = dispatch => {
  return {}
}

export default withRouter(connect(mapState, mapDispatch)(Dashboard))
