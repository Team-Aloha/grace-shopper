import React from 'react'
import {connect} from 'react-redux'
import {setVisibilityFilter} from '../../store'

const mapStateToProps = state => ({
  prods: state.products.filter(product => {
    switch (state.filter.visibilityFilter) {
      case 'ALL':
        return true
      case 'SILK':
        return product.category === 'silk'
      case 'COTTON':
        return product.category === 'cotton'
      //filter cases for selected category by user
      default:
        return true
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
        <h1>hello</h1>
        Show:
        <button onClick={() => this.props.setVisibilityFilter('ALL')}>
          All
        </button>
        <button onClick={() => this.props.setVisibilityFilter('SILK')}>
          Silk
        </button>
        <button onClick={() => this.props.setVisibilityFilter('COTTON')}>
          Cotton
        </button>
        <ul>
          {this.props.prods.map(product => (
            <li>
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
