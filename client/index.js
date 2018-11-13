// import React from 'react';
// import ReactDOM from 'react-dom';
// import * as serviceWorker from './src/serviceWorker';
// import ApolloClient from 'apollo-boost';
// import { ApolloProvider } from 'react-apollo';
// import { Route, IndexRoute } from 'react-router';
// import { Router, HashRouter, Link } from 'react-router-dom';

// import App from './components/App';
// import Dashboard from './components/Dashboard';
// import Test from './components/Test';
// import LoginForm from './components/LoginForm';
// import SignupForm from './components/SignupForm';
// import requireAuth from './components/requireAuth';


// const client = new ApolloClient({
//  // dataIdFromObject: object => object.id
//   uri: "/graphql",
//   credentials: 'same-origin'
// });

// const Root = () => {
//   return (
//     <ApolloProvider client={client}>
//       < HashRouter>
//         <Route path="/" component={App}>
//           {/* <Route path="login" component={LoginForm} />
//           <Route path="signup" component={SignupForm} />
//           <Route path="dashboard" component={requireAuth(Dashboard)} /> */}
//         </Route>
//       </HashRouter>
//     </ApolloProvider>
//   );
// };

// ReactDOM.render(<Root />, document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();


///

import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { HashRouter } from 'react-router-dom';
import { Router, hashHistory, Route, IndexRoute } from 'react-router';

import App from './components/App';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm'
import Dashboard from './components/Dashboard';
import requireAuth from './components/requireAuth';


const client = new ApolloClient({
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <HashRouter>
        <Route path="/" component={App}>
          {/* <Route path="login" component={LoginForm} />
          <Route path="signup" component={SignupForm} />
          <Route path="dashboard" component={requireAuth(Dashboard)} /> */}
        </Route>
      </HashRouter>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
