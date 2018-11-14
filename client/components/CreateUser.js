import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import mutation from '../gql/mutations/CreateUser';
import query from '../gql/queries/fetchTeam';
import { Link } from 'react-router-dom';



class CreateUser extends Component {
  constructor(props){
    super(props)

    this.state = {
      email: '',
      password: '',
      name: '',
      position: ''
    }
  }

  onSubmit(event){
    event.preventDefault();
    const {email, password, name, position} = this.state;
    const teamID = this.props.match.params.teamID;
    console.log('state', this.state);
    this.props.mutate({
      variables: {email, password, name, position,teamID },
      refetchQueries: [{ query }]
    })

    this.props.history.push(`/dashboard/team/${this.props.match.params.teamID}`);

  }

  render(){
    return (
      <div>
      <h3>Create User</h3>
      <form onSubmit={this.onSubmit.bind(this)} className="col s6">
        <div className="input-field">
        <input
          placeholder="email"
          value={this.state.email}
          onChange={e => this.setState({
            email: e.target.value
          })}
        />
           <input
          placeholder="Name"
          value={this.state.name}
          onChange={e => this.setState({
            name: e.target.value
          })}
        />
           <input
          placeholder="Position/Title"
          value={this.state.position}
          onChange={e => this.setState({
            position: e.target.value
          })}
        />
        </div>
        <div className="input-field">
        <input
          placeholder="password"
          value={this.state.password}
          onChange={e => this.setState({
            password: e.target.value
          })}
        />
        </div>
        <button className="btn">Submit</button>
      </form>
    </div>
    )
  }
}

export default graphql(mutation)(CreateUser);