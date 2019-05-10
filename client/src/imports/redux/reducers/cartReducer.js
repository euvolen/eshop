import isEmpty from '../../utils/is-empty';

import { GET_PRODUCTS } from '../actions/types';

const initialState = {
 cart:[]
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        cart: action.payload
      };
    default:
      return state;
  }
}