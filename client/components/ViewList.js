import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { graphql, Query } from 'react-apollo';
import query from '../gql/queries/fetchList';
import mutation from '../gql/mutations/TaskCompleted';

const style = {
//  right: '0'
  display: 'flex',
 alignItems: 'center'
}


class ViewList extends Component{
  constructor(props){
    super(props)

    this.state = {
      test: {}
    }
  }

  markTaskComplete(taskID, refetch){
    this.props.mutate({
      variables: { taskID }})
  }

  renderTasks(list, refetch){
    console.log('list',list)
    return ( list.tasks ? list.tasks.map(({id, content, status }) => {
      return (
      <li key={id} className="collection-item ">
        <Link to={`/dashboard/list/${list.id}/task/${id}`} >{content}</Link>
        <div style={style} className="right">
            status: {status}
            <i
              className="material-icons"
              onClick={() => {this.markTaskComplete(id); refetch();}}
              style={{paddingLeft:"10px"}}
            > done</i>

        </div>
      </li>
      )}) : <div> No pending tasks. </div> )}


  render(){
    console.log('props', this.props);
    return (
      <Query
        query={query}
        variables={{ listID: this.props.match.params.listID}}
        fetchPolicy="cache-and-network"
      >
        {({loading, error, data, refetch }) => {
          const { list } = data;

          if (loading) {
            return <div>Loading...</div>;
          } else if (error) {
            return <div>Error: {error.message}</div>;
          }

          return (
            <div>
            <h3>{list.name}</h3>
            <ul className="collection">
            {this.renderTasks(list, refetch)}
            </ul>

              <div style={{marginTop: "10px"}}>
              <Link
                to={`${this.props.match.url}/createtask`}
                className="btn-large red right"
                style={{margin: "10px"}}

              >
                Create Task
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

export default graphql(mutation)(ViewList);
