import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProducts } from '../../redux/actions/productAction';
import ProductItem from '../components/ProductItem';
import Loading from '../components/Loading';

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
    const {products} =this.props.products
    let content
          if (products){
          content =  products.map(product => {return  <ProductItem key={product._id} product={product}/>})
          }
          else 
          content = undefined
    return content
    
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