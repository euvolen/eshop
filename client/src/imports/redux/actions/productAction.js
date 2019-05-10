import axios from 'axios';
import { GET_ERRORS, GET_PRODUCTS, LOADING, GET_PRODUCT } from './types';

// Register User
export const getProducts = () => dispatch => {
  dispatch(setLoading())
    axios
      .get('/api/products/all')
      .then(res => dispatch({
        type: GET_PRODUCTS,
        payload: res.data
      }))
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
        .get(`/api/products/${id}`)
        .then(res => dispatch({
          type: GET_PRODUCT,
          payload: res.data
        }))
        .catch(err =>
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          })
        );
    };
  export const setLoading = () => {return {type:LOADING}}