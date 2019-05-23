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
    this.state = {total:0}
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


    let content = <div/>
    if(!loading){
      if(Object.keys(userCart).length>2){
            content = userCart.cart.map(item => {return <CartItem key={item._id} item = {item} change={this.props.change} cartId={userCart._id}  removeFromCart={this.props.removeFromCart}/>})
      }else{ 
        if(cart.length>0)
              content =  cart.map(item => {return <CartItem key={item.productId}  
                                                     item = {item}                                            
                                                      change={this.props.change}
                                                      removeFromCart={this.props.removeFromCart}
                                                     />})
      
    }
  }
    else{
      content = <Spinner/>
    }
   
    return (<section class="cart">
    <div class="container">
        <h1>Cart</h1>
        <div class="table-responsive" >
            <table class="table">
                <thead>
                    <tr>
                        <th colspan="2">Product name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {content}
                    <tr class="justify-content-center">
                        <td class="justify-content-end"></td>
                        <td class="justify-content-end"></td>
                        <td class="justify-content-end"></td>
                        <td class="justify-content-end"><strong>Total</strong><br/></td>
                        <td class="justify-content-end">{this.state.total}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</section>)
  }
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

/**
 * 
 * <div>
      <h1>Cart</h1>
      {content}
      <button onClick={this.toConfirm.bind(this)}>Continue</button>
    </div>
 */