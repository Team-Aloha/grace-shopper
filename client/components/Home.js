import React from 'react'
import {connect} from 'react-redux'
class Home extends React.Component {

  render(){
    return (
      <React.Fragment>

        <div class="parallax-container">
      <div class="parallax"><img src="./hawaii.jpg"/></div>
    </div>
    <div class="section yellow lighten-5 wood">
      <div class="row container">
        <h2 class="header white-text">Welcome To Palm Tees!</h2>
        <h5 class="white-text">Find the finest threads for the beach life, work life or for lounging at work.</h5>
      </div>
    </div>
    <div class="parallax-container">
      <div class="parallax"><img src="./beachChair.jpg"/></div>
    </div>


      </React.Fragment>
    )
  }

}

export default connect(null)(Home)
