import React from 'react'
import {connect} from 'react-redux'
import {setVisibilityFilter} from '../../store'

const categoryTypes = [
  {
    id: 1,
    type: 'Blue'
  },
  {
    id: 2,
    type: 'Shirt'
  },
  {
    id: 3,
    type: 'Green'
  }
]

const mapStateToProps = state => {
  console.log('the state>>>>', state)

  return {
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
        {categoryTypes.map(category => (
          <button
            key={category.id}
            type="button"
            onClick={() => this.props.setVisibilityFilter(category.id)}
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
