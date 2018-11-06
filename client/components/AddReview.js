import React from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import Select from 'react-select'
import {postReview} from '../store'
//create and import createReview thunk

class AddReviewForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      stars: 0,
      text: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }

  handleSubmit = evt => {
    evt.preventDefault()
    const newReview = {stars: this.state.stars, text: this.state.text}

    this.props.createReview(newReview)
  }

  render() {
    return (
      <form id="new-message-form" onSubmit={this.handleSubmit}>
        <div className="input-group input-group-lg">
          <input
            className="form-control"
            type="text"
            name="stars"
            placeholder="how many stars? 0-5"
            onChange={this.handleChange}
          />
           <input
            className="form-control"
            type="text"
            name="text"
            placeholder="your review"
            onChange={this.handleChange}
          />
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">Add</button>
          </span>
        </div>
      </form>
    );
  }

}

const mapDispatch = dispatch => ({
  createReview: review => dispatch(postReview(review))
})

export default withRouter(connect(null, mapDispatch)(AddReviewForm))

