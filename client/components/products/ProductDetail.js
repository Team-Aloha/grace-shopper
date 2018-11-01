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
        <div className="container">
        <div className="row">
          <div className="col xl6">
              <img className="responsive-img" src="/defaultShirt.png" />
            </div>
          </div>

          <div className="col xl6">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet aliquid eligendi sit consectetur aspernatur sequi et, ex porro obcaecati cupiditate saepe molestias labore voluptas excepturi doloribus magnam praesentium ducimus libero!</p>
          </div>



        </div>
        
          
     
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    product: state.product
  }
}

const mapDispatchToProps = dispatch => ({
  getAProduct: productId => dispatch(fetchOneProduct(productId)),
  addProduct: product => dispatch(putCart(product))
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductDetail)
)
