import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import query from '../gql/queries/fetchLists';

// this component should show a list of the users lists

class Dashboard extends Component {

  renderLists(){
    return this.props.data.user.lists.map(({id, name}) => {
      return (
      <li key={id} className="collection-item">
        <Link to={`/dashboard/list/${id}`}>{name}</Link>
      </li>
      );
    });
  }

  renderTeams(teams){
    console.log('teams', teams)
       return ( teams ? teams.map(({id, name}) => {
         return (
        <li key={id} className="collection-item">
          <Link to={`/dashboard/team/${id}`}>{name}</Link>
        </li>
         )}) :
    <li  className="collection-item">You don't have any teams</li>
   )}

  render(){
    console.log(this.props);
    if(this.props.data.loading){
      return (
        <div>
          Loading...
        </div>
      )
    }
    const { teams } = this.props.data.user;
    return (
      <div>
        <h3>Your Lists: </h3>
        <ul className="collection">
        {this.renderLists()}
        </ul>
        <Link
            to="/dashboard/createlist"
            className="btn-large red right"
          >
            Create List
            {/* <i className="material-icons" >add</i> */}
          </Link>
          <br/>
          <br/>
          <br/>
          <br/>
          <h3>Your Teams: </h3>
          <ul className="collection">
           {this.renderTeams(teams)}
          </ul>
          <br/>
          <br/>
          <Link
            to="/dashboard/createteam"
            className="btn-flyou are logged inating btn-large red right"
          >
            Create Team
            {/* <i className="material-icons" >add</i> */}
          </Link>
      </div>
    )
  }
}

export default graphql(query)(Dashboard);