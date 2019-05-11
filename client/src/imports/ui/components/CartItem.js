import React, { Component } from 'react'
import PropTypes from 'prop-types'

 class CartItem extends Component {

  render() {
      const {item} = this.props
      
    return (
      <div className="col-md-12 line">
     <h1>{item.name}</h1>
      <h3>{item.price}</h3>
      <h3>{item.quantity}</h3>
      <h3>Summ: {item.quantity*item.price}</h3>
      </div>
    )
  }
}

CartItem.propTypes ={
    item: PropTypes.object.isRequired
}

export default CartItem