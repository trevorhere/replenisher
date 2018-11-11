import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import query from '../gql/queries/CurrentUser';
import mutation from '../gql/mutations/Logout';


class Header extends Component {

  onLogoutClick() {
    this.props.mutate({
      refetchQueries: [{ query }]
    });
  }

  renderButtons(){
    const {loading, user} = this.props.data;

    if(loading){
      return <div />
    }

    if(user){
      return (
        <fragment>
          <li>
            <a onClick={this.onLogoutClick.bind(this)} to="/login">Logout</a>
          </li>
        </fragment>
      )
    }

    return (
      <fragment>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </fragment>

    )

  }

  render(){
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo left">Home</Link>
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