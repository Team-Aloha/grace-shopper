import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';


function CampusSnapshot(props) {
  const campus = props.campus;
  return (
    <div>
      <div>
        <Link to={`/campusdetail/${campus.id}`}>
          <h1>{campus.name}</h1>
        </Link>
        <h2>{campus.address}</h2>
        {campus.description}
      </div>

      <div>{/* <img src={campus.imageUrl} /> */}</div>
    </div>
  );
}
const mapDispatchToProps = dispatch => ({

});

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(CampusSnapshot)
);
