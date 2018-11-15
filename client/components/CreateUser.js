import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import createUser from '../gql/mutations/CreateUser';
import addExistingUser from '../gql/mutations/AddExistingUser';
import query from '../gql/queries/fetchTeam';
import { Link } from 'react-router-dom';
let mutation = createUser;


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
    mutation = createUser;
    const {email, password, name, position} = this.state;
    const teamID = this.props.match.params.teamID;

    this.props.mutate({
      variables: {email, password, name, position,teamID },
      refetchQueries: [{ query }]
    })

    this.props.history.push(`/dashboard/team/${this.props.match.params.teamID}`);

  }

  findExistingUser(event){
    mutation = addExistingUser;
    event.preventDefault();
    const {email} = this.state;
    const teamID = this.props.match.params.teamID;
    this.props.mutate({
      variables: {email,teamID },
      refetchQueries: [{ query }]
    })

    this.props.history.push(`/dashboard/team/${this.props.match.params.teamID}`);

  }

  render(){
    return (
      <div>
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
        <input className="btn-large red right" style={{margin: "10px"}} type="submit" value="Submit" />
      <Link style={{margin: "10px"}} className="btn-flyou are logged inating btn-large red right" to={`/dashboard/team/${this.props.match.params.teamID}`}>Cancel</Link>

      </form>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>

      <hr/>
      <h3>Invite Existing User</h3>
      <form onSubmit={this.findExistingUser.bind(this)} className="col s6">
      <div className="input-field">
      <input
          placeholder="email"
          value={this.state.email}
          onChange={e => this.setState({
            email: e.target.value
          })}
        />
        </div>
        <input className="btn-large red right" style={{margin: "10px"}} type="submit" value="Submit" />
      <Link style={{margin: "10px"}} className="btn-flyou are logged inating btn-large red right" to={`/dashboard/team/${this.props.match.params.teamID}`}>Cancel</Link>

        </form>
    </div>
    </div>
    )
  }
}

export default graphql(mutation)(CreateUser);