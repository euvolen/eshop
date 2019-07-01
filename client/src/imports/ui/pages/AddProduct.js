import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import { getProducts } from '../../redux/actions/adminAction';
import Spinner from '../components/common/Spinner';
import SelectListGroup from '../components/common/SelectListGroup';

 class AddProduct extends Component {
    constructor(props){
        super(props)
        this.onChange = this.onChange.bind(this);
    }
    state = {
        name : "value",
    value :"value1",
    err : '',
    info: '',
    options:[{label:'label1', value:'value1'},{label:'label2', value:'value2'},{label:'label3', value:'value3'}]
    }
    componentDidMount(){
          this.props.getProducts()

      }
    onChange(e){
        console.log(e)
        this.setState({[e.target.name]:e.target.value})
      }
  render() {
      const {products, loading} = this.props.products
      console.log(products)
    return (
 
<main id="page-top">
    <div className="container-fluid">
        <h3 className="text-dark mb-4">Team</h3>
        <div className="card shadow">
            <div className="card-header py-3">
                <p className="text-primary m-0 font-weight-bold">Products</p>
                <div className="row">
                    <div className='col col-md-3'> <Link className="btn btn-info text-primary m-0 font-weight-bold" to='/admin/'>Back</Link></div>
                    <div className='col col-md-3'> <Link className="btn btn-default text-primary m-0 font-weight-bold" to='/admin/products/add'>New</Link></div>
                    
                    <div className='col col-md-3'> <Link className="btn btn-primary text-primary m-0 font-weight-bold" to='/admin/categories'>Categories</Link></div>
                    <div className='col col-md-3'> <Link className="btn btn-primary text-primary m-0 font-weight-bold" to='/admin/users'>Users</Link></div>
                    </div>
            </div>
            <div className="card-body">
                <div className="table-responsive table mt-2" id="dataTable" role="grid" aria-describedby="dataTable_info">
                    <table className="table dataTable my-0" id="dataTable">
                        <thead>
                            <tr>
                               
                                <td>Name</td>
                                <td>Category</td>
                                <td>$ Initial </td>
                                <td>$ Net </td>
                                <td>$ Gross</td>
                            </tr>
                        </thead>
                        <tbody>
                       {products ? content(products, this) : tdLoading() }
   
                        </tbody>
                        <tfoot>
                            <tr>
                              
                                <td><strong>Name</strong></td>
                                <td><strong>Category</strong></td>
                                <td><strong>$ Initial </strong></td>
                                <td><strong>$ Net </strong></td>
                                <td><strong>$ Gross</strong></td>
                            
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    </div>
    </main>
    )
  }
}


const content = (products) => products.map(product => { 

    return (<tr key={product._id}>
  <td><img className="rounded-circle mr-2" width="30" height="30" src={product.img} />{product.name}</td>
  <td>{product.category.name}</td>
  <td>${product.initial_price}</td>

  <td>${product.net_price}</td>
  <td>$ {product.gross_price}</td>
</tr>)})

const tdLoading = ()=>(
    <tr>
    <td><Spinner/></td>
    <td><Spinner/></td>
    <td><Spinner/></td>
    <td><Spinner/></td>
    <td><Spinner/></td>
    </tr>
)



AddProduct.propTypes ={
    getProducts: PropTypes.func.isRequired,
    products:PropTypes.object.isRequired,
    errors:PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    errors: state.errors,
    products:state.products
  });
export default connect(mapStateToProps, {getProducts})(AddProduct)