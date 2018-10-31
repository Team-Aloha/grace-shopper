import React from 'react'

const SingleCartItem = props => {
  const {item, quantity} = props
  console.log('in here ', props)
  return (
    <React.Fragment>
      <tr>
        <td>{item.title}</td>

        <td>{quantity}</td>
        <td>{item.price}</td>
        <td>{quantity * item.price}</td>
        <td>Remove Button Here</td>
      </tr>
    </React.Fragment>
  )
}

export default SingleCartItem
