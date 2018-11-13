import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import {  Redirect } from 'react-router-dom';
import currentUserQuery from '../gql/queries/CurrentUser';
import { fromPromise } from 'apollo-link';


export default (WrappedComponent) => {
class RequireAuth extends Component {
  // componentWillUpdate(nextProps){
  //   if(!nextProps.data.loading && !nextProps.data.user){
  //     console.log('something should have happened here',);
  //     this.props.history.push('/login');
  //     return (
  //     <Redirect to={{pathname: '/login'}}/>
  //     )
  //   }
  // }

  render(){
  console.log('req quth', this.props.data.user);

  if(!this.props.data.user && !this.props.data.loading){
    return (
      <Redirect to={{pathname: '/login'}}/>
    )
  }
    return <WrappedComponent {...this.props} />;
  }
}

return graphql(currentUserQuery)(RequireAuth);
};