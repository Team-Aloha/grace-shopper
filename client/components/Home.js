import React from 'react'
import {connect} from 'react-redux'

class Home extends React.Component {

  render(){
    return (
      <React.Fragment>

        <div className="parallax-container">
      <div className="parallax"><img src="https://cdn.cnn.com/cnnnext/dam/assets/170606121056-hawaii---travel-destination---shutterstock-457528552.jpg"/></div>
    </div>
    <div className="section yellow lighten-5 wood">
      <div className="row container">
        <h2 className="header black-text font-effect-fire-animation titleHome" >Welcome To Palm Tees!</h2>
        <h5 className="black-text font-effect-fire-animation titleHome">Find the finest threads for the beach life, work life or for lounging at work.</h5>
      </div>
    </div>
    <div className="parallax-container">
      <div className="parallax"><img src="http://corkscrewjc.com/wp-content/uploads/2014/12/maui-hawaii-beach.jpg"/></div>
    </div>


      </React.Fragment>
    )
  }

}

export default connect(null)(Home)
