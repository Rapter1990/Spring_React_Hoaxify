import * as ACTIONS from './constants';

// 246 ) defaultState tanımladık
const defaultState = {
    isLoggedIn: false,
    username: undefined,
    displayName: undefined,
    image: undefined,
    password: undefined
};
  
// 247 ) authReducer tanımladık
const authReducer = (state = { ...defaultState }, action) => {
    // 276 ) ACTIONS taki LOGOUT_SUCCESS alarak type assign ettik
    if (action.type === ACTIONS.LOGOUT_SUCCESS) {
        return defaultState;
    // 277 ) ACTIONS taki LOGIN_SUCCESS alarak type assign ettik
    } else if (action.type === ACTIONS.LOGIN_SUCCESS) {
        return {
          ...action.payload,
          isLoggedIn: true
        };
    // 462 ) ACTIONS taki UPDATE_SUCCESS alarak type assign ettik   
    } else if (action.type === ACTIONS.UPDATE_SUCCESS) {
        return {
          ...state,
          ...action.payload
        };
      }

    return state;
};

// 248 ) authReducer export ederek erişim sağladık.
export default authReducer;