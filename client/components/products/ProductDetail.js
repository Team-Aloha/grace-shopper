import React from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchOneProduct, putCart} from '../../store'
import store from '../../store'

class ProductDetail extends React.Component {

  componentDidMount() {
    const productId = this.props.match.params.productId
    this.props.getAProduct(productId)
  }

  handleSubmit(evt) {
    evt.preventDefault()
    this.props.addProduct(this.props.product)
  }

  render() {
  const {product} = this.props
  return (
    <React.Fragment>
      <tr>
        <td>{product.title}</td>

        <td>{product.quantity}</td>
        <td>{product.price}</td>
        <td onSubmit={this.handleSubmit}>Add to Cart</td>
      </tr>
    </React.Fragment>
  )
  }

}

const mapStateToProps = state => {
  return {
    product: state.product
  }
}

const mapDispatchToProps = (dispatch) => ({
  getAProduct: (productId) => dispatch(fetchOneProduct(productId)),
  addProduct: (product) => dispatch(putCart(product))
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductDetail)
)
