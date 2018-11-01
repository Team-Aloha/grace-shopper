import React from 'react'

const SingleCartItem = props => {
  const {item, quantity} = props
  return (
    <React.Fragment>
      <tr>
        <td>{item.title}</td>

        <td>{quantity}</td>
        <td>{item.price}</td>
        <td>{quantity * item.price}</td>
        <td>
          <button
            type="button"
            className="btn btn-small waves-effect waves-light red lighten-2"
            onClick={() => props.handleRemove(item.id)}
          >
            Remove
          </button>
        </td>
      </tr>
    </React.Fragment>
  )
}

export default SingleCartItem
