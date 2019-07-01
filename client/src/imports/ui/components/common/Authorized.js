import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const Authorized = ({component: Component, auth, ...rest}) => (
    <Route {...rest} 
        render={props =>
            (auth.isAuthenticated === true && auth.user.role === 'admin') ? (
                <Component {...props}/>
            ):(<Redirect to='/forbidden'/>)
            }/>
);
Authorized.propTypes ={
    auth:PropTypes.object.isRequired
}
const mapStateToProps = state =>({
    auth:state.auth
})

export default connect(mapStateToProps)(Authorized)