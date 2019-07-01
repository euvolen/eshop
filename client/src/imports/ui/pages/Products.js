import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProducts ,getCategories, filterProducts} from '../../redux/actions/productAction';
import ProductItem from '../components/ProductItem';
import Spinner from '../components/common/Spinner';

const leftContent =(component, categories)=>{ 
  

  return  <div className="col-md-3">
                            <div className="d-none d-md-block">
                                <div className="filters">
                                    <div className="filter-item">
                                        <h3>Categories</h3>
                                        {categories.map(category => {
                                     
                                          return <div key={category._id} className="form-check"><button className="btn btn-secondary btn-block m-1" name={`${category.name}`} onClick={(e)=>{
                                     
                                            component.props.filterProducts(category.name)
                                
                                        }}>{category.name}</button></div>
                                      })}
                                      <div  className="form-check"><button className="btn btn-secondary btn-block m-1"  onClick={(e)=>{
                                     
                                     component.props.getProducts()
                         
                                 }} id="formCheck-1">Show all</button></div>
                                   </div>
                               
                                </div>
                            </div>
                            <div className="d-md-none"><a className="btn btn-link d-md-none filter-collapse" data-toggle="collapse" aria-expanded="false" aria-controls="filters" href="#filters" role="button">Filters<i className="icon-arrow-down filter-caret"></i></a>
                                <div className="collapse"
                                    id="filters">
                                  
                                         <div className="container">
                                        <div className="filter-item">
                                        <div className="container text-center">
                                            <h3>Categories</h3>
                                         
                                            {categories.map(category =>( <div key={category._id} ><button className="btn btn-secondary btn-block" onClick={(e)=>{
                                     
                                     component.props.filterProducts(category.name)
                         
                                 }}>Show all</button></div>))}
                                           
                                           </div>
                                        </div>
                                        </div>
                                </div>
                            </div>
                        </div>}

class Products extends Component {
  constructor(props){
    super(props)
    this.state={
      products:[]
    }
  }
 componentDidMount(){
    this.props.getProducts()
    this.props.getCategories()
 }

  render() {
    const {products, loading, categories} =this.props.products
    let content
          if ((products !== null || !loading)){
          content =  products.map(product => {return  <ProductItem key={product._id} product={product} />})
          }
          else 
          content = <Spinner/>
    return (        <main className="page"> <section className="clean-block clean-catalog dark">
    <div className="container">
        <div className="block-heading">
            <h2 className="text-info">Catalog Page</h2>
        </div>
        <div className="content">
            <div className="row"> {leftContent(this, categories)}<div className="col-md-9"><div className="products">   <div className="row no-gutters"> {content}</div></div></div> </div></div></div></section></main>)
    
  }
}
Products.propTypes = {
  getCategories:PropTypes.func.isRequired,
  getProducts: PropTypes.func.isRequired,
  filterProducts: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  products: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  products: state.products,
  errors: state.errors
});

export default connect(mapStateToProps,{getProducts, getCategories, filterProducts})(Products)

/**
 *   <section className="clean-block clean-catalog dark">
            <div className="container">
                <div className="block-heading">
                    <h2 className="text-info">Catalog Page</h2>
                </div>
                <div className="content">
                    <div className="row">
 */