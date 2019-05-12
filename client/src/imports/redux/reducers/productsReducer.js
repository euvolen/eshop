import isEmpty from '../../utils/is-empty';

import {
  GET_PRODUCTS,
  LOADING,
  GET_PRODUCT,
  ADD_TO_CART,
  ADD_TO_USERCART,
  UPDATE_CART,
  GET_CART,
  GET_USERCART,
  CLEAR_USERCART,
  CLEAR_CART
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
        case GET_USERCART:
        return {
          ...state,
          userCart: action.payload,
            loading: false
        }
        case ADD_TO_CART:
          return {
            ...state,
            cart:action.payload
          }
          case ADD_TO_USERCART:
          return {
            ...state,
            userCart:action.payload
          }
          case CLEAR_USERCART:
          return {
            ...state,
            userCart:{cart:[]}
          }
          case CLEAR_CART:
          return {
            ...state,
            cart:[]
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