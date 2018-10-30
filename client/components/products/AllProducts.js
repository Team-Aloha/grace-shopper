import React from 'react'
import {connect} from 'react-redux'
import {setVisibilityFilter} from '../../store'

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
      <div>
        Show:
        <button
          type="button"
          onClick={() => this.props.setVisibilityFilter(-1)}
        >
          All
        </button>
        {this.props.categories.map(category => (
          <button
            key={category.id}
            type="button"
            onClick={() => this.props.setVisibilityFilter(category.id)}
          >
            {category.name}
          </button>
        ))}
        <ul>
          {this.props.prods.map(product => (
            <li key={product.id}>
              {' '}
              {product.title} {product.category}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
