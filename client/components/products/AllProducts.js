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
  renderButton(){

    if(this.props && this.props.user.isAdmin){
      return (
        <button onClick={this.handleClick}>
        Add a Product
        </button>
        )
      }
    }


  handleClick = () => {
    this.props.history.push('/admin/products/add')

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
    console.log(this.props, 'props')
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
              src="http://corkscrewjc.com/wp-content/uploads/2014/12/maui-hawaii-beach.jpg"
              alt="Unsplashed background img 2"
              style={{opacity: 1}}
            />
          </div>
        </div>

<div className="yellow lighten-5">


        <div className="container">
          <div className="row">
            <nav>
              <div id="category-nav" className="nav-wrapper teal lighten-2">
                <ul className="left hide-on-med-and-down">
                  <li>
                    <a href="">Categories:</a>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => this.props.setVisibilityFilter(-1)}
                    >
                      All
                    </button>
                  </li>
                  {this.props.categories.map(category => (
                    <li key={category.id}>
                      <button
                        type="button"
                        onClick={() =>
                          this.props.setVisibilityFilter(category.id)
                        }
                      >
                        {category.name}
                      </button>
                    </li>
                  ))}
                </ul>
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
        </div>
      </React.Fragment>

    )
  }
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AllProducts)
)
