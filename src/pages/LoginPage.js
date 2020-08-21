// 73 ) LoginPage.js dosyasını oluşturduk ve React Component ve Input import ettik
// import React, { Component } from 'react';

import Input from '../components/Input';
// 81 ) tr and en language olayı withTranslation import ettik
// import { withTranslation } from 'react-i18next';
// 102 ) apiCalls 'dan login function buraya import ettik.
import { login } from '../api/apiCalls';
// 110 ) axios import ettik
import axios from 'axios';
// 120 ) ButtonWithProgress import ettik
import ButtonWithProgress from '../components/ButtonWithProgress';

// 161 ) withApiProgress tanımladık
// 356 ) withApiProgress yerine useApiProgress tanımladık
import { useApiProgress } from '../shared/ApiProgress';

// 230 ) Redux kullanacağımız için AuthenticationContext Kaldırdık 
// 315 ) Hook kullanacağımız için AuthenticationContext Kaldırdık 
// import { Authentication } from '../shared/AuthenticationContext';

// import { connect } from 'react-redux';
// import { loginSuccess } from '../redux/authActions';

import { loginHandler } from '../redux/authActions';


// 343 ) withTranslation ve connect yerine hook ta bulunan useTranslation ve useDispatch kullandık
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';


// 303 ) LoginPage artık Hook kullanmak için useState, useEffect react tan aldık
import React, { useState, useEffect } from 'react';

// 74 ) LoginPage Component oluşturduk.

// class LoginPage extends Component {

