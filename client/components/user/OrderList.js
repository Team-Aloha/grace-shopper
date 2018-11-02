import React from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchOneProduct, updateProduct} from '../../store'
import {fetchCategories} from '../../store'
import store from '../../store'

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
          <div className="card-content">
            <div className="s12 l6">
              <ul class="collection with-header">
                <li class="collection-header">
                  <h4>Orders</h4>
                </li>
                <li class="collection-item">Alvin</li>
                <li class="collection-item">Alvin</li>
                <li class="collection-item">Alvin</li>
                <li class="collection-item">Alvin</li>
              </ul>

              <div className="row">
                <div className="col s12 m12 l12 xl12 center-align">
                  <button
                    onClick={this.toggleEditProfile}
                    className="btn waves-effect waves-light btn-large blue lighten-2"
                  >
                    {this.state.readOnly ? 'Edit' : 'Save'}
                  </button>
                </div>
              </div>
            </div>
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
