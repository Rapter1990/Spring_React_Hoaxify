// 55 ) i18n packageleri import ettik
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 57 ) Json olarak en ve tr mesajları tanımladık
const resources = {
    en: {
        translations: {
            'Sign Up': 'Sign Up',
            'Password mismatch': 'Password mismatch',
            Username: 'Username',
            'Display Name': 'Display Name',
            Password: 'Password',
            'Password Repeat': 'Password Repeat'
        }
    },
    tr: {
        translations: {
            'Sign Up': 'Kayıt Ol',
            'Password mismatch': 'Aynı şifreyi giriniz',
            Username: 'Kullanıcı Adı',
            'Display Name': 'Tercih Edilen İsim',
            Password: 'Şifre',
            'Password Repeat': 'Şifreyi Tekrarla'
        }
    }
};

// 56 )  i18n tanımlayıp use kısmına initReactI18next yazdık ve init methodunu çalıştırdık.
i18n
    .use(initReactI18next)
    .init({
        resources: resources
        ,
        fallbackLng: 'en', // Herhangi bir language bulunmadığında tr olarak mesajları versin //  70 ) tr yi en olarak değiştirdik
        ns: ['translations'], // namespace(ns) resources kısımdaki tr ve en deki "translations" kısımları verdik
        defaultNS: 'translations', // default namespace olarak da translations verdik
        keySeparator: false, // we do not use keys in form messages.welcome
        interpolation: {
            escapeValue: false, // react already safes from xss
            formatSeparator: ',' // translations key:value kısımları "," ile tanımladı ve herbir key:value "," olarak ayıracak
        },
        react: {
            wait: true
        }
    });


export default i18n;    