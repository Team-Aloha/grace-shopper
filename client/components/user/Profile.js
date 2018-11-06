import React from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {editUserProfile} from '../../store'

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      address: '',
      city: '',
      state: '',
      zip: ''
    }
    // store.dispatch(fetchOneCampus(campusId))
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    // After fetching redux has passed in the student as
    // props, now we want to set those values to our local state
    if (prevProps.user !== this.props.user) {
      this.setState({
        ...this.props.user
      })
    }
  }

  componentDidMount() {
    const userId = this.props.match.params.userId
  }

  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }

  onEditProfile = () => {
    this.props.editUserProfile(this.state)
    // this.setState({readOnly: !this.state.readOnly})
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
            <form className="s12 l6">
              <div className="row">
                <div className="input-field">
                  <input
                    name="name"
                    id="name"
                    type="text"
                    className="validate"
                    value={this.state.name}
                    onChange={this.handleChange}
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
                    value={this.state.email}
                    onChange={this.handleChange}
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
                    value={this.state.address}
                    onChange={this.handleChange}
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
                    value={this.state.city}
                    onChange={this.handleChange}
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
                    value={this.state.state}
                    onChange={this.handleChange}
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
                    value={this.state.zip}
                    onChange={this.handleChange}
                  />
                  <label className="active" htmlFor="zip">
                    Zip
                  </label>
                </div>
              </div>

              <div className="row">
                <div className="col s12 m12 l12 xl12 center-align">
                  <button
                    type="button"
                    onClick={this.onEditProfile}
                    className="btn waves-effect waves-light btn-large blue lighten-2"
                  >
                    Edit Address
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
    editUserProfile: userInfo => dispatch(editUserProfile(userInfo))
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CheckoutForm)
)
