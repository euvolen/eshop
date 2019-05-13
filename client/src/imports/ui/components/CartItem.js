import React, { Component } from 'react'
import PropTypes from 'prop-types'


 class CartItem extends Component {


  render() {
      const {item,removeFromCart ,cartId, change} = this.props
    
      let content = <div/>


        content = (  <div className="col-md-12 line">
        <h1>{item.name}</h1>
         <h3>{item.price}</h3>
         <button onClick={change.bind(this,item.productId, '-', cartId ? cartId : undefined)}>-</button>
         <p>{item.quantity}</p>
         <button onClick={change.bind(this,item.productId, '+', cartId ? cartId : undefined)}>+</button>
         <h3>Summ: {item.quantity*item.price}</h3>
         <button onClick={()=>{removeFromCart(item.productId, cartId ? cartId : undefined)}}>X</button>
         </div>)
      
    
    return content
  }
}

CartItem.propTypes ={
    cartId:PropTypes.string,
    removeFromCart:PropTypes.func.isRequired,
    change:PropTypes.func.isRequired,

}

export default CartItem