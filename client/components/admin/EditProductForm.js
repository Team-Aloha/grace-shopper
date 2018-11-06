import React from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {
  fetchOneProduct,
  updateProduct,
  fetchCategories,
  store
} from '../../store'
import Select from 'react-select'

class EditProductForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: '',
      price: 0,
      quantity: 0,
      imageUrl: '',
      categories: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    // After fetching redux has passed in the student as
    // props, now we want to set those values to our local state
    if (prevProps.product !== this.props.product) {
      if (this.props.product) {
        const catArray = this.props.product.categories.map(cat => {
          const filteredArray = this.props.categories.filter(
            filterCat => filterCat.id === cat
          )
          if (filteredArray.length > 0) {
            return {
              value: cat,
              label: filteredArray[0].name
            }
          }
        })
        this.setState({
          ...this.props.product,
          categories: catArray
        })
      }
    }
  }

  componentDidMount() {
    const productId = this.props.match.params.productId
    this.props.dispatch(fetchOneProduct(productId))
    this.props.getCategories()
  }

  handleChange(evt) {
    if (evt.target) {
      this.setState({[evt.target.name]: evt.target.value})
    } else {
      this.setState({categories: evt})
    }
  }

  handleSubmit = evt => {
    evt.preventDefault()
    console.log('in handle submit')
    const categories = this.state.categories.map(category => {
      return category.value
    })
    this.props.updateProduct({...this.state, categories})
  }

  render() {
    if (Object.keys(this.props.product).length < 1) {
      return <div>Loading...</div>
    }

    return (
      <React.Fragment>
        <div className="row center-align">
          <div className="col s12 l6 offset-l3">
            <div className="card">
              <div className="card-content">
                <span className="card-title">
                  <h3>Update Product</h3>
                </span>
                <div className="row">
                  <div className="input-field">
                    <button
                      type="button"
                      className="btn waves-effect waves-light btn-large blue lighten-2"
                      onClick={this.handleSubmit}
                    >
                      Save Product
                    </button>
                  </div>
                </div>
                <form className="s12 l6" onSubmit={this.handleSubmit}>
                  <div className="row">
                    <div className="input-field">
                      <input
                        name="title"
                        id="title"
                        type="text"
                        className="validate"
                        value={this.state.title}
                        onChange={this.handleChange}
                      />
                      <label className="active" htmlFor="title">
                        Product Name
                      </label>
                    </div>
                    <div className="input-field">
                      <input
                        name="description"
                        id="description"
                        type="text"
                        className="validate"
                        value={this.state.description}
                        onChange={this.handleChange}
                      />
                      <label className="active" htmlFor="description">
                        Description
                      </label>
                    </div>
                    <div className="input-field">
                      <input
                        name="price"
                        id="price"
                        type="number"
                        className="validate"
                        value={this.state.price}
                        onChange={this.handleChange}
                      />
                      <label className="active" htmlFor="price">
                        Price
                      </label>
                    </div>
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
                    <div className="input-field">
                      <input
                        name="imageUrl"
                        id="imageUrl"
                        type="text"
                        className="validate"
                        value={this.state.imageUrl}
                        onChange={this.handleChange}
                      />
                      <label className="active" htmlFor="imageUrl">
                        ImageURL
                      </label>
                    </div>

                    <div className="input-field">
                      <Select
                        isMulti
                        name="categories"
                        id="categories"
                        className="validate"
                        onChange={this.handleChange}
                        value={this.state.categories}
                        options={this.props.categories.map(category => {
                          return {
                            value: category.id,
                            label: category.name
                          }
                        })}
                      />
                      <label className="active" htmlFor="categories">
                        Categories
                      </label>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  const {product, categories} = state
  return {
    product,
    categories
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch: dispatch,
    getCategories: () => {
      dispatch(fetchCategories())
    },
    updateProduct: product => {
      dispatch(updateProduct(product))
    }
    // amendProduct: state => {
    //   const fetchedProduct = store.getState().product
    //   const updatedProductInfo = state.product
    //   const newProduct = {...fetchedProduct, ...updatedProductInfo}

    //   dispatch(updateProduct(newProduct))
    //   ownProps.history.push('/admin/products')
    // }
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EditProductForm)
)
