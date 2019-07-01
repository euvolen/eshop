import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { filterProducts } from '../../redux/actions/productAction';
import Spinner from './common/Spinner';
import _ from 'lodash'
import Rating from './Rating';

class RelatedProducts extends Component {
    componentDidMount(){
        this.props.filterProducts(this.props.category)
    }
    render(){
        const {products, loading}=this.props.products

        let content 
        if(products.length===0){
            content = <Spinner/>
        }
        else{
            content = (  <div className="clean-related-items">
            <h3>Related Products</h3>
            <div className="items">
                <div className="row justify-content-center">
                    {loading ? <Spinner/> : (_.range(3).map(i =>(
                          <div key={i} className="col-sm-6 col-lg-4">
                          <div className="clean-related-item">
                              <div className="image"><Link to={`/products/${products[i]._id}`}><img alt=""className="img-fluid d-block mx-auto" src={products[i].img}/></Link></div>
                              <div className="related-name"><Link to={`/products/${products[i]._id}`}>{products[i].name}</Link>
                              <Rating rating={products[i].rating ? products[i].rating : 4}/>
                                  <h4>{products[i].price}</h4>
                              </div>
                          </div>
                      </div>
                    )))}
                </div>
            </div>
        </div>)
        }

    return (
      content
    )}
}

RelatedProducts.propTypes ={
    filterProducts: PropTypes.func.isRequired,
    category: PropTypes.object.isRequired,
    products:PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    products:state.products
  });
  
  export default connect(mapStateToProps, { filterProducts })(RelatedProducts);