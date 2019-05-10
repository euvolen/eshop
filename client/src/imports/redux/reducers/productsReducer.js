import isEmpty from '../../utils/is-empty';

import { GET_PRODUCTS, LOADING, GET_PRODUCT,ADD_TO_CART,REMOVE_FROM_CART } from '../actions/types';

const initialState = {
 products:[],
 product:{},
 cart:[],
 loading:false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        loading:false
      }
      case GET_PRODUCT:
      return {
        ...state,
        product: action.payload,
        loading:false
      }
      case ADD_TO_CART:
      return {
        ...state,
        cart: [action.payload, ...state.cart]
      }
      case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(product => product.id !==action.payload)
      }
    case LOADING:
      return{
          ...state,
          loading:true
      }
    default:
      return state;
  }
}
