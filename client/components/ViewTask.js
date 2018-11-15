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
constructor(props){
  super(props)

  this.state = {

  }
}
  render(){
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


          if (loading) {
            return (<Loading loading={loading}/>);
          } else if (error) {
            return <div>Error: {error.message}</div>;
          }
          console.log('recurring',task.recurring)
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
            Created: {task.created}
            <br/>
            Started: {task.started}
            <br/>
            Finished: {task.finished}
            <br/>
            {task.recurring ? <div>
              Recurs every {task.recurringInterval} {task.recurringMultiplier}
              <br/>
              for {task.recurringDeathNumber} {task.recurringDeathMultiplier}
            </div> : <span></span>}
            <br/>
            Notes: {task.notes}
            <br/>
            Feedback: {task.feedback}
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
