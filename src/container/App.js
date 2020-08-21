import React from 'react';
//import ApiProgress from '../shared/ApiProgress';
import UserSignupPage from '../pages/UserSignUpPage';
import LoginPage from '../pages/LoginPage';
import LanguageSelector from '../components/LanguageSelector';
import HomePage from '../pages/HomePage';
import UserPage from '../pages/UserPage';
// 174 ) react-router-dom install ettik
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import TopBar from '../components/TopBar';
//import { connect } from 'react-redux';

// 339 ) connect yerine hook ta useSelector işlemini kullandık
import { useSelector } from 'react-redux';

// 226 ) Redux kullanacağımız için AuthenticationContext Kaldırdık 
// import { Authentication } from '../shared/AuthenticationContext';

{/* 146 ) index.js deki UserSignupPage ve LoginPage burada aldık */ }
{/* 175 ) HashRouter switch ile route olayını yaptık */ }
// 190 ) State durumu yukarıya (App'te tanımladık) state duruma göre değiştirmek için

// 340 ) App Component yerine Function olarak tanımladık (render sildik)
const App = () => {

  // 203) AuthenticationContext kısmında tanımlayacağımız için buna gerek kalmadı.

  // 191 ) Login olduğunda username parametre olarak alıp state deki username assign edecek ve isLoggedIn true yapacak
  // 204) AuthenticationContext kısmında tanımlayacağımız için buna gerek kalmadı.

  // 192 ) Logout olduğunda isLoggedIn false , username undefined olarak tanımladık
  // 205) AuthenticationContext kısmında tanımlayacağımız için buna gerek kalmadı.

  // 206) Authentication contextType atadık
  // 227 ) Redux kullanacağımız için AuthenticationContext Kaldırdık 
  // static contextType = Authentication;


    // 211 ) context içindeki state'den isLoggedIn aldık
    // 227 ) Redux dolayı false yaptık 
    // const isLoggedIn = false;

    // 267 ) isLoggedIn propstan aldık
    // 341 ) isLoggedIn deki işlemi isLoggedIn useSelector ile aldık
    const { isLoggedIn } = useSelector(store => ({
      isLoggedIn: store.isLoggedIn
    }));

    return (
      <div>
        <Router>
          {/* 193 ) Topbar da username, isLoggedIn ve onLogoutSuccess renderda props olarak alacağı için buraya tanımladık*/ }
          {/* 212 ) proplar artık Authentication alınacağı için buradaki propslara gerek kalmadı */ }
          <TopBar/>
          <Switch>
            <Route exact path="/" component={HomePage} />
            {/* 194 ) isLoggedIn olmadığında Login çıkacak */}
            {/* 213 ) proplar artık Authentication alınacağı için buradaki propslara gerek kalmadı */ }
            {!isLoggedIn && <Route path="/login" component={LoginPage} />}

            <Route path="/signup" component={UserSignupPage} />

            {/* 214 ) proplar artık Authentication alınacağı için buradaki propslara gerek kalmadı */ }
            <Route path="/user/:username" component={UserPage} />

            <Redirect to="/" />

          </Switch>
        </Router>
        <LanguageSelector />
      </div>
    );
  
}

// 268 ) mapStateToProps methodu store parametresiyle çağırdık
/*const mapStateToProps = store => {
  return {
    isLoggedIn: store.isLoggedIn
  };
};*/

// 269 ) App mapStateToProps ile isLoggedIn alarak connect sağladık
//export default connect(mapStateToProps)(App);


// 342 ) connect kullanmadan useSelector kullanarak App export ettik 
export default App;
