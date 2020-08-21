import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// 23 ) bootstrap.override buradaya import ettik
import './bootstrap-override.scss';
import App from './container/App';
import * as serviceWorker from './serviceWorker';


// 4 )  UserSignupPage buraya import ettik
//import UserSignupPage from './pages/UserSignUpPage';
// 58 ) i18n buraya import ettik
import './i18n/i18n';
// 79 ) LoginPage buraya import ettik
//import LoginPage from './pages/LoginPage';
// 94 ) LanguageSelector buraya import ettik
//import LanguageSelector from './components/LanguageSelector';
// 144 ) ApiProgress iport ettik
//import ApiProgress from './shared/ApiProgress';

// 228 ) Redux kullanacağımız için AuthenticationContext Kaldırdık 
// 314 ) Hook kullandığımız için AuthenticationContext gerek kalmadı.
// import AuthenticationContext from './shared/AuthenticationContext';

// 233 ) Provider ve createStore import ettik.
// 254 ) createStore sildik.
import { Provider } from 'react-redux';

// 255 ) createStore import ettik
import configureStore from './redux/configureStore';


// 5 ) render içinde <UserSignupPage  /> tanımladık. 
/*ReactDOM.render(
    <UserSignupPage  />,document.getElementById('root')
    
);*/

// 80 ) Login Page işlemler yapacağmız için UserSignupPage comment out yaptık.
// 95 )  Buraya LoginPage ve LanguageSelector public index.html deki "root" div içine dahil ettik 


{/* 147 ) App.js de yapacağımız için bu kısmı comment out aldık   
ReactDOM.render(
    <div>
         127 ) LoginPage comment out aldık
        <LoginPage />
         145 ) LoginPage comment out aldık alıp ApiProgress içinde UserSignupPage tanımladık
        <ApiProgress>
            <UserSignupPage />
        </ApiProgress>
        <LanguageSelector />      
    </div>,

    document.getElementById('root')
);
*/}

// 234 ) loggedInState tanımladık
// 250 ) loggedInState configureStore.js kısımda tanımladık

// 235 ) defaultState tanımladık
// 249 ) reducer authReducer.js kısımda tanımladık


// 236 ) reducer tanımladık
// 245 ) reducer authReducer.js kısımda tanımladık


// 237 ) store tanımladık
// 256 ) configureStore çağırdık
const store = configureStore();

{/* 148 ) index.js deki UserSignupPage ve LoginPage burada aldık  */}
{/* 207 ) AuthenticationContext wrap ettik */}
ReactDOM.render(
    // 229 ) AuthenticationContext sildik
    // <AuthenticationContext>
    //   <App />
    // </AuthenticationContext>,

    // 238 ) Provider içerisine App tanımladık
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
