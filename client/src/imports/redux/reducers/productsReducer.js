import isEmpty from '../../utils/is-empty';

import {
  GET_PRODUCTS,
  LOADING,
  GET_PRODUCT,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART,
  GET_CART
} from '../actions/types';

const initialState = {
  products: [],
  product: {},
  userCart: {},
  cart:[],
  loading: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
          loading: false
      }
      case GET_PRODUCT:
        return {
          ...state,
          product: action.payload,
            loading: false
        }
        case GET_CART:
        return {
          ...state,
          userCart: action.payload,
            loading: false
        }
        case ADD_TO_CART:
          return {
            ...state,
            userCart:action.payload
          }

              case LOADING:
                return {
                  ...state,
                  loading: true
                }
                default:
                  return state;
  }
}