import React from 'react'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'

const Dashboard = props => {
  return <div>Dashboard here</div>
}

const mapState = state => {
  return {}
}

const mapDispatch = dispatch => {
  return {}
}

export default withRouter(connect(mapState, mapDispatch)(Dashboard))
