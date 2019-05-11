import React, { Component } from 'react'
import {connect} from  "react-redux"
import CartItem from '../components/CartItem';
import PropTypes from 'prop-types';
import Spinner from '../components/common/Spinner';
 class Cart extends Component {
  render() {
    const {cart} = this.props.products.userCart
    let content = <Spinner/>
    if(cart){
      content =  cart.map(item => {return <CartItem key={item._id} item={item}/>})
    }
    
    return content
  }
}

Cart.propTypes = {
  products: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  products: state.products,
  errors:state.errors
});
export default connect(mapStateToProps,{}) (Cart)