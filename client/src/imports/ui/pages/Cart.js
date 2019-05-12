import React, { Component } from 'react'
import {connect} from  "react-redux"
import CartItem from '../components/CartItem';
import PropTypes from 'prop-types';
import Spinner from '../components/common/Spinner';
 class Cart extends Component {
  render() {
    const {userCart, cart} = this.props.products
    let content = <Spinner/>

    if(Object.keys(userCart).length>0){
      content =  userCart.cart.map(item => {return <CartItem key={item._id} item={item}/>})
    }else if(cart.length>0){

      content =  cart.map(item => {return <CartItem key={item.productId} item={item}/>})
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