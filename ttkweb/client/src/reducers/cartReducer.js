import {ADD_TO_CART,CLEAR_CART,UPDATE_CART} from '../actions/types'
export default function(state=[],action){
  switch(action.type){
    case ADD_TO_CART:
      return [...action.payload];
    case UPDATE_CART:
      return [...action.payload]
    case CLEAR_CART:
      return action.payload;
      default:
      return state;
  }
}