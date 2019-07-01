import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import { loginUser } from '../../redux/actions/authActions';
import TextFieldGroup from '../components/common/TextFieldGroup';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      err: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
   
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/');
    }

    if (nextProps.errors) {
      this.setState({ err: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    if(this.props.history.location.search==='?cart=true')
    this.props.loginUser(userData, this.props.products.cart);
    else {
      this.props.loginUser(userData);
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { err } = this.state;

    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your Eshop account
              </p>
              <form onSubmit={this.onSubmit}>
              <TextFieldGroup 
              type="email" 
              value={this.state.email}
              onChange={this.onChange} 
              placeholder="Email Address" 
              name="email"
              err={err.email} 
              />
                  <TextFieldGroup 
              type="password" 
              value={this.state.password}
              onChange={this.onChange} 
              placeholder="Password" 
              name="password"
              err={err.password} 
              />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
               <p>Does not have an account? <Link to={`/register${this.props.history.location.search==='?cart=true' ? '?cart=true' : '/'}`}>Create one!</Link></p>
            </div>
           
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  products:state.products
});

export default connect(mapStateToProps, { loginUser })(Login);
