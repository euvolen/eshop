import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProduct, addToCart, updateCart } from '../../redux/actions/productAction';



class Product extends Component {
  constructor(props){
    super(props)
  
  }
  componentDidMount(){

    this.props.getProduct(this.props.match.params.id)
  }

  //Adding to cart
  addToCart(){
      const {user} = this.props.auth
      const {userCart, product} = this.props.products
      //Data formating
      let data ={
        productId:product._id,
        name:product.name,
        price:product.price,
        quantity:1
      }

        if(userCart.cart.filter(item =>item.productId === data.productId).length===0){
          this.props.addToCart(data, user ? user.id : undefined)
        }
      
  }


  
  render() {
    const {product} = this.props.products
    return (
      <div>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <h5>{product.price}</h5>
        <button onClick={this.addToCart.bind(this, product.id)}>Add</button>
      </div>
    )
  }
}
Product.propTypes = {
  getProduct: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  updateCart: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  products: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth:state.auth,
  products: state.products,
  errors: state.errors
});
export default connect(mapStateToProps,{getProduct, addToCart, updateCart})(Product)