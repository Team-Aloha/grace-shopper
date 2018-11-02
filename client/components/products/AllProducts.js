import React from 'react'
import {connect} from 'react-redux'
import {setVisibilityFilter} from '../../store'
import {withRouter, Link} from 'react-router-dom'
import {default as ProductCard} from './ProductCard'
const mapStateToProps = state => {
  return {
    categories: state.categories,
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
  render() {
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
            <nav>
              <div className="nav-wrapper">
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
        </div>
      </React.Fragment>
    )
  }
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AllProducts)
)
