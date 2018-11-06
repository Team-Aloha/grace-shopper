import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
/**
 * COMPONENT
 */

export const NotFound = props => {
  return (
    <div>
      <div className="container wilson">
        <div className="row center">
          <div className="card-content">
            <div className="center white ">
              <h1>404 Not Found, WILLLSON!!!!</h1>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(connect(null)(NotFound))
