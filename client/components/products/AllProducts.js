import React from 'react'
import { connect } from 'react-redux'

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
});

class AllProducts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return (
      <div>
        <h1>hello</h1>
        {/* <ul>
          {props.products.map(product => (
            <ProductDetail key={product.id} {...product} onClick={() => } />
          ))}
        </ul> */}
      </div>
    )
  }
}
export default connect(mapStateToProps)(AllProducts)
