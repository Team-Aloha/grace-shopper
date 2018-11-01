import React from 'react'
import {connect} from 'react-redux'
import {updateQuantity} from '../../store'
class SingleCartItem extends React.Component {
  constructor() {
    super()
    this.state = {quantity: 0}
  }
  handleChange = evt => {
    this.setState({quantity: evt.target.value})
    this.props.updateQuantity({
      id: this.props.item.id,
      quantity: evt.target.value
    })
  }

  componentDidMount() {
    this.setState({quantity: this.props.quantity})
  }

  render() {
    return (
      <React.Fragment>
        <tr>
          <td>{this.props.item.title}</td>

          <td>
            <div className="input-field">
              <input
                name="quantity"
                id="quantity"
                type="number"
                min="0"
                className="validate"
                value={this.state.quantity}
                onChange={this.handleChange}
              />
            </div>
          </td>
          <td>{this.props.item.price}</td>
          <td>{this.props.quantity * this.props.item.price}</td>
          <td>
            <button
              type="button"
              className="btn btn-small waves-effect waves-light red lighten-2"
              onClick={() => this.props.handleRemove(this.props.item.id)}
            >
              Remove
            </button>
          </td>
        </tr>
      </React.Fragment>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    updateQuantity: product => {
      dispatch(updateQuantity(product))
    },
    deleteProduct: id => {
      dispatch(deleteProduct({id}))
    }
  }
}

export default connect(null, mapDispatch)(SingleCartItem)
