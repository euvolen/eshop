import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProducts , addToUserCart, addToCart} from '../../redux/actions/productAction';
import ProductItem from '../components/ProductItem';
import Spinner from '../components/common/Spinner';


class Products extends Component {
  constructor(props){
    super(props)
    this.state={
      products:[]
    }
  }
 componentDidMount(){
    this.props.getProducts()
 }


  render() {
    const {products, loading} =this.props.products
    const {id} = this.props.auth.user
    let content
          if ((products !== null || !loading) && id){
          content =  products.map(product => {return  <ProductItem key={product._id} product={product} add={this.props.addToUserCart} id={id}/>})
          }else if(products !== null || !loading){
            content =  products.map(product => {return  <ProductItem key={product._id} product={product} add={this.props.addToCart}/>})
          }
          else 
          content = <Spinner/>
    return (  <div className="row product-list dev"><div className="row product-list dev">{content}</div> </div>)
    
  }
}
Products.propTypes = {
  addToCart:PropTypes.func.isRequired,
  addToUserCart:PropTypes.func.isRequired,
  getProducts: PropTypes.func.isRequired,
  products: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  products: state.products,
  errors: state.errors
});

export default connect(mapStateToProps,{getProducts, addToUserCart, addToCart})(Products)