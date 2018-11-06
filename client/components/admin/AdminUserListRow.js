import React from 'react'
import numeral from 'numeral'
import Select from 'react-select'

const options = [
  {value: false, label: 'Regular User'},
  {value: true, label: 'Admin'}
]

export default class AdminUserListRow extends React.Component {
  constructor() {
    super()
    this.state = {status: ''}
  }
  handleChange = evt => {
    //console.log(evt)
    this.setState({status: evt})
    console.log(evt.value)
    this.props.adminSetUserPriviledge(this.props.user.id, evt.value)
  }

  componentDidMount() {
    console.log(this.props.user)
    this.setState({
      status: options.map(opt => {
        if (opt.value === this.props.user.isAdmin) return opt
      })
    })
    console.log(this.state, '---')
  }

  render() {
    const {user} = this.props
    const {status} = this.state

    return (
      <React.Fragment>
        <tr>
          <td>{user.id}</td>
          <td>{user.email}</td>
          <td>To Implement</td>
          <td>
            <Select
              value={status}
              onChange={this.handleChange}
              options={options}
            />
          </td>
        </tr>
      </React.Fragment>
    )
  }
}
