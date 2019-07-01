import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProduct, createProduct } from '../../redux/actions/adminAction';
import { getCategories, } from '../../redux/actions/productAction';
import { uploadDocumentRequest } from '../../redux/actions/uploadActions';
import TextFieldGroup from '../components/common/TextFieldGroup';
import TextAreaFieldGroup from '../components/common/TextAreaFieldGroup';
import SelectListGroup from '../components/common/SelectListGroup';

class NewProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      gross_price: '',
      net_price: '',
      initial_price: '',
      category:'',
      file:{},
      err: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  }
  componentDidMount(){
      this.props.getProduct()
      this.props.getCategories()
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

 onSubmit(e){
   e.preventDefault()
   const {file} = this.state
   const {
    name,
    description,
    gross_price,
    net_price,
    initial_price,
    category,
  
  } = this.state
   const product = {
     name,
     description,
     gross_price,
     net_price,
     initial_price,
     category,
     img:file.name
   }
   console.log(file, product)
   //this.props.uploadDocumentRequest(file)
   this.props.createProduct(product)

 }

 handleFileUpload() {
   console.log(this)
  const file = document.getElementById('file').files[0]
  if(file.type.split('/')[0]==='image'){
    this.setState({file})
  }
}
  render() {
    const { err, name, description, initial_price, gross_price, net_price, category } = this.state;
    const{loading} = this.props.products
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Add new product
              </p>
              <form noValidate onSubmit={this.onSubmit}>
              <TextFieldGroup
              type="text"  
              value={name}
              onChange={this.onChange} 
              placeholder="Name of a new product"  
              name="name"
              err={err.name}
            />
              <TextAreaFieldGroup 
              type="text" 
              value={description}
              onChange={this.onChange} 
              placeholder="description of a new product" 
              name="description"
              err={err.description}
              info= "This site uses Gravatar so if you want a profile image, use a Gravatar email" 
              />
                  <TextFieldGroup 
              type="text" 
              value={gross_price}
              onChange={this.onChange} 
              placeholder="Gross price" 
              name="gross_price"
              err={err.gross_price} 
              />
             <TextFieldGroup 
              type="text" 
              value={initial_price}
              onChange={this.onChange} 
              placeholder="Initial price" 
              name="initial_price"
              err={err.initial_price} 
              />
               <TextFieldGroup 
              type="text" 
              value={net_price}
              onChange={this.onChange} 
              placeholder="Net price" 
              name="net_price"
              err={err.net_price} 
              />
              <SelectListGroup name='category' value={category} onChange={this.onChange} options={this.props.products.categories}/>
                 <input type="file" id="file" onChange={this.handleFileUpload.bind(this)} />
                <input type="submit"  className="btn btn-info btn-block mt-4"/>
              </form>
           
            </div>
          </div>
        </div>
      </div>
    );
  }
}

NewProduct.propTypes = {
  getCategories:PropTypes.func.isRequired,
  getProduct:PropTypes.func.isRequired,
  uploadDocumentRequest:PropTypes.func.isRequired,
  createProduct:PropTypes.func.isRequired,
  products: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  products: state.products,
  errors: state.errors
});

export default connect(mapStateToProps, { getCategories, getProduct, uploadDocumentRequest, createProduct })(withRouter(NewProduct));

  
// Component render
