import React from 'react'
import {withRouter, Link} from 'react-router-dom'
const numeral = require('numeral')


const ProductCard = props => {
  const {product} = props
  const price = numeral(product.price/1000).format('$0,0.00')

  return (
    <React.Fragment>
      <div className="col s12 m6 l4 xl3" key={product.id}>
        <div className="card">
          <div className="card-image">
            <img src={product.imageUrl} />
          </div>
          <div className="card-content">
            <Link to={`/products/${product.id}`}>
              <span className="card-title center-align">{product.title}</span>
            </Link>
            <div className="center-align">{price}</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default withRouter(ProductCard)
