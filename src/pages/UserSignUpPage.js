import React from 'react';
import axios from 'axios'; // 10 ) Http Request işlemleri için axios library yükledik. npm install axios
import { signup, changeLanguage } from '../api/apiCalls'; // 30 ) apiClass import edip signup kullanacağız // 71 ) changeLanguage burada kullanacağız
import Input from '../components/Input'; // 48 ) Input buraya import ettik
import { withTranslation } from 'react-i18next'; // 59 ) react-i18next dan withTranslation kullanacağız

// 1 ) UserSignupPage React.Component extends ederek class tanımladık.
class UserSignupPage extends React.Component {

    // 15 ) Gönderilecek Post url tanımladık.
    // 19 ) http://localhost:2211/ kısmı sürekli tanımlaycağımız için webpack olarak tanımladık.
    // package.json da "proxy" oluşturduk. 
    postUrl = '/api/1.0/users';

    // 7 ) Tüm inputlar girilmeden Sign up basılmasın diye ilk başta "state" objesi tanımladık.
    // içerisine tüm input alanları için değer tanımladık.
    // 24 ) pendingApiCall kullanıcılardan sadece bir request işlemi (Sign Up button bir kere basma)
    // 33 ) kullanıcıya hatalı veri girmeyi göstermek için error objesini spring tarafından gelen validationErrors(username,password, ...) için oluşturduk.
    state = {
        username: null,
        displayName: null,
        password: null,
        passwordRepeat: null,
        pendingApiCall: false,
        errors: {}
    };

    // 8 ) onChange methodu tanımlayarak girilen inputları name ve value olarak set edip "state" içerisine aldık.
    // username : "Ali" gibi...
    onChange = event => {

        // 61 ) i18n props kısmında "t" var burası i18n.jsdeki "en" ve "tr" işlemini yapmak için kullanacağız
        const { t } = this.props;

        // object destruct ile name ve value değerlerini aldık
        const { name, value } = event.target;

        // 33 ) State'den gelen errors objesinde herbir field(username,password gibi) alıp errors aktardık.(Kopyasını oluşturma)
        const errors = { ...this.state.errors };

        // 39) name den gelen key undefined olarak tanımladık. (Hata mesajı geldikten sonra inputlara bişey yazınca o gidiyor.)
        errors[name] = undefined;

        // 52 ) Password ve Repeat Password olayını kontrol etmek için bunu yazdık
        if (name === 'password' || name === 'passwordRepeat') {
            if (name === 'password' && value !== this.state.passwordRepeat) {
                // errors.passwordRepeat = 'Password mismatch';
                // 62 ) Password mismatch olayını t ile en ve tr olayına çevirdik
                errors.passwordRepeat = t('Password mismatch');
            } else if (name === 'passwordRepeat' && value !== this.state.password) {
                // 63 ) Password mismatch olayını t ile en ve tr olayına çevirdik
                errors.passwordRepeat = 'Password mismatch';
            } else {
                errors.passwordRepeat = undefined;
            }
        }

        // 34 ) gelen errors set ettik
        // Hata çıktıktan sonra düzeltme işleminde o hatasının gitmesi için bunu yaptık
        this.setState({
            [name]: value,
            errors
        });
    };

    // 72 ) Toggle(Tıklama) olayı için onChangeLanguage fonksiyonuna seçilen language gönderdik
    // i18n.changeLanguage(language) seçilen language göre fallbackLng: değiştirdik (Arayüzü labelları Türkçe yapmak için)
    // axios işlemi içinde seçilen language göre işlemler olacak (Hata mesajları için)
    onChangeLanguage = language => {
        const { i18n } = this.props;
        i18n.changeLanguage(language);
        changeLanguage(language);
    };

