import React, { Component } from 'react'
import ProductItem from '../components/ProductItem';

class Products extends Component {
  constructor(props){
    super(props)
    this.state={
      products:[{name:'Product1', id:1},
      {name:'Product2', id:2},
      {name:'Product3', id:3},
      {name:'Product14', id:4},
      {name:'Product5', id:5}
    ]
    }
  }
 componentDidMount(){
    //TODO GetAllProducts
 }


  render() {
    const {products} =this.state
  
    return (
      <div>
        {products.map(product => <ProductItem key={product.id} product={product}/>)}
      </div>
    )
  }
}
export default Products