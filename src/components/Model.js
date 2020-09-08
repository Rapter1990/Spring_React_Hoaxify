import React from 'react';
import { useTranslation } from 'react-i18next';
import ButtonWithProgress from './ButtonWithProgress';

// 532 ) Delete Hoax için Model oluşturduk
const Modal = props => {
  // 533 )  props tan visible, onClickCancel, message, onClickOk, pendingApiCall değerleri aldık
  const { visible, onClickCancel, message, onClickOk, pendingApiCall, title, okButton } = props;

  // 534 ) Türkçe İngilizce için (i18) useTranslation tanımladık 
  const { t } = useTranslation();

  // 535 ) className tanımladık
  let className = 'modal fade';

  // 536 ) visible ise show d-block ekledik
  if (visible) {
    className += ' show d-block';
  }

  // 537 ) Oluşan Model return edecek
  return (
    <div className={className} style={{ backgroundColor: '#000000b0' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
          </div>
          <div className="modal-body">{message}</div>
          <div className="modal-footer">
            <button className="btn btn-secondary" disabled={pendingApiCall} onClick={onClickCancel}>
              {t('Cancel')}
            </button>
            <ButtonWithProgress
              className="btn btn-danger"
              onClick={onClickOk}
              pendingApiCall={pendingApiCall}
              disabled={pendingApiCall}
              text={okButton}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;