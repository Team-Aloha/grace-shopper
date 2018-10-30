import React from 'react'
import {connect} from 'react-redux'

const mapStateToProps = state => ({
  // products: state.products.filter(product => {
  //     switch (state.visibilityFilter) {
  //       case 'SILK':
  //         return product.category === 'silk'

  //       //filter cases for selected category by user
  //         default:
  //             return true;
  //     }
  // })
  products: state.products
})

class AllProducts extends React.Component {
  render() {
    return (
      <div>
        <h1>hello</h1>
        <ul>
          {this.props.products.map(product => <li> {product.title} </li>)}
        </ul>
      </div>
    )
  }
}
export default connect(mapStateToProps)(AllProducts)
