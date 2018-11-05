import React from 'react'
import numeral from 'numeral'
import Select from 'react-select'

const options = [
  {value: 'processing', label: 'Processing'},
  {value: 'shipped', label: 'Shipped'},
  {value: 'received', label: 'Received'},
  {value: 'cancelled', label: 'Cancelled'}
]

const getTotalAmount = products => {
  let totalAmount = products
    .map((item, i) => {
      const displayItem = item
      return displayItem.price * displayItem.quantity
    })
    .reduce((a, b) => a + b, 0)
  return `${totalAmount}`
}

export default class AdminOrderListRow extends React.Component {
  constructor() {
    super()
    this.state = {status: ''}
  }
  handleChange = evt => {
    console.log(evt)
    this.setState({status: evt})
    this.props.adminSetOrderStatus(this.props.order.id, evt.value)
  }

  componentDidMount() {
    this.setState({
      status: options.map(opt => {
        if (opt.value === this.props.order.status) return opt
      })
    })
  }

  render() {
    const {order} = this.props
    const {status} = this.state
    //console.log(order)

    return (
      <React.Fragment>
        <tr>
          <td>{order.id}</td>
          <td>{order.user.email}</td>
          <td>
            {numeral(getTotalAmount(order.products) / 100).format('$0,0.0)')}
          </td>
          <td>
            <Select
              value={this.state.status}
              onChange={this.handleChange}
              options={options}
            />
          </td>
        </tr>
      </React.Fragment>
    )
  }
}
