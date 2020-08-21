import React, { useState, useEffect, useRef } from 'react';
import logo from '../assets/hoaxify.png';
import { Link } from 'react-router-dom';
//import { withTranslation } from 'react-i18next';

// 223 ) Redux kullanacağımız için AuthenticationContext Kaldırdık 
// import { Authentication } from '../shared/AuthenticationContext';

// 239 ) connect import ettik
//import { connect } from 'react-redux';

// 334 ) withTranslation ve connect kullanmayarak hook un useTranslation,useDispatch ve useSelector özelliğini kullandık.
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

// 259 ) logoutSuccess import ettik
import { logoutSuccess } from '../redux/authActions';

import ProfileImageWithDefault from './ProfileImageWithDefault';

import { useHistory } from "react-router-dom";

// 176 ) TopBar Component oluşturduk(stateful olacak -> kullanıcıın login olup olmasına göre değişecek)
// 316 ) Hook kullandığımız için Component gerek kalmadı.
const TopBar = props => {

  // 186 ) Login olduktan sonra durumun değişmesi için state tanımladık ve isLoggedIn ve username tanımladık
  // 318 ) state gerek kalmadı
  /*state = {
    isLoggedIn: true,
    username: 'user1'
  };*/

  // 208 ) AuthenticationContext prop kısımları alabilmek için tanımladık
  // 224 ) Redux kullanacağımız için AuthenticationContext Kaldırdık 
  // static contextType = Authentication;


  // 240 ) onClickLogout tanımladık
  // 257 ) onClickLogout olayını authActions.js kısmında tanımladık

  // render() {
    // 177 ) props'tan t değerini aldık.
    // const { t } = this.props;

    // 187 ) state 'den isLoggedIn ve username aldık
    // const { isLoggedIn, username } = this.state;

    // 195 ) props'tan gelen t, isLoggedIn, username, onLogoutSuccess değerleri aldık
    //const { t, isLoggedIn, username, onLogoutSuccess } = this.props;

    // 209 )  t, isLoggedIn, username, onLogoutSuccess props , context ve state'den aldık
    // 225 ) Değişkenleri bu şekilde aldık
    //const { t } = this.props;
    //const { state, onLogoutSuccess } = this.context;
    //const { isLoggedIn, username } = state;

    //const onLogoutSuccess = () => {};
    //const isLoggedIn = false;
    //const username = undefined;

    // 241 ) t, username, isLoggedIn props'tan alarak tanımladık
    // 260 ) onLogoutSuccess olayınıda ekledik
    // 317 ) Hook kullandığımız için props alacağız. 
    //const { t, username, isLoggedIn, onLogoutSuccess } = props;

    // 335 ) props yerine t yi useTranslation aldık.
    const { t } = useTranslation();

    let history = useHistory();

    // 335 ) username ve isLoggedIn props yerine t yi useSelector aldık.
    // 455 ) displayName, image ek olarak ekledik
    const { username, isLoggedIn , displayName, image } = useSelector(store => ({
      isLoggedIn: store.isLoggedIn,
      username: store.username,
      displayName: store.displayName,
      image: store.image
    }));

    // 457 ) menuArea oluşturduk
    const menuArea = useRef(null);

    // 458 ) useState ile menuVisible değişkeni oluşturup false yaptık
    const [menuVisible, setMenuVisible] = useState(false);
  
    // 459 ) isLoggedIn işlemine göre menuClickTracker çağırma(add) sonra silme(remove)
    useEffect(() => {
      document.addEventListener('click', menuClickTracker);
      return () => {
        document.removeEventListener('click', menuClickTracker);
      };
    }, [isLoggedIn]);
  
    // 460 ) menu yok etme işlemi
    const menuClickTracker = event => {
      if (menuArea.current === null || !menuArea.current.contains(event.target)) {
        setMenuVisible(false);
      }
    };

    // 336 ) dispatch yapabilmek için useDispatch kullandık
    const dispatch = useDispatch();

    // 337 ) onLogoutSuccess işlemini dispatch ile yaptık.
    const onLogoutSuccess = () => {
      dispatch(logoutSuccess());
      history.push("/");
    };

    // 188 ) link tanımladıyıp Login ve Sign Up burada tanımladık
    let links = (
      <ul className="navbar-nav ml-auto">
        <li>
          {/* 179 ) Link oluşturduk */}
          <Link className="nav-link" to="/login">
            {t('Login')}
          </Link>
        </li>
        <li>
          {/* 180 ) Link oluşturduk */}
          <Link className="nav-link" to="/signup">
            {t('Sign Up')}
          </Link>
        </li>
      </ul>
    );



    {/* 190 ) Login olduğunda burası çalışacak */}
    if (isLoggedIn) {

      // 461 ) dropDownClass göstermek için show ekledik
      let dropDownClass = 'dropdown-menu p-0 shadow';
      if (menuVisible) {
        dropDownClass += ' show';
      }

      links = (
        <ul className="navbar-nav ml-auto" ref={menuArea}>  
          {/* 196 ) onClick olduğunda App deki onLogoutSuccess methodu çalışacak */}
          {/* <li className="nav-link" onClick={onLogoutSuccess} style={{ cursor: 'pointer' }}> */}

          {/* 242 ) onClick olduğunda App deki onClickLogout methodu çalışacak */}
          {/* 261 ) onLogoutSuccess çalışacak */}

          {/* 456 ) 261 deki işlemi linkleri silip yerine dropdown kullandık.*/}
          <li className="nav-item dropdown" >
              <div className="d-flex" style={{ cursor: 'pointer' }} onClick={() => setMenuVisible(true)}>
                <ProfileImageWithDefault image={image} width="32" height="32" className="rounded-circle m-auto" />
                <span className="nav-link dropdown-toggle">{displayName}</span>
              </div>
              <div className={dropDownClass}>
                <Link className="dropdown-item d-flex p-2" to={`/user/${username}`}  onClick={() => setMenuVisible(false)}>
                  <i className="material-icons text-info mr-2">person</i>
                  {t('My Profile')}
                </Link>
                <span className="dropdown-item  d-flex p-2" onClick={onLogoutSuccess} style={{ cursor: 'pointer' }}>
                  <i className="material-icons text-danger mr-2">power_settings_new</i>
                  {t('Logout')}
                </span>
              </div>
          </li>
        </ul>
      );
    }


    return (
      <div className="shadow-sm bg-light mb-2"> {/* shadow-sm-> arka plana biraz gölge ekler , 
                                                    mb-2 -> biraz margin bırakır. , 
                                                    bg-light -> container yazdıktan sonra kenarlarda beyaz oluşru onu engellemek için bunu yazdık
                                                */ }
        <nav className="navbar navbar-light container navbar-expand"> {/* navbar-expand -> ul yazılanları yanyana gösterir */}
          {/* 178 ) Link oluşturduk */}
          <Link className="navbar-brand" to="/">
            <img src={logo} width="60" alt="Hoaxify Logo" />
            Hoaxify
          </Link>
    
          {/* 189 ) link varaible buraya tanımladık */}
          {links}
        </nav>
      </div>
    );
}


// 243 ) Define TopBarWithTranslation
//const TopBarWithTranslation = withTranslation()(TopBar);

// 244 )  store daki bilgiyi alabilmek için mapStateToProps tanımladık
/*const mapStateToProps = store => {
  return {
    isLoggedIn: store.isLoggedIn,
    username: store.username
  };
};*/

// 262 ) mapDispatchToProps çağırdık
/*const mapDispatchToProps = dispatch => {
  return {
    onLogoutSuccess: () => dispatch(logoutSuccess())
  };
};*/

// 181 ) withTranslation() LanguageSelector kullanarak i18n etkinleştirdik
//export default withTranslation()(TopBar);

// 245 ) connect ile mapStateToProps ve TopBarWithTranslation
// 263 ) mapDispatchToProps ekledik
//export default connect(mapStateToProps,mapDispatchToProps)(TopBarWithTranslation);



// 338 ) connect yerine dispatch kullanarak  TopBar export ettik
export default TopBar;