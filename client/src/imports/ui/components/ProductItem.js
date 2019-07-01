import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import Rating from './Rating';

 class ProductItem extends Component {


  render() {
      const {product} = this.props
      
    return (
        <div className="col-12 col-md-6 col-lg-4">
      <div className="clean-product-item">
          <div className="image"><Link to={`/products/${product._id}`}><img alt=""className="img-fluid d-block mx-auto" src="/assets/img/tech/image2.jpg"/></Link></div>
              <div className="product-name"><a href="#">{product.name}</a></div>
               <div className="about">
                <Rating rating={product.rating ? product.rating : 3}/>
             <div className="price">
            <h3>$ {product.price}</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
    )
  }
}

ProductItem.propTypes ={
    product: PropTypes.object.isRequired,
    id:PropTypes.string
}

export default ProductItem
