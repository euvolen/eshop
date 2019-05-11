import React, { Component } from 'react'
import {connect} from  "react-redux"
import CartItem from '../components/CartItem';
import PropTypes from 'prop-types';
 class Cart extends Component {
  render() {
    const {cart} = this.props.products
    console.log(cart);
    
    return (
      <div>
        {cart.map(item => {return <CartItem key={item.id} item={item}/>})}
      </div>
    )
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