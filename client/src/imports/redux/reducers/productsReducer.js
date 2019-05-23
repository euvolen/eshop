import {
  GET_PRODUCTS,
  LOADING,
  GET_PRODUCT,
  ADD_TO_CART,
  CLEAR_USERCART,
  CLEAR_CART,
  REMOVE_FROM_CART,
  CHANGE_CART,
  UPDATE_USERCART
} from '../actions/types';

const initialState = {
  products: [],
  product: {},
  userCart: {},
  cart: [],
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
        case UPDATE_USERCART:
          return {
            ...state,
            userCart: action.payload,
              loading: false
          }
          case ADD_TO_CART:
            return {
              ...state,
              cart: [action.payload,...state.cart],
                loading: false
            }
           
              case CLEAR_USERCART:
                return {
                  ...state,
                  userCart: {
                    cart: []
                  }
                }
                case CLEAR_CART:
                  return {
                    ...state,
                    cart: []
                  }
                  
                  case CHANGE_CART:
                    const updatedCart = state.cart.concat()
                    for (const i in updatedCart) {
                      if (updatedCart[i].productId === action.payload.productId) {
                        if (action.payload.operator === '+') {
                          updatedCart[i].quantity++
                        } else {
                          if (updatedCart[i].quantity > 1)
                            updatedCart[i].quantity--
                            else{
                              updatedCart.splice(i,1)
                            }
                        }
                      }
                    }
                    return {
                      ...state,
                      cart: state.cart,
                        loading: false
                    }
                    case REMOVE_FROM_CART:
                      return {
                        ...state,
                        cart: state.cart.filter(item => item.productId !== action.payload),
                          loading: false
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