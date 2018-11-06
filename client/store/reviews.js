import axios from 'axios'

const ADD_REVIEW = 'CREATE_REVIEW'
const SET_REVIEWS = 'SET_REVIEWS'

const defaultReviews = []

export const setReviews = reviews => ({type: SET_REVIEWS, reviews})
export const addReview = review => ({type: ADD_REVIEW, review})

export const fetchReviews = () => async dispatch => {
  const response = await axios.get('/api/reviews')
  const reviews = response.data
  dispatch(setReviews(reviews))
}

export const postReview = review => async dispatch => {
  const response = await axios.post('/api/reviews', review)
  const newReview = response.data
  dispatch(addReview(newReview))
}

//reducer

export default function(state = defaultReviews, action) {
  switch(action.type) {
    case SET_REVIEWS:
      return action.reviews
    case ADD_REVIEW:
      return [...state, action.review]
    default:
      return state
  }
}

