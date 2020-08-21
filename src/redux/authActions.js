import * as ACTIONS from './constants';
import { login, signup } from '../api/apiCalls';

// 258 ) onClickLogout  tanımladık
export const logoutSuccess = () => {
    return {
      // 274 ) Type kısmını constants taki success aldık
      type: ACTIONS.LOGOUT_SUCCESS
    };
};

// 275 ) loginSuccess authState parametresini alarak işlemi yaptık.
export const loginSuccess = authState => {
  return {
    type: ACTIONS.LOGIN_SUCCESS,
    payload: authState
  };
};

// 290 ) Login işlemi tek bir methodda (async olarak) yaptık
export const loginHandler = credentials => {
  return async function(dispatch) {
    const response = await login(credentials);
    const authState = {
      ...response.data,
      password: credentials.password
    };
    dispatch(loginSuccess(authState));
    return response;
  };
};

// 295 ) Sign Up işlemini buraya aldık.
export const signupHandler = user => {
  return async function(dispatch) {
    const response = await signup(user);
    await dispatch(loginHandler(user));
    return response;
  };
};

// 461 ) update Success işlemi yaptık
export const updateSuccess = ({ displayName, image }) => {
  return {
    type: ACTIONS.UPDATE_SUCCESS,
    payload: {
      displayName,
      image
    }
  };
};
