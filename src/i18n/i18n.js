// 55 ) i18n packageleri import ettik
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { register } from 'timeago.js';

// 57 ) Json olarak en ve tr mesajları tanımladık
const resources = {
    en: {
        translations: {
            'Sign Up': 'Sign Up',
            'Password mismatch': 'Password mismatch',
            Username: 'Username',
            'Display Name': 'Display Name',
            Password: 'Password',
            'Password Repeat': 'Password Repeat',
            Login: 'Login',
            Logout: 'Logout',
            Users: 'Users',
            Next: 'next >',
            Previous: '< previous',
            'Load Failure': 'Load Failure',
            'User not found': 'User not found',
            Edit: 'Edit',
            'Change Display Name': 'Change Display Name',
            Save: 'Save',
            Cancel: 'Cancel',
            'My Profile': 'My Profile',
            'There are no hoaxes': 'There are no hoaxes',
            'Load old hoaxes': 'Load old hoaxes',
            'There are new hoaxes': 'There are new hoaxes'
        }
    },
    tr: {
        translations: {
            'Sign Up': 'Kayıt Ol',
            'Password mismatch': 'Aynı şifreyi giriniz',
            Username: 'Kullanıcı Adı',
            'Display Name': 'Tercih Edilen İsim',
            Password: 'Şifre',
            'Password Repeat': 'Şifreyi Tekrarla',
            Login: 'Giriş',
            Logout: 'Çıkış Yap',
            Users: 'Kullanıcılar',
            Next: 'sonraki >',
            Previous: '< önceki',
            'Load Failure': 'Liste alınamadı',
            'User not found': 'Kullanıcı bulunamadı',
            Edit: 'Düzenle',
            'Change Display Name': 'Görünür İsminizi Değiştirin',
            Save: 'Kaydet',
            Cancel: 'İptal Et',
            'My Profile': 'Hesabım',
            'There are no hoaxes': 'Hoax bulunamadı',
            'Load old hoaxes': 'Geçmiş Hoaxları getir',
            'There are new hoaxes': 'Yeni Hoaxlar var'
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


// 493 ) timeago.js için timeageTR tanımladık
const timeageTR = (number, index) => {
    return [
        ['az önce', 'şimdi'],
        ['%s saniye önce', '%s saniye içinde'],
        ['1 dakika önce', '1 dakika içinde'],
        ['%s dakika önce', '%s dakika içinde'],
        ['1 saat önce', '1 saat içinde'],
        ['%s saat önce', '%s saat içinde'],
        ['1 gün önce', '1 gün içinde'],
        ['%s gün önce', '%s gün içinde'],
        ['1 hafta önce', '1 hafta içinde'],
        ['%s hafta önce', '%s hafta içinde'],
        ['1 ay önce', '1 ay içinde'],
        ['%s ay önce', '%s ay içinde'],
        ['1 yıl önce', '1 yıl içinde'],
        ['%s yıl önce', '%s yıl içinde']
    ][index];
    };

    // 494 ) register diyerek bunu tr olarak belirledik
    register('tr', timeageTR);

export default i18n;    