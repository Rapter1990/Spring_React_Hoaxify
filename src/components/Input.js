/* 42) Input kısımların sürekli aynı tekrar olayı için bir obje oluşturup 
 input ve error olayı içine yazdık.
*/

import React from 'react';

// 43 ) UserSignupPage gelen props(label, error, name, onChange) alıp (props -> parametre ) function gönderecek
const Input = props => {
    // 44 ) gelen props object destruct  ile tanımladığımız verilere göre ayıracak
    // 49 ) Inputtan gelen props type ekledik ve onu da object destruct aldık
    const { label, error, name, onChange, type } = props;
    // 45 ) hata varsa ilki yoksa diğeri
    const className = error ? 'form-control is-invalid' : 'form-control';
    // 46 ) form-group içindeki div return edecek 
    return (
      <div className="form-group">
        <label>{label}</label>
        {/* 50 ) aldığımız type input ekledik böylece inputtun type belirledik. */}
        <input className={className} name={name} onChange={onChange} type={type} />
        <div className="invalid-feedback">{props.error}</div>
      </div>
    );
};
  
// 47 ) Bu objeyi başka yerlerde kullanmak için  export default Input dedik
export default Input;