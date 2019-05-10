import axios from 'axios';
import { GET_ERRORS, GET_PRODUCTS } from './types';

// Register User
export const getProducts = () => dispatch => {
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