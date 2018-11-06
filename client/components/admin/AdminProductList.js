import React from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchProducts, adminSetOrderStatus} from '../../store'
import numeral from 'numeral'
import Dashboard from './Dashboard'

export class AdminProductList extends React.Component {
  componentDidMount() {
    //call thunk here
    this.props.fetchProducts()
  }

  render() {
    return (
      <React.Fragment>
        <Dashboard />
        <div className="container">
          <table className="table-responsive">
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.props.products.map(product => {
                return (
                  <tr>
                    <td>{product.id}</td>
                    <td>{product.title}</td>
                    <td>{numeral(+product.price / 100).format('$0,0.0')}</td>
                    <td>{product.quantity}</td>
                    <td>
                      <Link to={`/admin/products/${product.id}/edit`}>
                        Edit
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  const {products} = state
  return {
    products
  }
}

const mapDispatchToProps = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts())
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AdminProductList)
)
