import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProduct, addToCart, addToUserCart } from '../../redux/actions/productAction';
import RelatedProducts from '../components/RelatedProducts';
import Spinner from '../components/common/Spinner';



class Product extends Component {

  componentDidMount(){
    console.log(this.props.match.params.id)
    this.props.getProduct(this.props.match.params.id)
  }

  //Adding to cart
  addToCart(){
      const {user, isAuthenticated} = this.props.auth
      const {userCart, cart, product} = this.props.products
      //Data formating
      let data ={
        productId:product._id,
        name:product.name,
        price:product.price,
        quantity:1
      }
        if(isAuthenticated){
          if(userCart.cart.filter(item =>item.productId === data.productId).length===0){
            this.props.addToUserCart(data, user.id)
          } 
        }else {
          if (cart.filter(item =>item.productId === data.productId).length===0){
          this.props.addToCart(data)
        }
      
  }}


  
  render() {
    const {product} = this.props.products
    let content
    
    if(product.category)
     content = (<section className="clean-block clean-product dark">
     <div className="container">
         <div className="block-heading">
             <h2 className="text-info">Product Page</h2>
         </div>
         <div className="block-content">
             <div className="product-info">
                 <div className="row">
                     <div className="col-md-6">
                     <img alt="" className="img-fluid d-block mx-auto" src={'/'+product.img}/>
                     </div>
                     <div className="col-md-6">
                         <div className="info">
                             <h3>{product.name}</h3>
                             <div className="rating"><img alt=""src="/assets/img/star.svg"/><img alt=""src="/assets/img/star.svg"/><img alt=""src="/assets/img/star.svg"/><img alt=""src="/assets/img/star-half-empty.svg"/><img alt=""src="/assets/img/star-empty.svg"/></div>
                             <div className="price">
                                 <h3>${product.price}</h3>
                             </div><button className="btn btn-primary" type="button" onClick={this.addToCart.bind(this)} ><i className="icon-basket"></i>Add to Cart</button>
                             <div className="summary">
                                 <p>{product.description}</p>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>
            
    
         </div>
     </div>
 </section>)
    else{
        content=<Spinner/>
    }
    return (
      <main className="page product-page">
      {content}
  </main>

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
