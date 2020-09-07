import React, { useState, useEffect } from 'react';
import { getHoaxes, getOldHoaxes, getNewHoaxCount, getNewHoaxes } from '../api/apiCalls';
import { useTranslation } from 'react-i18next';
import HoaxView from './HoaxView';
import { useApiProgress } from '../shared/ApiProgress';
import Spinner from './Spinner';
import { useParams } from 'react-router-dom';

// 475 ) HoaxFeed stateless functional component olarak tanımladık
const HoaxFeed = () => {
  // 476 ) hoaxPage boş array olarak tanımladık
  // 482 ) last : true ekledik (daha önceki hoax ları getirmek) -> last field Postmandak "last" refer ediyor
  // last true diyerek sanki son sayfadaymışızki gibi 
  // 485 ) number : 0 verdik -> number field Postmandaki "number" refer ediyor
  const [hoaxPage, setHoaxPage] = useState({ content: [], last: true, number: 0 });

  // 516 ) newHoaxCount useState ile 0 olarak tanımladık
  const [newHoaxCount, setNewHoaxCount] = useState(0);

  // 498 ) useParams ile username aldık
  const { username } = useParams();

  // 477 ) Language olayı için useTranslation tanımladık
  const { t } = useTranslation();

  // 488 ) pendingApiCall tanımladık
  // 499 ) path göre pendingApiCall işlemini yapacak
  const path = username ? `/api/1.0/users/${username}/hoaxes?page=` : '/api/1.0/hoaxes?page=';

  // 507 ) initialHoaxLoadProgress tanımladık
  const initialHoaxLoadProgress = useApiProgress('get', path);

  // 508 ) ilk başta lastHoaxId = 0 yaptık
  let lastHoaxId = 0;

  // 517 ) firstHoaxId = 0 yaptık
  let firstHoaxId = 0;

  // 509 ) lastHoaxId belirledik
  if (hoaxPage.content.length > 0) {
    firstHoaxId = hoaxPage.content[0].id;
    const lastHoaxIndex = hoaxPage.content.length - 1;
    lastHoaxId = hoaxPage.content[lastHoaxIndex].id;
  }

  // 510 ) loadOldHoaxesProgress tanımladık
  // 514 ) loadOldHoaxesProgress oldHoaxPath path olarak tanımladık
  const oldHoaxPath = username ? `/api/1.0/users/${username}/hoaxes/${lastHoaxId}` : `/api/1.0/hoaxes/${lastHoaxId}`;
  const loadOldHoaxesProgress = useApiProgress('get', oldHoaxPath, true);
  
  // 522 ) newHoaxPath path tanımlayıp
  const newHoaxPath = username
    ? `/api/1.0/users/${username}/hoaxes/${firstHoaxId}?direction=after`
    : `/api/1.0/hoaxes/${firstHoaxId}?direction=after`;

  const loadNewHoaxesProgress = useApiProgress('get', newHoaxPath, true);

  // 518 ) getNewHoaxCount firstHoaxId alıp new hoax getirme
  useEffect(() => {
    const getCount = async () => {
      const response = await getNewHoaxCount(firstHoaxId, username);
      setNewHoaxCount(response.data.count);
    };
    let looper = setInterval(getCount, 5000);
    return function cleanup() {
      clearInterval(looper);
    };
  }, [firstHoaxId, username]); // sürekli firstHoaxId, username göre çağırmak için bunu tanımladık

  // 478 ) useEffect ile getHoaxes alıp set ettik. her işlem öncesi boş array ([]) parametresi tanımladık
  useEffect(() => {
    // 505 ) loadHoaxes tanımladık (486 ) ve  500 ) adımı buraya aldık)
    const loadHoaxes = async page => {
      try {
        const response = await getHoaxes(username, page);
        setHoaxPage(previousHoaxPage => ({ // HoaxPage'daki önceki değeri almak için previousHoaxPage parametresini tanımladık aynısını UserSignUpPage'de yapmıştık
          ...response.data,
          content: [...previousHoaxPage.content, ...response.data.content] // content bir önceki değerlere yeni değerleri atma
        }));
      } catch (error) {}
    };
    loadHoaxes();
  }, [username]); // loadHoaxes username bağlı olduğu için username göre işlemleri getirmek için dependency array [username] yazdık

  // 522 ) loadNewHoaxes tanımladık
  const loadNewHoaxes = async () => {
    const response = await getNewHoaxes(firstHoaxId, username);
    setHoaxPage(previousHoaxPage => ({
      ...previousHoaxPage,
      content: [...response.data, ...previousHoaxPage.content]
    }));
    setNewHoaxCount(0);
  };

  // 513 ) loadOldHoaxes methodunu tanımladık
  const loadOldHoaxes = async () => {
    const lastHoaxIndex = hoaxPage.content.length - 1;
    const lastHoaxId = hoaxPage.content[lastHoaxIndex].id;
    const response = await getOldHoaxes(lastHoaxId, username);
    setHoaxPage(previousHoaxPage => ({
      ...response.data,
      content: [...previousHoaxPage.content, ...response.data.content]
    }));
  };

  // 529 ) onDeleteHoaxSuccess sildikten sonra ona tüm hoaxları getirme
  const onDeleteHoaxSuccess = id => {
    setHoaxPage(previousHoaxPage => ({
      ...previousHoaxPage,
      content: previousHoaxPage.content.filter(hoax => hoax.id !== id)
    }));
  };


  // 481 ) hoaxPage veriyi content assign ettik
  // 483 ) last 'da aldık
  // 487 ) number 'da aldık
  // 506 ) number sildik
  const { content, last } = hoaxPage;

  if (content.length === 0) {
    // 489 ) pendingApiCall varsa Spinner yoksa diğeri
    // 511 ) pendingApiCall yerine initialHoaxLoadProgress tanımladık
    return <div className="alert alert-secondary text-center">{initialHoaxLoadProgress  ? <Spinner /> : t('There are no hoaxes')}</div>;
  }

  return (
    <div>
      {/** 519 ) Yeni Hoaxları getirme */}
      {newHoaxCount > 0 && (
        <div
          className="alert alert-secondary text-center mb-1"
          style={{ cursor: loadNewHoaxesProgress ? 'not-allowed' : 'pointer' }}
          onClick={loadNewHoaxesProgress ? () => {} : loadNewHoaxes}
        >
          {loadNewHoaxesProgress ? <Spinner /> : t('There are new hoaxes')}
        </div>
      )}
      {content.map(hoax => {
        return <HoaxView key={hoax.id} hoax={hoax} />;
      })}
      {/** !last -> son sayfada değilsek  getirmeye devam et*/}
      {/** her seferinde number + 1 yaptık*/}
      {/** 490 ) pendingApiCall varsa Spinner yoksa diğeri */}
      {/** 512 ) pendingApiCall yerine loadOldHoaxesProgress tanımladık */}
      {!last && (
        <div
            className="alert alert-secondary text-center"
            style={{ cursor: loadOldHoaxesProgress ? 'not-allowed' : 'pointer' }}
            onClick={loadOldHoaxesProgress ? () => {} : () => loadOldHoaxes()}
            >
            {loadOldHoaxesProgress  ? <Spinner /> : t('Load old hoaxes')}
        </div>
      )}
    </div>
  );
};

export default HoaxFeed;