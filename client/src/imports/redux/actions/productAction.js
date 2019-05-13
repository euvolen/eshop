import axios from 'axios';
import {
  GET_ERRORS,
  GET_PRODUCTS,
  LOADING,
  GET_PRODUCT,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART,
  CLEAR_USERCART,
  CLEAR_CART,
  CHANGE_CART,
  UPDATE_USERCART
} from './types';

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
export const confirmTransaction = (id) => dispatch => {
  dispatch(setLoading())
  axios
    .post(`/api/actions/confirm/${id}`)
    .then(res => dispatch({
      type: CLEAR_USERCART,
      payload: {cart:[]}
    }))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
export const getUserCart = () => dispatch => {
  dispatch(setLoading())

  axios
    .get(`/api/actions/`)
    .then(res => dispatch({
      type: UPDATE_USERCART,
      payload: res.data
    }))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      })
    );

};
export const addToUserCart = (product, userId) => dispatch => {
  dispatch(setLoading())
  axios
    .post(`/api/actions/${userId}`, product)
    .then(res => dispatch({
      type: UPDATE_USERCART,
      payload: res.data
    }))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    )


};

export const change = (productId, operator, cartId) => dispatch => {
  dispatch(setLoading())
  if (!cartId)
    dispatch({
      type: CHANGE_CART,
      payload: {
        productId: productId,
        operator: operator
      }
    })
  else {
    console.log(cartId);
    
    axios
    .post(`/api/actions/cart/${cartId}`, {
      productId,
      operator
    })
    .then(res => {
      dispatch({
        type: UPDATE_USERCART,
        payload: res.data
      })
    })}
};


export const addToCart = (product) => dispatch => {
  dispatch(setLoading())
  dispatch({
    type: ADD_TO_CART,
    payload: product
  })
}

export const updateCart = (cart, userId) => dispatch => {
  dispatch(setLoading())
  if (userId) {
    axios
      .post(`/api/actions/${userId}`, {
        cart
      })
      .then(res => dispatch({
        type: UPDATE_USERCART,
        payload: res.data
      }))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );

  } else {
    dispatch({
      type: UPDATE_CART,
      payload: cart
    })
  }

};

export const removeFromCart = (productId, cartId) => dispatch => {
  dispatch(setLoading())
  if (cartId) {
    axios
      .post(`/api/actions/cart/product/${cartId}`, {
        productId
      })
      .then(res => dispatch({
        type: UPDATE_USERCART,
        payload: res.data
      }))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );

  } else {
    dispatch({
      type: REMOVE_FROM_CART,
      payload: productId
    })
  }
}
export const clearUserCart = () => dispatch => {
  dispatch({
    type: CLEAR_USERCART
  })
};
export const clearCart = () => dispatch => {
  dispatch({
    type: CLEAR_CART
  })
};
export const setLoading = () => {
  return {
    type: LOADING
  }
}