    // 11 ) onClickSignup methodu oluşturduk. 
    // 31 ) ApiCalls.js signup işlemini async await ile yaptık(asynchronous olarak tanımladık ). buraya async tanımladık
    // Nedeni bu http request bu işlemler bitmeden başka işlemlere geçmesin diye.
    // Örnek kaynak : https://medium.com/@isagul/javascriptte-async-await-kullan%C4%B1m%C4%B1-95be3d16b62a
    onClickSignup = async event => {
        // 12 ) Sign Up Button tıkladıktan sonra Sayfa yenilenmeyi önlemek için bunu tanımladık.
        event.preventDefault();

        // 13 ) state objesinde atanan(assign) edilen değerleri const değişkenlerine attık (username,displayName,password)
        const { username, displayName, password } = this.state;

        // 14 ) body js objesi tanımladık ve içerisine username,displayName,password koyduk.
        // const body = {
        //    username : username,
        //    displayName : displayName,
        //    password : password
        // };

        // 18 ) Yukarıdaki objede username,displayName,password key ve value kısmı aynı oldukları için 
        // sadece değişken olarakta tanımlanılabilir.
        const body = {
            username,
            displayName,
            password
        };

        // 25 ) Button basıldıktan sonra pendingApiCall true yaptık başka request girmemek için (Sign Up buuton disabled)
        this.setState({ pendingApiCall: true });

        // 16 ) body objesini bu address post methodu ile gönderdik.
        // 26 ) post methodu response ve error olayları ekledik. İşlem bitince (hata veya başarılı) pendingApiCall false yaptık.
        // async ve await kullanmayacaksak şu şekilde
        // onClickSignup = event => { ....
        /* signup(body)
            .then(response => {
                this.setState({ pendingApiCall: false });
            })
            .catch(error => {
                this.setState({ pendingApiCall: false });
            });
        */

        // 32 ) ApiCalls.js signup işlemini için await tanımladık (asynchronous olarak tanımladık ).
        // Nedeni bu http request bu işlemler bitmeden başka işlemlere geçmesin diye.
        // Örnek kaynak : https://medium.com/@isagul/javascriptte-async-await-kullan%C4%B1m%C4%B1-95be3d16b62a
        try {
            const response = await signup(body);
        } catch (error) {
            // 35 ) Backend tarafında gelen error yı (return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error))
            // burada sadece validationErrors alıp errors objesine aktarıyoruz. 
            if (error.response.data.validationErrors) {
                this.setState({ errors: error.response.data.validationErrors });
            }
        }

        this.setState({ pendingApiCall: false });
    }

