import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../redux/actions/authActions';

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const { cart, userCart } = this.props.products;
    let ucart = []
    if(userCart.cart) 
       ucart = userCart.cart
    const authLinks = (
 <>
     {user.role === 'admin' ? <li className="nav-item" role="presentation"><Link className="nav-link" to={'/admin'}>Admin</Link></li> : undefined}
      <li className="nav-item" role="presentation"><Link className="nav-link" to={`/user/${user.id}`}><img
              className="rounded-circle"
              src={user.avatar}
              alt={user.name}
              style={{ width: '25px', marginRight: '5px' }}
              title="You must have a Gravatar connected to your email to display an image"
            /></Link></li>
          <li className="nav-item" role="presentation">
            <a
            href=""
            onClick={this.onLogoutClick.bind(this)}
            className="nav-link"
          >
           {' '}
            Logout
          </a>
          </li>
      </>
    );

    const guestLinks = (
      <>
      
      <li className="nav-item" role="presentation"><Link className="nav-link" to={'/register'}>Signin</Link></li>
      <li className="nav-item" role="presentation"><Link className="nav-link" to={'/login'}>Login</Link></li>
      </>
    );

    return (
      <nav className="navbar navbar-light navbar-expand-lg fixed-top bg-white clean-navbar">
      <div className="container"><div className="navbar-brand logo" >Eugelion</div><button data-toggle="collapse" className="navbar-toggler" data-target="#navcol-1"><span className="sr-only">Toggle navigation</span><span className="navbar-toggler-icon"></span></button>
          <div className="collapse navbar-collapse justify-content-end"
              id="navcol-1">
              <ul className="nav navbar-nav flex-fill">
                  <li className="nav-item" role="presentation"><Link className="nav-link active justify-content-start" to={'/'}>Products</Link></li>
                  <li className="nav-item" role="presentation"><Link className="nav-link active justify-content-start" to={'/about'}>About</Link></li>
              </ul>
              <ul className="nav navbar-nav">
            <li className="nav-item" role="presentation"><Link className="nav-link" to={'/cart'}><i className="fa fa-shopping-basket"><span className="badge badge-secondary">{isAuthenticated ? (ucart.length>0 ? ucart.length : undefined ):(cart.length>0 ? cart.length : undefined )}</span></i></Link></li>
           {isAuthenticated  ? authLinks : guestLinks}
           </ul>
          </div>
      </div>
  </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  products:PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  products: state.products
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
