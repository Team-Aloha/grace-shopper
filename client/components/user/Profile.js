import React from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchOneProduct, updateProduct} from '../../store'
import {fetchCategories} from '../../store'
import store from '../../store'

class CheckoutForm extends React.Component {
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
            <form className="s12 l6" onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="input-field">
                  <input
                    name="name"
                    id="name"
                    type="text"
                    className="validate"
                    value={this.state.user.name}
                    onChange={this.handleChange}
                    readOnly={this.state.readOnly}
                  />
                  <label className="active" htmlFor="name">
                    Full Name
                  </label>
                </div>
                <div className="input-field">
                  <input
                    name="email"
                    id="email"
                    type="email"
                    className="validate"
                    value={this.state.user.email}
                    onChange={this.handleChange}
                    readOnly={this.state.readOnly}
                  />
                  <label className="active" htmlFor="email">
                    Email
                  </label>
                </div>
                <div className="input-field">
                  <input
                    name="address"
                    id="address"
                    type="text"
                    className="validate"
                    value={this.state.user.address}
                    onChange={this.handleChange}
                    readOnly={this.state.readOnly}
                  />
                  <label className="active" htmlFor="address">
                    Address
                  </label>
                </div>
                <div className="input-field">
                  <input
                    name="city"
                    id="city"
                    type="text"
                    className="validate"
                    value={this.state.user.city}
                    onChange={this.handleChange}
                    readOnly={this.state.readOnly}
                  />
                  <label className="active" htmlFor="city">
                    City
                  </label>
                </div>
                <div className="input-field">
                  <input
                    name="state"
                    id="state"
                    type="text"
                    className="validate"
                    value={this.state.user.state}
                    onChange={this.handleChange}
                    readOnly={this.state.readOnly}
                  />
                  <label className="active" htmlFor="state">
                    State
                  </label>
                </div>
                <div className="input-field">
                  <input
                    name="zip"
                    id="zip"
                    type="text"
                    pattern="[0-9]{5}"
                    className="zip"
                    value={this.state.user.zip}
                    onChange={this.handleChange}
                    readOnly={this.state.readOnly}
                  />
                  <label className="active" htmlFor="zip">
                    Zip
                  </label>
                </div>
              </div>

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
            </form>
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
  connect(mapStateToProps, mapDispatchToProps)(CheckoutForm)
)