// 304 ) Hook yapısında göre LoginPage değiştik    
const LoginPage = props => {

    // 216 ) Authentication 'dan propları alabilmek için tanımladık
    // 231 ) Redux kullanacağımız için AuthenticationContext Kaldırdık 
    // static contextType = Authentication;

    // 76 ) Butun inputlar içeren bir tane state tanımladık
    // 102 ) Ekranda hata mesjını göstermek için state içinde "error" tanımladık 
    // 111 ) progress(loading) indicator işlemini yapacağımız için  
    // 141 ) pendingApiCall artık ApiProgress alacağımız için pendingApiCall gerek kalmadı onu sildik
    /*state = {
        username: null,
        password: null,
        error: null
    };*/

    // 305 ) state yapısını Hook bulunan useState ile yaptık
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();

    // 344 ) yönlendirmek için useDispatch tanımladık
    const dispatch = useDispatch();

    // 112 ) UserSignUpPage'daki loading işleminden farklı olarak componentDidMount methodunu tanımladık
    // componentDidMount bir tür lifeCycle
    // Ekrana gösterildiği durum , Güncellemin olduğu durum , Ekrandan çıkıldığı durum gibi
    // render() işleminden sonra çalışır
    // 142 ) componentDidMount artık ApiProgress alacağımız için componentDidMount buraya gerek kalmadı
    /*componentDidMount() {

        // 113 ) Button basıldıktan sonra(burada axios.interceptors.request işlemi) olduğunda pendingApiCall true yapıp request return ettil
        axios.interceptors.request.use(request => {
            this.setState({ pendingApiCall: true });
            return request;
        });


        // 114 ) İşlem başarılı veya başarısız olayı için axios.interceptors.response kulladındık 
        // response işlemi(başarılı ise) false yapıp return ettik 
        // error işlemi(başarısız ise) false yapıp return ettik 
        axios.interceptors.response.use(
            response => {
                this.setState({ pendingApiCall: false });
                return response;
            },
            error => {
                this.setState({ pendingApiCall: false });
                throw error;
            }
        );
    }*/

    // 77 ) Inputlara girdiğimizde name ve value olarak set edip "state" içerisine aldık (Hata mesajları için) 
    // 103 ) onChange methoduna da error çıktıktan sonra error div yok olması için onChange error tanımladık
    /*onChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
            error: null
        });
    };*/


    // 306 ) onChange yapısını Hook bulunan useEffect ile yaptık (username veya passwordde hatalı giriş olduğunda yenisi yazıldığında hata error gitmesi)
    useEffect(() => {
        setError(undefined);
    }, [username, password]);


    // 96 ) onClickLogin function tanımladık
    // 104 ) onClickLogin olayını async await ile yaptık başka requestler gelmemesi için
    //onClickLogin = async event => {

    // 307 ) onClickLogin yapısını Hook kullanarak tanımladık
    const onClickLogin = async event => {

        // 97 ) Sayfa yenilenmesini önlemek için preventDefault tanımladık  
        event.preventDefault();

        // 98 ) state gelen username ve password object destruct ile ayırdık.
        // 308 ) Hook kullanacağımız için state kullanmaya gerek yok.
        // const { username, password } = this.state;



        // 99 ) creds js objesine bunları assign ettik
        const creds = {
            username,
            password
        };

        // 197 ) App.js de <LoginPage {...props} onLoginSuccess={this.onLoginSuccess} 
        // onLoginSuccess methoddan gelen alıp onLoginSuccess atadık (props ta buluyor.) oradan onLoginSuccess aldık
        // 217 ) props artık Authentication'dan aldık.
        // 232 ) Redux dolayı onLoginSuccess şu şekilde tanımladık
        // const onLoginSuccess = () => {};



        // 184 ) props tan history kısmındaki push aldık.
        // 291 ) history 'ten artık history, dispatch aldık
        // const { history, dispatch } = this.props;

        // 309 ) Hook yapısını kullandığımız için this.props yapısını kullanmaya gerek direk props ile erişim sağladık
        // 345 ) dispatch hook useDispatch kullandığımız için dispatch sildik
        const { history} = props;

        const { push } = history;


        // 105 ) Hata çıktığında o hatanın kaybolması için setState error null yaptık(Yapmazsak hata mesajı sürekli orada kalır)
        /*this.setState({
            error: null
        });*/


        // 310 ) Hook kullandığımız için setState bulunan erroru setError ile yaptık 
        setError(undefined);

        // 106 ) login işlemini await ile yaptık
        try {

            // 218 ) Gelen değeri response atadık
            // const response = await login(creds);

            // 292 ) dispatch yaparak loginHandler çağırdık
            await dispatch(loginHandler(creds));

            // 185 ) Login olduktan sonra otomatik bir şekilde redirect yapabilmesi için push methodunu tanımladık.
            push('/');

            // 198 , 219 , 220 ve 270 sildik


        } catch (apiError) {
            /*this.setState({
                // 107 ) error olduğunda message error atayacak
                error: apiError.response.data.message
            });*/

            // 311 ) Hook kullandığımız için setState bulunan erroru setError ile yaptık 
            setError("Hatalı Giriş");
        }
    };

    // 312 ) Hook yapısını kullandığımız için artık rende fonksiyonuna gerek kalmadı.
    //const { t, pendingApiCall } = props;

    // 346 ) t değerini useTranslation ile pendingApiCall propstan aldık
    const { t } = useTranslation();

    // 357 ) değerini pendingApiCall useApiProgress'dan aldık
    // 427 ) pendingApiCall'deki useApiProgress 'post' ekledik
    const pendingApiCall = useApiProgress('post', '/api/1.0/auth');

    const buttonEnabled = username && password;

    // 313 ) event.target.value ile alıp onChange ile yaptık.
    return (
        <div className="container">
            <form>
                <h1 className="text-center">{t('Login')}</h1>
                <Input label={t('Username')} onChange={event => setUsername(event.target.value)} />
                <Input label={t('Password')} type="password" onChange={event => setPassword(event.target.value)} />
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="text-center">
                    <ButtonWithProgress onClick={onClickLogin} disabled={!buttonEnabled || pendingApiCall} pendingApiCall={pendingApiCall} text={t('Login')} />
                </div>
            </form>
        </div>
    );

    // // 75 )  LoginPage render işleminde(çağırıldığında) return html form yapısını gösterek
    // render() {
    //     // 82 ) i18n tanımlı olduğu propsdan t yi aldık.
    //     // 144 ) pendingApiCall artık ApiProgress alacağımız için oradaki props kısımdan pendingApiCall alacağız
    //     const { pendingApiCall, t } = this.props;

    //     // 108 ) state'den object destruct ile username, password, error aldık
    //     // 121 ) pendingApiCall object destruct ile aldık
    //     // 143 ) pendingApiCall artık ApiProgress alacağımız için pendingApiCall gerek kalmadı onu sildik
    //     const { username, password, error } = this.state;

    //     // 109 ) username ve password girildiyse button enabled yapayacak
    //     const buttonEnabled = username && password;

    //     return (
    //         <div className="container">
    //             <form>
    //                 {/* 83 )  label kısımları t tanılayıp i18n language olayını yaptık.*/}
    //                 <h1 className="text-center">{t('Login')}</h1>
    //                 <Input label={t('Username')} name="username" onChange={this.onChange} />
    //                 <Input label={t('Password')} name="password" type="password" onChange={this.onChange} />
    //                 {error && <div className="alert alert-danger">{error}</div>}
    //                 {/* 122 ) ButtonWithProgress tanımladık*/}
    //                 <div className="text-center">
    //                     <ButtonWithProgress
    //                         onClick={this.onClickLogin}
    //                         disabled={!buttonEnabled || pendingApiCall}
    //                         pendingApiCall={pendingApiCall}
    //                         text={t('Login')}
    //                     />
    //                 </div>
    //             </form>
    //         </div>
    //     );
    // }
}

// 78 ) LoginPage export ederek bu class erişim sağladık.
// 84 ) withTranslation() LoginPage kullanarak i18n etkinleştirdik
// export default withTranslation()(LoginPage);

// 162 ) LoginPageWithTranslation  tanımladık
// const LoginPageWithTranslation = withTranslation()(LoginPage);

// 163 ) withTranslation() LoginPage kullanarak i18n etkinleştirdik
//export default withApiProgress(LoginPageWithTranslation, '/api/1.0/auth');

// 271 ) mapDispatchToProps methodu dispatch parametresiyle çağırdık
// 289 ) mapDispatchToProps kaldırdık
/*const mapDispatchToProps = dispatch => {
    return {
      onLoginSuccess: authState => dispatch(loginSuccess(authState))
    };
};*/

// 272 ) LoginPageWithTranslation mapDispatchToProps ile onLoginSuccess alarak connect sağladık
// export default connect(null, mapDispatchToProps)(withApiProgress(LoginPageWithTranslation, '/api/1.0/auth'));


// export default connect()(withApiProgress(LoginPageWithTranslation, '/api/1.0/auth'));

// 347 ) connect yerine dispatch kullanarak  LoginPage export ettik
// export default withApiProgress(LoginPage, '/api/1.0/auth');

// 358 ) withApiProgress kullanmadan useApiProgress sayesinde LoginPage direk export ettik
export default LoginPage;
