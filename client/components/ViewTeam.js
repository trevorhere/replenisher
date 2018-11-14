import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { graphql, Query } from 'react-apollo';
import query from '../gql/queries/fetchTeam';

const style = {
//  right: '0'
  //display: 'flex',
 // alignItems: 'center'
}


class ViewTeam extends Component{

  renderTeam(team){
    return ( team.members ? team.members.map(({id, name, position }) => {
      return (
      <li key={id} className="collection-item ">
        <Link to={`/dashboard/team/${team.id}/member/${id}`} >{name}</Link>
        <div style={style} className="right">
        position: {position}
        </div>
      </li>
      )
    }) :
    <div> There are no members on this team. </div>

    )
  }


  render(){
     //  console.log('props', this.props);
    // if(this.props.data.loading){
    //   return (
    //     <div>
    //       Loading...
    //     </div>
    //   )
    // }


    return (
      <Query
        query={query}
        variables={{ teamID: this.props.match.params.teamID}}
        fetchPolicy="cache-and-network"
      >
        {({loading, error, data }) => {
          const { team } = data;

          if (loading) {
            return <div>Loading...</div>;
          } else if (error) {
            return <div>Error: {error.message}</div>;
          }

          return (
            <div>
            <h3>Team: {team.name}</h3>
            <ul className="collection">
            { this.renderTeam(team)}
            </ul>
            <Link
                to={`${this.props.match.url}/createuser`}
                className="btn-flyou are logged inating btn-large red right"
              >
                Add Member To Team
                {/* <i className="material-icons" >add</i> */}
              </Link>
          </div>
          );
        }}
      </Query>
    )
  }
}

// export default graphql(query, {
//   options:
//    (props) => { return { variables: {id: props.match.params.listID}}},

// })(ViewList);

export default ViewTeam;
