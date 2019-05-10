import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

 class ProductItem extends Component {
 constructor(props){
     super(props)

 }

  render() {
      const {product} = this.props
    return (
      <div>
       <Link to={`/products/${product.id}`}><h1>{product.name}</h1></Link>
       <p>{product.id}</p>
      </div>
    )
  }
}

ProductItem.propTypes ={
    product: PropTypes.object.isRequired
}

export default ProductItem