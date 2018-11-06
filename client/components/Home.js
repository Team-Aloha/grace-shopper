import React from 'react'
import {connect} from 'react-redux'

class Home extends React.Component {

  render(){
    return (
      <React.Fragment>

        <div class="parallax-container">
      <div class="parallax"><img src="https://cdn.cnn.com/cnnnext/dam/assets/170606121056-hawaii---travel-destination---shutterstock-457528552.jpg"/></div>
    </div>
    <div class="section yellow lighten-5 wood">
      <div class="row container">
        <h2 class="header white-text">Welcome To Palm Tees!</h2>
        <h5 class="white-text">Find the finest threads for the beach life, work life or for lounging at work.</h5>
      </div>
    </div>
    <div class="parallax-container">
      <div class="parallax"><img src="http://corkscrewjc.com/wp-content/uploads/2014/12/maui-hawaii-beach.jpg"/></div>
    </div>


      </React.Fragment>
    )
  }

}

export default connect(null)(Home)
