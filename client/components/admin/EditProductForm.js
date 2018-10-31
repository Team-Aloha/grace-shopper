import React from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'

class EditProductForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: ''
    }
    // store.dispatch(fetchOneCampus(campusId))
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {}
  handleChange(evt) {
    evt.preventDefault()
    const campus = {[evt.target.name]: evt.target.value}
  }
  handleSubmit = evt => {
    evt.preventDefault()
    //   this.props.amendCampus(this.state)
  }
  render() {
    console.log('the product id', this.props.match.params.productId)

    return (
      <React.Fragment>
        {' '}
        <div className="row center-align">
          <div className="col s12 l6 offset-l3">
            <div className="card">
              <div className="card-content">
                <span className="card-title">
                  <h3>Update Product</h3>
                </span>
                <form className="s12 l6" onSubmit={this.handleSubmit}>
                  <div className="row">
                    <div className="input-field">
                      <input
                        name="title"
                        id="title"
                        type="text"
                        className="validate"
                        // value={this.state.campus.name}
                        // onChange={this.handleChange}
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
                        // value={this.state.campus.name}
                        // onChange={this.handleChange}
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
                        // value={this.state.campus.name}
                        // onChange={this.handleChange}
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
                        // value={this.state.campus.name}
                        // onChange={this.handleChange}
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
                        // value={this.state.campus.name}
                        // onChange={this.handleChange}
                      />
                      <label className="active" htmlFor="imageUrl">
                        ImageURL
                      </label>
                    </div>
                    <div className="input-field">
                      <input
                        name="categories"
                        id="categories"
                        type="text"
                        className="validate"
                        // value={this.state.campus.name}
                        // onChange={this.handleChange}
                      />
                      <label className="active" htmlFor="categories">
                        Categories
                      </label>
                    </div>
                  </div>

                  <div className="row">
                    <div className="input-field">
                      <button className="btn waves-effect waves-light btn-large blue lighten-2">
                        Update Product
                      </button>
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
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EditProductForm)
)
