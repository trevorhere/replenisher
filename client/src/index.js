import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { Route, IndexRoute } from 'react-router';
import { Router, HashRouter, Link } from 'react-router-dom';


const client = new ApolloClient({
 // dataIdFromObject: object => object.id
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      < HashRouter>
        <Route path="/" component={App}>
        </Route>
      </HashRouter>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
