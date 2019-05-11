import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

 class ProductItem extends Component {


  render() {
      const {product} = this.props
      
    return (
      <div className="col-md-3">
       <Link to={`/products/${product._id}`}><h1>{product.name}</h1></Link>
        <img src={product.img} style={{ width: '200px', margin: 'auto', display: 'block' }}/>
      
      </div>
    )
  }
}

ProductItem.propTypes ={
    product: PropTypes.object.isRequired
}

export default ProductItem