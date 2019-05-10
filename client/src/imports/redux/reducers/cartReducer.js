import isEmpty from '../../utils/is-empty';

import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/types';

const initialState = {
 cart:[]
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cart: [action.payload, ...state.cart]
      };
      case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(product => product.id !==action.payload)
      };
    default:
      return state;
  }
}