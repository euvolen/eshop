import axios from 'axios';
import { GET_ERRORS, TRANSACTION_ADMIN, PRODUCTS_ADMIN, PRODUCT_ADMIN } from './types';
import { setLoading } from './productAction';


export const getTransactions = () => dispatch => {
    dispatch(setLoading())
    axios
      .get('/api/admin/actions')
      .then(res => dispatch({type:TRANSACTION_ADMIN, payload: res.data}))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };
  export const createProduct = (product) => dispatch => {
    dispatch(setLoading())
    axios
      .post(`/api/products/product/add`, product)
      .then(res => console.log(res.data))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };
  export const getProducts = () => dispatch => {
    dispatch(setLoading())
    axios
      .get('/api/admin/products')
      .then(res => dispatch({type:PRODUCTS_ADMIN, payload: res.data}))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };
  export const getProduct = (id) => dispatch => {
    dispatch(setLoading())
    axios
      .get(`/api/admin/product/${id}`)
      .then(res => dispatch({type:PRODUCT_ADMIN, payload: res.data}))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };
  export const changeCategory = (data) => dispatch => {
    dispatch(setLoading())
    axios
      .post('/api/category/product', data)
      .then(res => dispatch(getProducts()))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };