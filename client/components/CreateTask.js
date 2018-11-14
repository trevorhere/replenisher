import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import { Link } from 'react-router-dom';
import createTask from '../gql/mutations/CreateTask';
import createRecuringTask from '../gql/mutations/CreateTask';
import query from '../gql/queries/fetchList';
const moment = require('moment');
let mutation = createTask;


class CreateTask extends Component {
  constructor(props){
    super(props)

    this.state = {
      content: '',
      status: "pending",
      notes: '',
      value: 'select',
      started: "N/A",
      finished: "N/A",
      recuring: false,
      priority: 5,
      duration: 'test',
      durationHours: 5,
      durationMinutes: 5,
    }
  }




  onSubmit(e){
    event.preventDefault();
    console.log('started', this.state.started);
    this.props.mutate({
      variables: {
        content: this.state.content,
        listID: this.props.match.params.listID,
        status: this.state.status,
        creatorID: this.props.data.user.id,
        priority: this.state.priority,
        started: this.state.started,
        finished: this.state.finished,
        durationHours: this.state.durationHours,
        durationMinutes: this.state.durationMinutes,
        notes: this.state.notes,

      },
      refetchQueries: [{ query }]
    }).then(() => this.props.history.push(`/dashboard/list/${this.props.match.params.listID}`))
  }

  handleRecuringSetting(event){
    if(event.target.value){
         mutation = createRecuringTask;
    } else {
      mutation = createTask;
    }
    this.setState({
        recuring:event.target.value
      })
  }

  handleSelector(event) {
    event.preventDefault();
    if(event.target.value == "completed"){
      this.setState({
        status: event.target.value,
        started: moment().format('MMMM Do YYYY, h:mm:ss a'),
        completed: moment().format('MMMM Do YYYY, h:mm:ss a')
      })
    } else if(event.target.value == "underway"){
      this.setState({
        status: event.target.value,
        started: moment().format('MMMM Do YYYY, h:mm:ss a'),
        completed: 'N/A'

      })
    } else if(event.target.value == "pending"){
      this.setState({
        status: event.target.value,
        completed:  'N/A',
        started: 'N/A'
      });
    } else {
      this.setState({
        status: "pending",
        completed:  'N/A',
        started: 'N/A'
      });
    }
  }

render(){
  return(
    <div>
      <h3>Create New Task</h3>
      <form onSubmit={this.onSubmit.bind(this)}>
      <label>Task Name:</label>
      <input
        onChange={event => this.setState({
          content: event.target.value
        })}
        value={this.state.content}
      />
      <label>Status: (please choose between 'pending', 'underway', or 'complete') </label>
      <input
        onChange={event => this.setState({
          status: event.target.value
        })}
        value={this.state.status}
      />
      <label>Priority:</label>
      <br/>
      <label>Enter a number between 0-4 </label>
      <br/>
      <label>0: Not pressing             </label>
      <br/>
      <label>1: At soonest convenience   </label>
      <br/>
      <label>2: Important                </label>
      <br/>
      <label>3: Urgent                   </label>
      <br/>
      <label>4: Nuclear !!!              </label>
      <input
        type="Number"
        onChange={event => this.setState({
          priority: Number(event.target.value)
        })}
        value={this.state.priority}
      />

      <br/>
      {/* <label>Expected Duration:
        <select className="browser-default" value={this.state.duration} onChange={this.handleSelector.bind(this)}>
        <option value="pending">Pending</option>
        <option value="progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      </label> */}
      {/* <input
        onChange={event => this.setState({
          status: event.target.value
        })}
        value={this.state.status}
      /> */}
        <br/>
      <label>Duration - Hours:</label>
      <input
        type="Number"

        onChange={event => this.setState({
          durationHours: Number(event.target.value)
        })}
        value={this.state.durationHours}
      />
      <br/>
      <label>Duration - Minutes:</label>
      <input
        type="Number"
        onChange={event => this.setState({
          durationMinutes: Number(event.target.value)
        })}
        value={this.state.durationMinutes}
      />
      <br/>
      <label>Notes:</label>
      <input
        onChange={event => this.setState({
          notes: event.target.value
        })}
        value={this.state.notes}
      />
          <input className="btn-flyou are logged inating btn-large red right" style={{margin: "10px"}} type="submit" value="Submit" />
      <Link style={{margin: "10px"}} className="btn-flyou are logged inating btn-large red right" to={`/dashboard/list/${this.props.match.params.listID}`}>Cancel</Link>

      </form>
    </div>
  )
}


}



export default graphql(mutation)(CreateTask);