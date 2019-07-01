import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import { getTransactions } from '../../redux/actions/adminAction';
import Spinner from '../components/common/Spinner';
 class Admin extends Component {

    componentDidMount(){
          this.props.getTransactions()
      }

  render() {
      const {transactions, loading} = this.props.products
      console.log(transactions)
    return (
 
<main id="page-top">
    <div className="container-fluid">
        <h3 className="text-dark mb-4">Team</h3>
        <div className="card shadow">
            <div className="card-header py-3">
                <p className="text-primary m-0 font-weight-bold">Admin page</p>
                <div className='container'>  
                <div className="row">
                    <div className='col col-md-4'> <Link className="btn btn-primary text-primary m-0 font-weight-bold" to='/admin/products'>Products</Link></div>
                    <div className='col col-md-4'> <Link className="btn btn-primary text-primary m-0 font-weight-bold" to='/admin/categories'>Categories</Link></div>
                    <div className='col col-md-4'> <Link className="btn btn-primary text-primary m-0 font-weight-bold" to='/admin/users'>Users</Link></div>
                    
                    </div>
                    </div>
              

            </div>
            <div className="card-body">
                <div className="table-responsive table mt-2" id="dataTable" role="grid" aria-describedby="dataTable_info">
                    <table className="table dataTable my-0" id="dataTable">
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Transaction Id</th>
                                <th>Date</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                       {transactions ? content(transactions) : tdLoading() }
   
                        </tbody>
                        <tfoot>
                            <tr>
                                <td><strong>User</strong></td>
                                <td><strong>Transaction Id</strong></td>
                                <td><strong>Date</strong></td>
                                <td><strong>Total</strong></td>
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

const content = (data) => data.map((i, index) => { 
    let total = 0
    i.cart.map(i=> total+=i.price*i.quantity)
    const {name, avatar} = i.user
    return (<tr key={index}>
  <td><img className="rounded-circle mr-2" width="30" height="30" src={avatar ? avatar : '/assets/img/tech/empty-avatar.jpg'} />{name}</td>
  <td>{i._id}</td>

  <td>{i.date}</td>
  <td>$ {total}</td>
</tr>)})

const tdLoading = ()=>(
    <tr>
    <td><Spinner/></td>
    <td><Spinner/></td>
    <td><Spinner/></td>
    <td><Spinner/></td>
    </tr>
)

Admin.propTypes ={
    getTransactions: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    errors: state.errors,
    products:state.products
  });
export default connect(mapStateToProps, {getTransactions})(Admin)