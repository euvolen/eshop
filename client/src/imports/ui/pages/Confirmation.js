import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {connect} from  "react-redux"
import PropTypes from 'prop-types';
import {confirmTransaction} from '../../redux/actions/productAction'
let summ = 0
 class Confirmation extends Component {
  constructor(props){
    super(props)
    this.state={
      summ:0}
  }
  onConfirm(id){
    this.props.confirmTransaction(id)
    this.props.history.push('/thank-you')
  }
  render() {
    const {loading} =this.props.products
    let content =<div/>  
    if(!loading){
      const {userCart} =this.props.products
      content = (<div>
        <h2>#{userCart._id}</h2>
        {userCart.cart.map(item => {
          summ += item.quantity*item.price
          return <div key={item._id} className="row"><div className="col-md-8">{item.name}</div><div className="col-md-2">{item.quantity}</div><div className="col-md-2">{item.price}</div></div>
        })}
        <h5>Total: {summ}</h5>
        <button onClick={this.onConfirm.bind(this, userCart._id)} className="btn btn-primary">Confirmation</button>
        <Link to="/" className="btn btn-secondary">Cancel</Link>
      </div>)
    }
    return (
      <div>
      {content}
      </div>
    )
  }
}
Confirmation.propTypes = {
  userCart: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  confirmTransaction:PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  products: state.products,
  errors:state.errors
});
export default connect(mapStateToProps,{confirmTransaction})(Confirmation)