import {
    SET_SIGNIN_MODAL
  } from '../actions/index';
import { initialState } from './intialState';
  
  const itemReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_SIGNIN_MODAL :
        return Object.assign({}, state, {
          isSigninModalOpen: action.payload,
        });
  
      default:
        return state;
    }

    
  };
  
  export default itemReducer;