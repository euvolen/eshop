import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProducts } from '../../redux/actions/productAction';
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
    let content
          if (products !== null || !loading){
          content =  products.map(product => {return  <ProductItem key={product._id} product={product}/>})
          }
          else 
          content = <Spinner/>
    return (  <div className="row product-list dev"><div className="row product-list dev">{content}</div> </div>)
    
  }
}
Products.propTypes = {
  getProducts: PropTypes.func.isRequired,
  products: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  products: state.products,
  errors: state.errors
});

export default connect(mapStateToProps,{getProducts})(Products)