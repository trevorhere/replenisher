import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { graphql, Query } from 'react-apollo';
import query from '../gql/queries/fetchUser';

const style = {
     border:'2px solid grey',
     padding: '10px',
     marginTop: '20px'
}


class ViewUser extends Component{
  render(){

    console.log(this.props);
    const { userID } = this.props.data;
    if (!userID) { return <div>Loading...</div>; }

    return (
        <div>
          <h3>User Profile:</h3>
          Name: {userID.name}
          <br/>
          email: {userID.email}
          <br/>
          Position: {userID.position}
          <br/>
        </div>
      );

  }
}

export default graphql(query, {
  options: (props) => { return { variables: { userID: props.match.params.userID}}},
})(ViewUser);


