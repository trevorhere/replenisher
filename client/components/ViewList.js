import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { graphql, Query, compose } from 'react-apollo';
import query from '../gql/queries/fetchList';
import changeTaskStatus from '../gql/mutations/ChangeTaskStatus';
import setRecurringFalse from '../gql/mutations/SetRecurringFalse';
import Loading from './Loading'
const moment = require('moment');

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

  //change from recurring mutation

  changeTaskStatus(taskID, status, started, finished){

    if(status == "pending"){
      this.props.ChangeTaskStatus({
        variables: { taskID, status, started, finished }})
      }
      else if(status == "underway")
      {
        started = moment().format('MM/DD/YY, HH:mm');
        this.props.ChangeTaskStatus({
          variables: { taskID, status, started, finished }})
      }
      else if(status == "complete")
      {
        finished = moment().format('MM/DD/YY, HH:mm');
        this.props.ChangeTaskStatus({
          variables: { taskID, status, started, finished }})
      }
  }

  renderTasks(tasks, refetch){
    return ( tasks ?
      tasks.map(({id, content, status, started, finished, priority, durationHours, durationMinutes, created }) => {
      return (
      <li key={id} className="collection-item ">
        <Link to={`/dashboard/list/${this.props.match.params.listID}/task/${id}`} >{content}</Link>
        <div style={style} className="right">
            <span style={{paddingRight: "10px"}}>priority: {priority} | </span>
            <span style={{paddingRight: "10px"}}>{durationHours}Hr {durationMinutes}Min | </span>

            status: {status}
            { status == "complete" ? <div></div> :
            <div>
              {status == "underway" ?
              <div>
                <i
                  className="material-icons"
                  onClick={() => {this.changeTaskStatus(id, "complete", started, finished); refetch();}}
                  style={{paddingLeft:"10px"}}
                > done</i>
              </div> :
              <div>
                <i
                  className="material-icons"
                  onClick={() => {this.changeTaskStatus(id, "underway", started, finished); refetch();}}
                  style={{paddingLeft:"10px"}}
                 >add</i>
                <i
                  className="material-icons"
                  onClick={() => {this.changeTaskStatus(id, "complete", started, finished); refetch();}}
                  style={{paddingLeft:"10px"}}
                > done</i>
              </div>
              }
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

    sortPriority(tasks){
        return tasks.sort(function(a,b){
          return b.priority - a.priority;
        })
      }


    sortDuration(tasks){
      return tasks.sort(function(a,b){
        let bDurration = ((b.durationHours * 60) + b.durationMinutes);
        let aDurration = ((a.durationHours * 60) + a.durationMinutes);

        if(aDurration > bDurration){
          return 1
        } else {
          return -1
        }
      })
    }
      // if recurring && complete
        // if repeat > now - finished || now - created
        // and kill < && now - created
        // status = pending



    minutesSince(date){
      let now = moment().format('MM/DD/YY, HH:mm');
      let diff = Math.abs(new Date(now) - new Date(date));
      let minutes = Math.floor((diff/1000)/60);
      return minutes
    }

    recurringFalse(taskID){

        this.props.SetRecurringFalse({
          variables: { taskID }
        })
    }

    resetRecurringTasks(list){
      if(list.tasks){
        list.tasks.map(task => {


         if(task.kill <= this.minutesSince(task.created)){
           this.recurringFalse(task.id);
         } else {
          if(task.recurring && task.status == "complete"){
            if(task.repeat < this.minutesSince(task.finished) || task.repeat < this.minutesSince(task.created)){
              task.status = "pending";
              task.finished = "N/A";
              task.started = "N/A";
            }
          }
        }
      })
    }
  }



  render(){
    if(this.props.data.loading){
      return (<Loading loading={this.props.data.loading}/>);
    }

    return (
      <Query
        query={query}
        variables={{ listID: this.props.match.params.listID}}
        fetchPolicy="cache-and-network"
      >
        {({loading, error, data, refetch }) => {
          const { list } = data;

          if (loading) {
            return (
              <Loading loading={loading} />
              );
          } else if (error) {
            return <div>Error: {error.message}</div>;
          }

         this.resetRecurringTasks(list)
         const pendingTasks  =  this.filteredTasks(list, "pending");
         const underwayTasks =  this.filteredTasks(list, "underway");
         const completeTasks =  this.filteredTasks(list, "complete");

         const renderPending = pendingTasks.length ? (
          <div>
            { console.log(this.sortDuration(pendingTasks))}
            {console.log(this.sortPriority(pendingTasks))}
             <h4>Pending:</h4>
             <ul className="collection">
                 {this.renderTasks(pendingTasks, refetch)}
             </ul>
             <hr/>
             </div> ) : <div></div>

         const renderUnderway = underwayTasks.length ? (
           <div>
              <h4>Underway:</h4>
              <ul className="collection">
                  {this.renderTasks(underwayTasks, refetch)}
              </ul>
               <hr/>
              </div> ) : <div></div>

        const renderComplete = completeTasks.length ? (
          <div>
             <h4>Complete:</h4>
             <ul className="collection">
                 {this.renderTasks(completeTasks, refetch)}
             </ul>
             <hr/>
             </div> ) : <div></div>


          return (
            <div>
            <h3>List: {list.name}</h3>
            <hr/>
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
                to={`${this.props.match.url}/assignlist`}
                className="btn-large red right"
                style={{margin: "10px"}}
                >
                Assign List
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

export default compose(
  graphql(changeTaskStatus, {name: "ChangeTaskStatus"}),
  graphql(setRecurringFalse, {name: "SetRecurringFalse"}),
  )(ViewList)
