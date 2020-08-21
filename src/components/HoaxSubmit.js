import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import { useTranslation } from 'react-i18next';
import { postHoax , postHoaxAttachment } from '../api/apiCalls';
import { useApiProgress } from '../shared/ApiProgress';
import ButtonWithProgress from './ButtonWithProgress';
import Input from './Input';
import AutoUploadImage from './AutoUploadImage';

// 464 ) HoaxSubmit oluşturuyoruz.
const HoaxSubmit = () => {
  const { image } = useSelector(store => ({ image: store.image }));

  // 521 ) 2 tane pending durumu var çakışmayı engellemek için true yazdık
  const pendingApiCall = useApiProgress('post', '/api/1.0/hoaxes', true);
  const pendingFileUpload = useApiProgress('post', '/api/1.0/hoax-attachments', true);

  // 467 ) focused false olarak tanımladık
  const [focused, setFocused] = useState(false);

  // 522 ) attachmentId tanımladık
  const [attachmentId, setAttachmentId] = useState();

  // 513 ) Resim için newImage parametresini tanımladık
  const [newImage, setNewImage] = useState();

  // 468 ) hoax boş string olarak tanımladık
  const [hoax, setHoax] = useState('');
  const { t } = useTranslation();

  // 471 ) errors boş obje olarak tanımladık
  const [errors, setErrors] = useState({});

  // 469 ) button "Cancel" diyerek  hoax boş string tanımlama (yeni hoax için boş string tanımlama)
  // 472 ) yeni hoax için errors false yaptık
  useEffect(() => {
    if (!focused) {
      setHoax('');
      setErrors({});
      // 514 ) setNewImage boş olarak tanımladık
      setNewImage();
      // 524 ) setAttachmentId boş olarak tanımladık
      setAttachmentId();
    }
  }, [focused]);

  // 473 ) var olan hatayı silmek için hoax'ta error silip yeni bir tane hoax yazarken hata vermemesi
  useEffect(() => {
    setErrors({});
  }, [hoax]);

  // 470 ) onClickHoaxify methodunu tanımladık
  const onClickHoaxify = async () => {
    const body = {
      content: hoax,
      attachmentId: attachmentId
    };

    try {
      await postHoax(body);
      setFocused(false);
    } catch (error) {
        if (error.response.data.validationErrors) {
            setErrors(error.response.data.validationErrors);
        }
    }
  };  

  let textAreaClass = 'form-control';
  if (errors.content) {
    textAreaClass += ' is-invalid';
  }

  // 518 ) uploadFile file gelmesini bekledikten sonra function tanımladık
  const uploadFile = async file => {
    const attachment = new FormData();
    attachment.append('file', file);
    const response = await postHoaxAttachment(attachment);
    setAttachmentId(response.data.id);
  };

  // 515 ) onChangeFile basınca resim ekleme olayını yaptık 
  const onChangeFile = event => {
    if (event.target.files.length < 1) {
      return;
    }
    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      setNewImage(fileReader.result);
      uploadFile(file);
    };
    fileReader.readAsDataURL(file);
  };

  return (
    <div className="card p-1 flex-row">
      <ProfileImageWithDefault image={image} width="32" height="32" className="rounded-circle mr-1" />
      <div className="flex-fill">
        <textarea
        className={textAreaClass}
        rows={focused ? '3' : '1'} // focused true ise 3 değilse 1 row alanı oluşacak
        onFocus={() => setFocused(true)}
        onChange={event => setHoax(event.target.value)}
        value={hoax}
        />
        <div className="invalid-feedback">{errors.content}</div>
        {focused && (
          // 516 ) <></> React fragment özelliğini kullandık( Birden fazla element olduğu için )
          <>
          {!newImage && <Input type="file" onChange={onChangeFile} />}
          {newImage && <AutoUploadImage image={newImage} uploading={pendingFileUpload} />}
          <div className="text-right mt-1">
            <ButtonWithProgress
              className="btn btn-primary"
              onClick={onClickHoaxify}
              text="Hoaxify"
              pendingApiCall={pendingApiCall}
              disabled={pendingApiCall || pendingFileUpload}
            />
            <button className="btn btn-light d-inline-flex ml-1" onClick={() => setFocused(false)} disabled={pendingApiCall || pendingFileUpload}>
              <i className="material-icons">close</i>
              {t('Cancel')}
            </button>
          </div>
        </>
        )}
      </div>
    </div>
  );
};

export default HoaxSubmit;