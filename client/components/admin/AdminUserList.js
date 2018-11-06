import React from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {adminFetchUsers, adminSetUserPriviledge} from '../../store'
import {default as AdminUserListRow} from './AdminUserListRow'

export class AdminUserList extends React.Component {
  componentDidMount() {
    //call thunk here
    this.props.adminFetchUsers()
  }

  render() {
    return (
      <React.Fragment>
        <table className="table-responsive">
          <thead>
            <tr>
              <th>User ID</th>
              <th>User Email</th>
              <th>User Address</th>
              <th>isAdmin</th>
            </tr>
          </thead>
          <tbody>
            {this.props.adminUserList.map(user => {
              return (
                <AdminUserListRow
                  key={user.id}
                  user={user}
                  adminSetUserPriviledge={this.props.adminSetUserPriviledge}
                />
              )
            })}
          </tbody>
        </table>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  const {adminUserList} = state
  return {
    adminUserList
  }
}

const mapDispatchToProps = dispatch => ({
  adminFetchUsers: () => dispatch(adminFetchUsers()),
  adminSetUserPriviledge: (id, status) =>
    dispatch(adminSetUserPriviledge(id, status))
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AdminUserList)
)
