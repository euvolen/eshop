import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProduct, addToCart, addToUserCart } from '../../redux/actions/productAction';



class Product extends Component {

  componentDidMount(){

    this.props.getProduct(this.props.match.params.id)
  }

  //Adding to cart
  addToCart(){
      const {user} = this.props.auth
      const {userCart, cart, product} = this.props.products
      //Data formating
      let data ={
        productId:product._id,
        name:product.name,
        price:product.price,
        quantity:1
      }
        if(user.id){
          if(userCart.cart.filter(item =>item.productId === data.productId).length===0){
            this.props.addToUserCart(data, user.id)
          } 
        }else {
          if (cart.filter(item =>item.productId === data.productId).length===0){
          cart.push(data)
          this.props.addToCart(cart)
        }
      
  }}


  
  render() {
    const {product} = this.props.products
    return (
      <section className="product-details">
   
      <div className="container">
          <h1 className="text-center">Product Details</h1>
          <div className="row">
              <div className="col-md-7">
                  <div className="row">
                      <div className="col-md-12"><img className="img-thumbnail img-fluid center-block" src="/assets/img/videomicme.png?h=e65dbc59fba1ebe1bd98fe1bf2964838"/></div>
                  </div>
                  <h3 className="product-image">Price:&nbsp;</h3>
              </div>
              <div className="col-md-5">
                  <h1>Lorem Ipsum</h1>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sollicitudin elit massa. className aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris malesuada rutrum magna. Phasellus maximus
                      nunc eget massa euismod bibendum. Phasellus justo felis, porttitor nec justo eu, vestibulum ultrices neque. Maecenas iaculis euismod tempor. Cras vel pellentesque nunc. Sed sit amet convallis dolor, eget dictum elit. Donec ut justo
                      arcu. Vivamus tincidunt nibh ac sem lobortis semper. Cras vulputate mattis euismod. Morbi accumsan leo in leo condimentum, tincidunt pretium dui scelerisque. Morbi mi dui, vehicula vel velit eget, mattis bibendum lectus. Integer
                      iaculis libero at arcu laoreet aliquam. Cras at libero sapien. Sed luctus erat sit amet est hendrerit faucibus. </p>
              </div>
          </div>
          <div className="row">
              <div className="col col-md-8"></div>
              <div className="col" data-bs-hover-animate="pulse"><button className="btn btn-primary btn-block" type="button">Button</button></div>
          </div>
      </div>

  </section>
    )
  }
}
Product.propTypes = {
  getProduct: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  addToUserCart: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  products: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth:state.auth,
  products: state.products,
  errors: state.errors
});
export default connect(mapStateToProps,{getProduct, addToCart, addToUserCart})(Product)

/**
 *   <div>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <h5>{product.price}</h5>
        <button onClick={this.addToCart.bind(this, product.id)}>Add</button>
      </div>
 */