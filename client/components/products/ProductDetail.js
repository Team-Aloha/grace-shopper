import React from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchOneProduct, putProductToCart} from '../../store'
import store from '../../store'
import history from '../../history'

class ProductDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 1
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
    const productId = this.props.match.params.productId
    this.props.getAProduct(productId)
  }

  componentDidUpdate(prevProps, prevState) {
    // After fetching redux has passed in the student as
    // props, now we want to set those values to our local state
    if (prevProps.product !== this.props.product) {
      this.setState({
        product: this.props.product
      })
    }
  }
  handleChange(evt) {
    evt.preventDefault()
    this.setState({[evt.target.name]: evt.target.value})
  }

  handleClick(evt) {
    evt.preventDefault()
    this.props.addProduct({
      id: this.props.product.id,
      quantity: this.state.quantity
    })
    history.push('/products')
  }

  render() {
    console.log('the product', this.props.product)

    const {product} = this.props
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col xl6">
              <img className="responsive-img" src="/defaultShirt.png" />
            </div>

            <div className="col xl6">
              <div className="row">
                <div className="col">
                  <h5>{product.title}</h5>
                  <h6>{product.price}</h6>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Amet aliquid eligendi sit consectetur aspernatur sequi et,
                    ex porro obcaecati cupiditate saepe molestias labore
                    voluptas excepturi doloribus magnam praesentium ducimus
                    libero!
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col xl6">
                  <div className="input-field">
                    <input
                      name="quantity"
                      id="quantity"
                      type="number"
                      min="1"
                      className="validate"
                      value={this.state.quantity}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>

                <div className="col xl6 center">
                  <button onClick={this.handleClick} className="btn">
                    <i class="material-icons left">shopping_cart</i>Add To Cart
                  </button>
                </div>
              </div>
            </div>
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
  //{id: 1, quantity: 2}
  addProduct: product => dispatch(putProductToCart(product))
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductDetail)
)
