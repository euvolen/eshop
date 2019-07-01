import React, { Component } from 'react'
import {connect} from  "react-redux"
import {removeFromCart, updateCart,change} from '../../redux/actions/productAction' 
import CartItem from '../components/CartItem';
import autoBind from 'auto-bind'
import PropTypes from 'prop-types';
import Spinner from '../components/common/Spinner';

 class Cart extends Component {
  constructor(props){
    super(props)
    autoBind(this)
  }

  toConfirm(){
    const {userCart, cart} = this.props.products
    if(userCart.user){
      this.props.history.push('/confirmation')
    }
    else{
      this.props.history.push('/login?cart=true')
    }
  }


  render() {
    const {loading, userCart, cart} = this.props.products
    let total = 0

    let content = <div/>
    if(!loading){
      if(Object.keys(userCart).length>1){
        total = price(userCart.cart)
            content = userCart.cart.map(item => {return <CartItem key={item._id} item = {item} change={this.props.change} cartId={userCart._id}  removeFromCart={this.props.removeFromCart}/>})
      }else{ 
        if(cart.length>0)
           { total = price(cart)  
             content =  cart.map(item => {return <CartItem key={item.productId}  
                                                     item = {item}                                            
                                                      change={this.props.change}
                                                      removeFromCart={this.props.removeFromCart}
                                                     />})}
      
    }
  }
    else{
      content = <Spinner/>
    }
   
    return (    <main className="page shopping-cart-page">
    <section className="clean-block clean-cart dark">
        <div className="container">
            <div className="block-heading">
                <h2 className="text-info">Shopping Cart</h2>
            </div>
            <div className="content">
                <div className="row no-gutters">
                    <div className="col-md-12 col-lg-8">
                        <div className="items">
                         {content}
              
                        </div>
                    </div>
                    <div className="col-md-12 col-lg-4">
                        <div className="summary">
                            <h3>Summary</h3>
                            <h4><span className="text">Total</span><span className="price">$ {total}</span></h4><button className="btn btn-primary btn-block btn-lg" type="button" onClick={this.toConfirm}>Checkout</button></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</main>)
  }
}

const price =(cart) =>{
  let res = 0
  if(cart)
  cart.map( i =>{
    res += i.price*i.quantity
  })

  return res
}

Cart.propTypes = {
  products: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  removeFromCart:PropTypes.func.isRequired,
  updateCart:PropTypes.func.isRequired,
  change:PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  products: state.products,
  errors:state.errors
});
export default connect(mapStateToProps,{removeFromCart, updateCart, change}) (Cart)
