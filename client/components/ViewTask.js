import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { graphql, Query } from 'react-apollo';
import query from '../gql/queries/fetchTask';
import Loading from './Loading';

const style = {

     border:'2px solid grey',
     padding: '10px',
     marginTop: '20px'

}


class ViewTask extends Component{

  render(){
    console.log('props', this.props);
    if(this.props.data.loading){
      return (<Loading loading={this.props.data.loading}/>);
    }

    return (
      <Query
        query={query}
        variables={{ taskID: this.props.match.params.taskID}}
        fetchPolicy="cache-and-network"
      >
        {({loading, error, data }) => {
          const { task } = data;
          // console.log('task',task)

          if (loading) {
            return (<Loading loading={loading}/>);
          } else if (error) {
            return <div>Error: {error.message}</div>;
          }

          return (
            <div>
            <div style={style} className="">
            <h3>Task: {task.content}</h3>
            Status: {task.status}
            <br/>
            Priority: {task.priority}
            <br/>
            Estimated Duration:  {task.durationHours}Hr {task.durationMinutes}Min
            <br/>
            Notes: {task.notes}
            <br/>
            Feedback: {task.feedback}
            <br/>
            Due Date: {task.dueDate}
            <br/>
            Time Date: {task.timeDue}
            <br/>
            Started: {task.started}
            <br/>
            Finished: {task.finished}
            <br/>
            <br/>
            <br/>
            <br/>
            </div>
            <div style={{marginTop: "10px"}}>

              <Link
                to={`/dashboard/list/${this.props.match.params.listID}`}
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


// <Link
// to={`${this.props.match.url}/createtask`}
// style={{margin: "10px"}}
// className=" btn-large red right"
// >
// Edit Task
// {/* <i className="material-icons" >add</i> */}
// </Link>

// export default graphql(query, {
//   options:
//    (props) => { return { variables: {id: props.match.params.listID}}},

// })(ViewList);


export default ViewTask;
