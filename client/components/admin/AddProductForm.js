import React from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {postProduct, fetchCategories} from '../../store'
import Select from 'react-select'
class AddProductForm extends React.Component {
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
    // store.dispatch(fetchOneCampus(campusId))
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    this.props.getCategories()
  }
  componentDidUpdate(prevProps, prevState) {
    // if (this.state.categoryOptions.length === 0) {
    //   const tempArray = []
    //   console.log('attempting to add category vals')
    //   this.props.categories.map(category => {
    //     tempArray.push({
    //       value: category.id,
    //       label: category.name
    //     })
    //   })
    //   console.log('our data', tempArray)
    //   console.log(this.state)
    //   this.setState({categoryOptions: [...tempArray]})
    //   console.log(this.state)
    //   console.log('i need categories')
    //   console.log(this.state.categoryOptions)
    // }
  }
  handleChange(evt) {
    //for React Select components, there is no evt.target
    //so normal components are inside the if statement
    //categories handled in else
    //TODO: look into a more elegant way to do this in the future

    if (evt.target) {
      this.setState({[evt.target.name]: evt.target.value})
    } else {
      this.setState({categories: evt})
      console.log(evt)
    }
  }
  handleSubmit = evt => {
    console.log('test')
    evt.preventDefault()
    const categories = this.state.categories.map(category => {
      return category.value
    })

    this.props.createProduct({...this.state, categories})
  }
  render() {
    return (
      <React.Fragment>
        <div className="row center-align">
          <div className="col s12 l6 offset-l3">
            <div className="card">
              <div className="card-content">
                <span className="card-title">
                  <h3>Add Product</h3>
                </span>
                <form className="s12 l6" onSubmit={this.handleSubmit}>
                  <div className="row">
                    <div className="row">
                      <div className="input-field">
                        <button
                          type="submit"
                          className="btn waves-effect waves-light btn-large blue lighten-2"
                        >
                          Add Product
                        </button>
                      </div>
                    </div>
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
                      <label className="active" htmlFor="categories">
                        Categories
                      </label>
                      <Select
                        isMulti
                        name="categories"
                        id="categories"
                        className="validate"
                        onChange={this.handleChange}
                        value={this.state.categories}
                        options={this.props.categories.map(category => {
                          return {value: category.id, label: category.name}
                        })}
                      />
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
  return {
    categories: state.categories
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createProduct: state => {
      dispatch(postProduct(state))
      ownProps.history.push('/admin/products')
    },
    getCategories: () => {
      dispatch(fetchCategories())
    }
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddProductForm)
)
