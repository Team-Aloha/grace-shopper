import React from 'react'
import {connect} from 'react-redux'
import {fetchReviews} from '../store'
import {withRouter} from 'react-router-dom'

const mapState = (state) => ({
  reviews: state.reviews
})

const mapDispatch = dispatch => ({

})
export const AllReviews = (props) => {
  const reviews = props.reviews
    // if (!props) {
    //   return <div>Loading...</div>
    // }
    if (reviews) {
    return (
      <div id='reviews'>
      <ul>
       {
         reviews.map(review =>

          (
           <li>
              <p>{review.stars} </p>
              <p>{review.text}</p>
          </li>

       ))}
      </ul>
      </div>
    )
   } else {
     return null
   }
  }


export default withRouter(connect(mapState, mapDispatch)(AllReviews))
