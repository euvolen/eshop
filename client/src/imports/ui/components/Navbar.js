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

    const authLinks = (
      <ul className="nav navbar-nav">
      <li className="nav-item" role="presentation"><Link className="nav-link" to={'/cart'}><i className="fa fa-shopping-cart"></i></Link></li>
      <li className="nav-item" role="presentation"></li>
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
      </ul>
    );

    const guestLinks = (
      <ul className="nav navbar-nav">
      <li className="nav-item" role="presentation"><Link className="nav-link" to={'/cart'}><i className="fa fa-shopping-cart"></i></Link></li>
      <li className="nav-item" role="presentation"></li>
      <li className="nav-item" role="presentation"><Link className="nav-link" to={'/register'}>Signin</Link></li>
      <li className="nav-item" role="presentation"><Link className="nav-link" to={'/login'}>Login</Link></li>
  </ul>
    );

    return (
      <nav className="navbar navbar-light navbar-expand-md fixed-top shadow-sm" style={{height: '50px'}}>
      <div className="container"><button data-toggle="collapse" className="navbar-toggler" data-target="#navcol-1"><span className="sr-only">Toggle navigation</span><span className="navbar-toggler-icon"></span></button><img src="/assets/img/logo1.png?h=3f822f15b94ede6903575df11c0f8eee" height="40"/>
          <div className="collapse navbar-collapse justify-content-end"
              id="navcol-1">
              <ul className="nav navbar-nav flex-fill">
                  <li className="nav-item" role="presentation"><Link className="nav-link active justify-content-start" to={'/'}>Products</Link></li>
                  <li className="nav-item" role="presentation"><Link className="nav-link active justify-content-start" to={'/about'}>About</Link></li>
              </ul>
           {isAuthenticated ? authLinks : guestLinks}
          </div>
      </div>
  </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
/*
 <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Eshop
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/cart">
                  {' '}
                  Cart
                </Link>
              </li>
            </ul>
            <ul>
               {isAuthenticated ? authLinks : guestLinks}
            </ul>
           
          </div>
        </div>
      </nav> */