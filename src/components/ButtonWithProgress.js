 // 115 ) React import ettik
import React from 'react';

// 116 ) React Component yerine ButtonWithProgress function oluşturduk (Input.js ile durumu aynı)
const ButtonWithProgress = props => {

  // 117 ) props'dan gelen onClick, pendingApiCall, disabled, text  object destruct ile aldık
  // 429 ) prop'tan extradan className mide aldık
  const { onClick, pendingApiCall, disabled, text, className } = props;

  // 118 ) bu kısmı return edecek(ekranda gösterilecek kısım burası)
  // 430 ) className şu şekilde yaptık {className || 'btn btn-primary'}
  return (
    <button className= {className || 'btn btn-primary'} onClick={onClick} disabled={disabled}>
      {pendingApiCall && <span className="spinner-border spinner-border-sm"></span>} {text}
    </button>
  );
};

// 119 ) başka yerlerde bunu kullanmak için export ettik
export default ButtonWithProgress;