// 85 ) tr and en language olayı Language işlemini yapabilmek için functional(stateless) component olması yeterli istersek React Component'da tanımlayabiliriz.
// 86 ) Function Component olacağı için sadece React import ettik
import React from 'react';
// 87 ) withTranslation ve changeLanguage import ettik
// 326 ) withTranslation yerine hook ta bulunan useTranslation kullandık.
import { useTranslation } from 'react-i18next';
import { changeLanguage } from '../api/apiCalls';

const LanguageSelector = props => {

    // 327 ) useTranslation tan i18n alık. onChangeLanguage i18n assign etme işlemini sildik
    const { i18n } = useTranslation();

    // 89 ) onChangeLanguage buraya aldık.
    const onChangeLanguage = language => {
        i18n.changeLanguage(language);
        changeLanguage(language);
    };

    // 90 ) Bu kısmı ekran gözükmesi için bu kısmı return ettik.
    return (
        <div className="container">
            <img
                src="https://www.countryflags.io/tr/flat/24.png"
                alt="Turkish Flag"
                onClick={() => onChangeLanguage('tr')}
                style={{ cursor: 'pointer' }}>
            </img>
            <img src="https://www.countryflags.io/us/flat/24.png"
                alt="USA Flag"
                onClick={() => onChangeLanguage('en')}
                style={{ cursor: 'pointer' }}>
            </img>
        </div>
    );
};

// 91 ) withTranslation() LanguageSelector kullanarak i18n etkinleştirdik
// export default withTranslation()(LanguageSelector);

// 328 ) LanguageSelector işlemini useTranslation kullanarak export ettik.
export default LanguageSelector;