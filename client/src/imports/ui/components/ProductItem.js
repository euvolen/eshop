import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

 class ProductItem extends Component {


  render() {
      const {product} = this.props
      
    return (
      <div className="col-sm-6 col-md-4 product-item animation-element slide-top-left">
      <div className="product-container">
          <div className="row">
              <div className="col-md-12"><Link className="product-image" to={`/products/${product._id}`}><img src="/assets/img/iphone6.jpg?h=4da047b0dfd5972a29fc532060989c49"/></Link></div>
          </div>
          <div className="row">
              <div className="col-8">
                  <h2><a href="#">iPhone 6s</a></h2>
              </div>
          </div>
         <div className="row">
              <div className="col-12">
                  <p className="product-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ornare sem sed nisl dignissim, facilisis dapibus lacus vulputate. Sed lacinia lacinia magna. </p>
                  <div className="row">
                      <div className="col-6"><button className="btn btn-light" type="button">Buy Now!</button></div>
                      <div className="col-6">
                          <p className="product-price">$599.00 </p>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
    )
  }
}

ProductItem.propTypes ={
    product: PropTypes.object.isRequired
}

export default ProductItem

/*
 <div className="col-md-3">
       <Link to={`/products/${product._id}`}><h1>{product.name}</h1></Link>
        <img src={product.img} style={{ width: '200px', margin: 'auto', display: 'block' }}/>
      
      </div>
*/