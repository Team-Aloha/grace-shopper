import React from 'react'

const SingleProductDetail = props => {
  const {item} = props
  return (
    <React.Fragment>
      <tr>
        <td>{item.title}</td>

        <td>{quantity}</td>
        <td>{item.price}</td>
        <td>Add Button Here</td>
      </tr>
    </React.Fragment>
  )
}

export default SingleProductDetail
