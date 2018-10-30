import React from 'react'
import {connect} from 'react-redux'
import {setVisibilityFilter} from '../../store'

const categoryTypes = [
  {
    id: 1,
    type: 'silk'
  },
  {
    id: 2,
    type: 'cotton'
  },
  {
    id: 3,
    type: 'polyester'
  }
]

const mapStateToProps = state => ({
  prods: state.products.filter(product => {
    if (state.filter.visibilityFilter === 'ALL') {
      return true
    } else {
      return product.category.includes(state.filter.visibilityFilter)
    }
  })
})
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
          onClick={() => this.props.setVisibilityFilter('ALL')}
        >
          All
        </button>
        {categoryTypes.map(category => (
          <button
            key={category.id}
            type="button"
            onClick={() => this.props.setVisibilityFilter(category.type)}
          >
            {category.type}
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
