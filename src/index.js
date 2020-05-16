import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// 23 ) bootstrap.override buradaya import ettik
import './bootstrap-override.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
// 4 )  UserSignupPage buraya import ettik
import UserSignupPage from './pages/UserSignUpPage';
// 58 ) i18n buraya import ettik
import './i18n/i18n';

// 5 ) render içinde <UserSignupPage  /> tanımladık. 
ReactDOM.render(
    <UserSignupPage  />,document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
