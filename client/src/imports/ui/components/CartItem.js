import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'


 class CartItem extends Component {


  render() {
      const {item,removeFromCart ,cartId, change} = this.props
    
      let content = <div/>


        content = (     <div className="product">
        <div className="row justify-content-center align-items-center">
            <div className="col-md-3">
                <div className="product-image"><img alt=""className="img-fluid d-block mx-auto image" src={item.img}/></div>
            </div>
            <div className="col-md-2 product-info"><Link className="product-name" to={`/products/${item.productId}`}>{item.name}</Link>
            </div>
            <div className="col-6 col-md-3 quantity">

            <div className="row">
               <div className="col-md-4">
                 <button  className="btn btn-primary" onClick={change.bind(this,item.productId, '+', cartId ? cartId : undefined)}>+</button>
              </div> 
              <div className="col-md-4">
                 <div  className="btn btn-success">{item.quantity}</div>
              </div> 
            <div className="col-md-4"> 
            <button className="btn btn-primary" onClick={change.bind(this,item.productId, '-', cartId ? cartId : undefined)}>-</button>
            </div>
            </div>
            </div>
            <div className="col-6 col-md-1 price"><span>${item.price}</span></div>
             <div className="col-6 col-md-1"> <button className="btn btn-danger" onClick={()=>{removeFromCart(item.productId, cartId ? cartId : undefined)}}>X</button></div>
        </div>
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
