import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {default as ProductCard} from './products/ProductCard'
/**
 * COMPONENT
 */

const mapStateToProps = state => {
  return {
    user: state.user,
    products: state.products
  }
}

export const UserHome = props => {
  const {user, products} = props
  let recArr = []

  if (products.length > 0) {
    for (let i = 0; i < 4; i++) {
      let shirt = products[Math.floor(Math.random() * products.length)]

      recArr.push(shirt)
    }
    console.log(recArr)
  }

  console.log(products)
  if (!props) {
    return <div>Loading...</div>
  }
  return (
    <div className="shirts">
      <div className="container">
        <div className="row center" />
        {/* <div className="card"> */}
          <div className="card-content">
            <div className="center white ">
              <h3>Welcome back {user.name ? user.name : user.email}</h3>
              <h5>Below are some reccomended shirts for you!</h5>
            </div>
            <div>

                <div className="row">
                  {recArr.map(product => {
                    if (product.quantity > 0) {
                      return <ProductCard product={product} key={product.id} />
                    }
                  })}
                </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(connect(mapStateToProps)(UserHome))

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
