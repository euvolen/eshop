import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProduct } from '../../redux/actions/productAction';

class Product extends Component {
  constructor(props){
    super(props)
  
  }
  componentDidMount(){
    this.props.getProduct(this.props.match.params.id)
  }
  addToCart(){

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
  products: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  products: state.products,
  errors: state.errors
});
export default connect(mapStateToProps,{getProduct})(Product)