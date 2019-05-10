import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './imports/utils/setAuthToken';
import { setCurrentUser, logoutUser } from './imports/redux/actions/authActions';


import { Provider } from 'react-redux';
import store from './store';
import Register from './imports/ui/pages/Register';
import Login from './imports/ui/pages/Login';
import Navbar from './imports/ui/components/Navbar';
import Footer from './imports/ui/components/Footer';
import Landing from './imports/ui/pages/Landing';

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = '/login';
  }
}

function App() {
  return (
    <Provider store={store}>
    <Router>
      <div className="App">
        <Navbar/>
       <div className="container">
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Switch>
            <Route exact path="/dashboard" component={Landing} />
          </Switch>
          
        </div>
       <Footer/>
      </div>
    </Router>
  </Provider>
  );
}

export default App;
