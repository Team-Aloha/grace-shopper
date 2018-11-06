import React from 'react'
import {connect} from 'react-redux'
import {setVisibilityFilter} from '../../store'
import {withRouter, Link} from 'react-router-dom'
import {default as ProductCard} from './ProductCard'
const mapStateToProps = state => {
  return {
    categories: state.categories,
    user: state.user,
    prods: state.products.filter(product => {
      if (state.filter.visibilityFilter === -1) {
        return true
      } else {
        return product.categories.includes(state.filter.visibilityFilter)
      }
    })
  }
}
const mapDispatchToProps = dispatch => ({
  setVisibilityFilter: newFilter => dispatch(setVisibilityFilter(newFilter))
})

class AllProducts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      search: ''
    }
  }
  renderButton() {
    if (this.props && this.props.user.isAdmin) {
      return <button onClick={this.handleClick}>Add a Product</button>
    }
  }

  handleClick = () => {
    this.props.history.push('/admin/products/add')
  }
  handleChange = evt => {
    evt.preventDefault()
    this.setState({[evt.target.name]: evt.target.value})
  }

  handleSubmitSearch = evt => {
    evt.preventDefault()
    console.log('submitted')
  }
  render() {
    // const isAdmin = this.state.user.isAdmin
    // adminButton = function(props) {
    //   return (
    //     <button onClick={props.onClick}>
    //     Add a Product
    //     </button>
    //   )
    // }
    if (!this.props) {
      return <div>Loading...</div>
    }

    return (
      <React.Fragment>
        <div className="parallax-container valign-wrapper">
          <div className="section no-pad-bot">
            <div className="container">
              <div className="row center">
                <h3 className="header col s12 l12 light">Aloha!</h3>
              </div>
            </div>
          </div>
          <div className="parallax">
            <img
              src="http://jkreativ.jegtheme.com/wp-content/uploads/2014/05/geometric.png"
              alt="Unsplashed background img 2"
              style={{opacity: 1}}
            />
          </div>
        </div>

        <div className="container">
          <div className="row">
            <nav id="category-nav">
              <div className="nav-wrapper">
                <ul className="left hide-on-med-and-down">
                  <li>
                    <a className="white-text" href="">
                      Categories:
                    </a>
                  </li>
                  <li>
                    <a
                      className="white-text"
                      onClick={() => this.props.setVisibilityFilter(-1)}
                    >
                      All
                    </a>
                  </li>
                  {this.props.categories.map(category => (
                    <li key={category.id}>
                      <a
                        className="white-text"
                        onClick={() =>
                          this.props.setVisibilityFilter(category.id)
                        }
                      >
                        {category.name}
                      </a>
                    </li>
                  ))}
                </ul>
                <form
                  className="hide-on-med-and-down"
                  onSubmit={this.handleSubmitSearch}
                >
                  <div className="input-field right">
                    <input
                      id="search"
                      type="search"
                      name="search"
                      onChange={this.handleChange}
                      required
                    />
                    <label className="label-icon" htmlFor="search">
                      <i className="material-icons">search</i>
                    </label>
                    <i className="material-icons">close</i>
                  </div>
                </form>
              </div>
            </nav>
          </div>
          <div className="row">
            {this.props.prods.map(product => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
          {this.renderButton()}
        </div>
      </React.Fragment>
    )
  }
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AllProducts)
)
