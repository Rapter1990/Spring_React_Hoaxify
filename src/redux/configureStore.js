import authReducer from './authReducer';
// 283 ) LocalStorage tüm bilgilerin görünmemesi için SecureLS kullandık
import SecureLS from 'secure-ls';

import { createStore, applyMiddleware, compose } from 'redux';

// 293 ) async olayları işlemek için thunk kullandık
import thunk from 'redux-thunk';

import { setAuthorizationHeader } from '../api/apiCalls';


// 251 ) loggedInState tanımladık
/*const loggedInState = {
  isLoggedIn: true,
  username: 'user1',
  displayName: 'display1',
  image: null,
  password: 'P4ssword'
};*/

// 284 ) secureLs objesini oluşturduk
const secureLs = new SecureLS();

// 252 ) configureStore tanımladık
//const configureStore = () => {

  // 278 ) localStorage hoax-auth aldık
  //const hoaxAuth = localStorage.getItem('hoax-auth');

// 284 ) getStateFromStorage methodu oluşturduk 
const getStateFromStorage = () => {

  // 285 ) hoax-auth secureLs 'ten aldık
  const hoaxAuth = secureLs.get('hoax-auth');  

  // 279 ) stateInLocalStorage tanımladık
  let stateInLocalStorage = {
    isLoggedIn: false,
    username: undefined,
    displayName: undefined,
    image: undefined,
    password: undefined
  };

  // 280 ) hoaxAuth varsa onda döndür
  if (hoaxAuth) {
      return hoaxAuth; // 286 ) Hata olduğunda hoaxAuth döndürecek
  }
    // 287 ) İşlem bittiğinde stateInLocalStorage döndür
    return stateInLocalStorage; 
}

  // 288 ) updateStateInStorage tanımladık
  const updateStateInStorage = newState => {
    secureLs.set('hoax-auth', newState);
  };

  // 281 ) store oluşturduk
  /*const store = createStore(authReducer, 
                            stateInLocalStorage, 
                            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
                           );*/

  // 288 )  configureStore tanımladık
  const configureStore = () => {

    // 381 ) initialState belirleyip setAuthorizationHeader ile atadık (sayfayıyı yenilediğimizde login olan user görememek için)
    const initialState = getStateFromStorage();
    setAuthorizationHeader(initialState);

      // 294 ) store oluşturduk. Google Chrome Redux Developer Extension da bunu görebiliyoruz.
      const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
      const store = createStore(authReducer, initialState, composeEnhancers(applyMiddleware(thunk)));
                        

      // 282 ) store subscribe ederek store alıp hoax-auth assign et                     
      store.subscribe(() => {
        // localStorage.setItem('hoax-auth', JSON.stringify(store.getState()));

        // 289 ) updateStateInStorage ile storedaki state update ettik
        updateStateInStorage(store.getState());

        // 382 ) duruma göre setAuthorizationHeader ile state belirledik.(login veya değil)
        setAuthorizationHeader(store.getState());
      });

  return store;
};

// 253 ) configureStore export ederek erişim sağladık.
export default configureStore;