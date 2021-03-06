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
import Products from './imports/ui/pages/Products';
import Cart from './imports/ui/pages/Cart';
import Product from './imports/ui/pages/Product';
import Admin from './imports/ui/pages/Admin';
import Settings from './imports/ui/pages/Settings';
import NotFound from './imports/ui/pages/NotFound';
import { getUserCart } from './imports/redux/actions/productAction';
import Confirmation from './imports/ui/pages/Confirmation';
import ThankYou from './imports/ui/pages/ThankYou';
import About from './imports/ui/pages/About';
import PrivateRoute from './imports/ui/components/common/PrivateRoute'
import Forbidden from './imports/ui/pages/Forbidden';
import Authorized from './imports/ui/components/common/Authorized';
import AddProduct from './imports/ui/pages/AddProduct';
import NewProduct from './imports/ui/pages/NewProduct';

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  store.dispatch(getUserCart())

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
        <div className="main-content">
           <div className="container">
          <Switch>
            <Route exact path="/" component={Products} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/products" component={Products} />
            <Route exact path="/products/:id" component={Product} />
            <Route exact path="/cart" component={Cart} />
            <Authorized exact path="/admin" component={Admin} />
            <Authorized exact path="/admin/products" component={AddProduct} />
            <Authorized exact path="/admin/products/add" component={NewProduct} />
            <Route exact path="/about" component={About} />
            <Route exact path="/confirmation" component={Confirmation} />
            <Route exact path="/thank-you" component={ThankYou} />
            <Route exact path="/forbidden" component={Forbidden} />
            <PrivateRoute exact path="/user/:id" component={Settings} />
            <Route path="*" component={NotFound}/>
          </Switch>
          
        </div>
        </div>
      
       <Footer/>
      </div>
    </Router>
  </Provider>
  );
}

export default App;
