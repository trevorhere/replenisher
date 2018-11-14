import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link, Redirect } from 'react-router-dom';
import query from '../gql/queries/CurrentUser';
import mutation from '../gql/mutations/Logout';


class Header extends Component {

  onLogoutClick() {
    this.props.mutate({
      refetchQueries: [{ query }]
    });

    history.pushState('/login');
  }

  renderButtons(){
    const {loading, user} = this.props.data;

    if(loading){
      return <div />
    }

    if(user){
      return (
        <div>
          <li>
            <Link to={`/dashboard`}> Dashboard</Link>
          </li>
          <li>
            <Link onClick={this.onLogoutClick.bind(this)}  to="/login" >Logout</Link>
          </li>
        </div>
      )
    }

    return (
      <div>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </div>

    )

  }

  render(){
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to="/dashboard" style={{paddingLeft:"10px"}} className="brand-logo left">   Replenisher</Link>
          <ul className="right">
            {this.renderButtons()}
          </ul>
        </div>
      </nav>
    );
  }
}

export default graphql(mutation)(
    graphql(query)(Header)
);