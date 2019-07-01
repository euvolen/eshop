import axios from 'axios';
import { GET_ERRORS, TRANSACTION_ADMIN, PRODUCTS_ADMIN, PRODUCT_ADMIN } from './types';
import { setLoading } from './productAction';


// Redux action
export const uploadSuccess = (data)  => {
    return {
      type: 'UPLOAD_DOCUMENT_SUCCESS',
      payload:data,
    };
  }
  
  export const uploadFail = (error)  => {
    return {
      type: 'UPLOAD_DOCUMENT_FAIL',
      payload:error,
    };
  }
  
  export const uploadDocumentRequest = (file) => dispatch => {  
    let data = new FormData()
    data.append('file', file)
    //dispatch(setLoading())
    axios.post(`/api/products/product/img`, data)
        .then(response => console.log(response.data) )
        .catch(error => console.log(error))
    }
  