    // 2 ) Render methodu tanımladık içindeki bilgileri return ile içeriğine ulaşmak için
    render() {

        // 33 ) Statedeki pendingApiCall buraya aldık.
        // 36) errors kısmını da buraya ekledik. 
        // state'deki değerleri object destruct ile ayırma
        const { pendingApiCall, errors } = this.state;

        // 37) errors kısmından username mi aldık.
        // 40 ) Spring validationerrorden gelen displayName'de buraya ekeldik ve object destruct yolu ile aldık. 
        // 51 ) errors 'den gelen password object destruct ile de aldık.
        // 53 ) passwordRepeat object destruct aldık
        const { username, displayName, password, passwordRepeat } = errors;

        // 64 ) i18n props kısmında "t" var burası i18n.jsdeki "en" ve "tr" işlemini yapmak için kullanacağız
        const { t } = this.props;
        return (
            // 6 ) Form tanımladık ve içerisine Username, Display Name, Password, Password Repeat ve Sign Up button tanımladık
            // 9 ) Her bir inputta "name" ve "onChange" tanımladık.
            // 20 ) bootstrap ve node-sass kurduk. Node-sass css dosyaları daha hızlı bir şekilde compile edebilmesi için
            // 21 ) Form bootstrap göre styling ettik

            <div className="container">
                <form>
                    {/* 65 ) Sign Up olayını t ile en ve tr olayına çevirdik */}
                    <h1 className="text-center">{t('Sign Up')}</h1>
                    {/*<div className="form-group">
                        <label>Username</label>
                         38) username error kısmını username field kısmına ekledik 
                        
                        <input className={username ? 'form-control is-invalid' : 'form-control'} 
                               name="username" onChange={this.onChange} />
                        <div className="invalid-feedback">{username}</div>
                    </div>
                    */}
                    {/*<div className="form-group">
                        <label>Display Name</label>
                         41) displayName error kısmını displayName field kısmına ekledik 
                        
                        <input className={displayName ? 'form-control is-invalid' : 'form-control'} 
                               name="displayName" onChange={this.onChange} />
                        <div className="invalid-feedback">{displayName}</div>
                    </div>
                    */}


                    {/* 48) Input.js tanımladığımız input buraya ekledik. */}
                    {/*<Input name="username" label="Username" error={username} onChange={this.onChange} />
                    <Input name="displayName" label="Display Name" error={displayName} onChange={this.onChange} />*/}

                    {/* 65 ) "label"deki Username ve Display Name   olayını t ile en ve tr olayına çevirdik */}
                    <Input name="username" label={t('Username')} error={username} onChange={this.onChange} />
                    <Input name="displayName" label={t('Display Name')} error={displayName} onChange={this.onChange} />

                    {/*<div className="form-group">
                        <label>Password</label>
                        <input className="form-control" name="password" type="password" onChange={this.onChange} />
                    </div>
                    */}

                    {/* 66 ) "label"deki Password   olayını t ile en ve tr olayına çevirdik */}
                    <Input name="password" label={t('Password')} error={password} onChange={this.onChange} type="password" />

                    {/*<div className="form-group">
                        <label>Password Repeat</label>
                        <input className="form-control" name="passwordRepeat" type="password" onChange={this.onChange} />
                    </div>
                    */}

                    {/* 67 ) "label"deki  Password Repeat   olayını t ile en ve tr olayına çevirdik */}
                    <Input name="passwordRepeat" label={t('Password Repeat')} error={passwordRepeat} onChange={this.onChange} type="password" />


                    <div className="text-center">
                        {/* 17 ) Sign Up button onclick methodunu tanımladık. */}
                        {/* 27 ) Sign Up basınca o işlem bitmeden başka bir request işlemini almıyor */}
                        {/* 34 ) const { pendingApiCall } tanımladığımızdan artık this.state.pendingApiCall yerine direk this.pendingApiCall yazdık.*/}
                        {/* 54 ) passwordRepeat undefined değilse Sign Uptuşu disabled */}
                        <button className="btn btn-primary" onClick={this.onClickSignup}
                            disabled={this.pendingApiCall || passwordRepeat !== undefined}>
                            {/* 28 ) Spinner Loading ekledik buttona basınca buttonda loading çıkacak işlem bitince kaydolacak
                                Javascript Conditional Rendering özelliği ile yaptık.
                            */}
                            {this.pendingApiCall && <span className="spinner-border spinner-border-sm"></span>}
                            {/* 68 ) Sign Up yazısını t ile en ve tr olayına çevirdik */}
                            {t('Sign Up')}
                        </button>
                    </div>

                    {/* 73 ) Ülke Image tanımladık ve onclick ile bu language olayını gerçekleştirdik. */}
                    <div>
                        <img
                            src="https://www.countryflags.io/tr/flat/24.png"
                            alt="Turkish Flag"
                            onClick={() => this.onChangeLanguage('tr')}
                            style={{ cursor: 'pointer' }}
                        ></img>
                        <img
                            src="https://www.countryflags.io/us/flat/24.png"
                            alt="USA Flag"
                            onClick={() => this.onChangeLanguage('en')}
                            style={{ cursor: 'pointer' }}
                        ></img>
                    </div>

                </form>
            </div>
        );
    }
}


// 3 ) UserSignUpPage export ederek bu class erişim sağladık.
// 3 ) veya export class UserSignUpPage extends React.Component
// export default UserSignupPage;

// 60 ) withTranslation() UserSignupPage kullanarak i18n etkinleştirdik
// export default UserSignupPage;
const UserSignupPageWithTranslation = withTranslation()(UserSignupPage);
export default UserSignupPageWithTranslation;


