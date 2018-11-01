import React from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchOneProduct, putCart} from '../../store'
import store from '../../store'

class ProductDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 1
    }
  }
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
          

          <div className="col xl6">
            <div className="row">
                  <div className="col">
                  <h5>Description</h5>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet aliquid eligendi sit consectetur aspernatur sequi et, ex porro obcaecati cupiditate saepe molestias labore voluptas excepturi doloribus magnam praesentium ducimus libero!</p>
                  </div>

              </div>
              <div className="row">
                
                <div className="col xl6">
                <div className="input-field">
                      <input
                        name="quantity"
                        id="quantity"
                        type="number"
                        className="validate"
                        value={this.state.quantity}
                        onChange={this.handleChange}
                      />
                      <label className="active" htmlFor="quantity">
                        Quantity
                      </label>
                    </div>
                </div>
               
               <div className="col xl6">
              
                    <button className="btn"><i class="material-icons left">shopping_cart</i>Add To Cart</button>
 
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
  addProduct: product => dispatch(putCart(product))
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductDetail)
)
