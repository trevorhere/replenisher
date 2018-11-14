import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { graphql, Query } from 'react-apollo';
import query from '../gql/queries/fetchTeam';
import Loading from './Loading';

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
        <Link to={`/dashboard/team/${team.id}/user/${id}`} >{name}</Link>
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
          console.log('props',this.props)


          if (loading) {
            return (<Loading loading={loading}/>);
          } else if (error) {
            return <div>Error: {error.message}</div>;
          }

          const { team } = data;


          return (
            <div>
            <h3>Team: {team.name}</h3>
            <ul className="collection">
            { this.renderTeam(team)}
            </ul>
              <div style={{marginTop: "10px"}}>
              <Link
                to={`${this.props.match.url}/createuser`}
                className="btn-large red right"
                style={{margin: "10px"}}

              >
                Add Member To Team
                {/* <i className="material-icons" >add</i> */}
              </Link>
              <Link
                to={`/dashboard`}
                style={{margin: "10px"}}
                className=" btn-large red right">Back</Link>
                </div>
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
