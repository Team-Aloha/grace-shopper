import React from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchOneProduct, updateProduct} from '../../store'
import {fetchCategories} from '../../store'
import store from '../../store'


const getTotalAmount = products => {
 let totalAmount = products.map((item, i) => {
    if (item[0]) {
      const displayItem = item[0]
      return displayItem.price * displayItem.quantity
    }
  })
  .reduce((a, b) => a + b, 0)
  return `${totalAmount}`
} 

const DUMMY_ORDERS = [
 {  
     id: 1,
     date: '1/1/2018',
     status: 'shipped',
     products: [
        [{
            id:1,
            title: 'blue shirt',
            price: 100,
            quantity: 1
        }],
        [{
            id:2,
            title: 'red shirt',
            price:  200,
            quantity:1
        }]
     ]
 },
 {  
     id: 2,
     date: '1/1/2018',
     status: 'pending',
     products: [
        [{
            id:1,
            title: 'pink shirt',
            price: 500,
            quantity: 1
        }],
        [{
            id:2,
            title: 'yellow shirt',
            price:  500,
            quantity:2
        }]
     ]
 }


]

class OrderList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      readOnly: true,
      user: {
        name: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zip: ''
      }
    }
    // store.dispatch(fetchOneCampus(campusId))
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.toggleEditProfile = this.toggleEditProfile.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    // After fetching redux has passed in the student as
    // props, now we want to set those values to our local state
    if (prevProps.user !== this.props.user) {
      this.setState({
        user: this.props.user
      })
    }
  }

  componentDidMount() {
    const userId = this.props.match.params.userId
  }

  handleChange(evt) {
    evt.preventDefault()
    const user = {[evt.target.name]: evt.target.value}
    this.setState({user})
  }

  handleSubmit = evt => {
    evt.preventDefault()
  }
  toggleEditProfile = () => {
    this.setState({readOnly: !this.state.readOnly})
  }
  render() {
    if (Object.keys(this.props.user).length < 1) {
      return <div>User not logged in...</div>
    }

    return (
      <React.Fragment>
        {' '}
        <div className="card">
          <div className="card-content" id="order-card" >
          <table>
        <thead>
          <tr>
              <th>Date</th>
              <th>Products</th>
              <th>Total</th>
              <th>Status</th>
          </tr>
        </thead>

        <tbody>
            {DUMMY_ORDERS.map(order=>{
                return (
                    <tr>
                        <td>
                       {order.date}
                       </td>
                       <td>
                           {order.products.map(product=>(<p>{product[0].title}</p>)) }
                        </td>
                        <td>
                            {getTotalAmount(order.products)}
                            </td>
                            <td>
                                {order.status}
                            </td>
                </tr>
                )    
            })

            }


        </tbody>
      </table>
            
          </div>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch: dispatch
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OrderList)
)
