import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { graphql, Query } from 'react-apollo';
import query from '../gql/queries/fetchList';
import mutation from '../gql/mutations/ChangeTaskStatus';

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

  changeTaskStatus(taskID, status){
    this.props.mutate({
      variables: { taskID, status }})
  }

  renderTasks(tasks, refetch){
    return ( tasks ?
      tasks.map(({id, content, status }) => {
      return (
      <li key={id} className="collection-item ">
        <Link to={`/dashboard/list/${this.props.match.params.listID}/task/${id}`} >{content}</Link>
        <div style={style} className="right">
            status: {status}
            { status == "complete" ? <div></div> :
            <div>
             <i
             className="material-icons"
             onClick={() => {this.changeTaskStatus(id, "underway"); refetch();}}
             style={{paddingLeft:"10px"}}
           >add</i>
            <i
              className="material-icons"
              onClick={() => {this.changeTaskStatus(id, "complete"); refetch();}}
              style={{paddingLeft:"10px"}}
            > done</i>
            </div>
          }


        </div>
      </li>
      )}) : <div> No tasks. </div> )}


      filteredTasks(list, filter){
        return (list.tasks ? list.tasks.filter(({status }) => {
          return status == filter
        }) : null )
      }



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

         const pendingTasks  =  this.filteredTasks(list, "pending");
         const underwayTasks =  this.filteredTasks(list, "underway");
         const completeTasks =  this.filteredTasks(list, "complete");

         const renderPending = pendingTasks.length ? (
          <div>
             <h4>Pending Tasks:</h4>
             <ul className="collection">
                 {this.renderTasks(pendingTasks, refetch)}
             </ul>
             </div> ) : <div></div>

         const renderUnderway = underwayTasks.length ? (
           <div>
              <h4>Underway Tasks:</h4>
              <ul className="collection">
                  {this.renderTasks(underwayTasks, refetch)}
              </ul>
              </div> ) : <div></div>

        const renderComplete = completeTasks.length ? (
          <div>
             <h4>Complete Tasks:</h4>
             <ul className="collection">
                 {this.renderTasks(completeTasks, refetch)}
             </ul>
             </div> ) : <div></div>


          return (
            <div>
            <h3>List: {list.name}</h3>
            {renderUnderway}
            {renderPending}
            {renderComplete}

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
