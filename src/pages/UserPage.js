// 171 ) UserPage Sayfası için UserPage.js oluşturduk
import ProfileCard from '../components/ProfileCard';
import React, { useState, useEffect } from 'react';
import { getUser } from '../api/apiCalls';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useApiProgress } from '../shared/ApiProgress';
import Spinner from '../components/Spinner';
import HoaxFeed from '../components/HoaxFeed';

// 172 ) UserPage function olarak tanımladık çağırıldığında return edecek
const UserPage = () => {

  
  // 388 ) useState ile user değişkeni tanımladık
  // 398 ) user defined olarak belirledik -> useState({}) yoksa hata alırız
  const [user, setUser] = useState({});

  // 391 ) useState ile notFound=false olarak belirledik
  const [notFound, setNotFound] = useState(false);

  // 389 ) parametre olarak username tanımladık
  const { username } = useParams();

  // 392 ) useTranslation ile Türkçe İngilizce özeliiği belirledik
  const { t } = useTranslation();

  // 408 ) pendingApiCall tanımladık
  // 426 ) pendingApiCall 'deki useApiProgress 'get' ekledik
  // 501 ) username ekledik 
  // 506 ) HoaxFeed içinde bu  /api/1.0/users/  var ve çakışma oluyor o sorunu buraya true ekleyerek çözdük
  const pendingApiCall = useApiProgress('get', '/api/1.0/users/' + username, true);

  // 390 ) componentDidMount(Component özelliği) yerine useEffect(Hook özelliği) kullandık
  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await getUser(username);
        setUser(response.data);
        // setNotFound(false); -> 1.Yol
      } catch (error) {
        setNotFound(true);
      }
    };
    loadUser();
  }, [username]); // [username] -> dependency array username göre işlemi değiştirme usernam göre tekrar çalıştırma

  // 393 ) useEffect tekrar kullarak user varsa notFound=false olacak 2.Yol
  useEffect(() => {
    setNotFound(false);
  }, [user]); // user göre tekrar çalıştırma

  // 394 ) notFound varsa hata mesajı verecek
  if (notFound) {
    return (
      <div className="container">
        <div className="alert alert-danger text-center">
          <div>
            <i className="material-icons" style={{ fontSize: '48px' }}>
              error
            </i>
          </div>
          {t('User not found')}
        </div>
      </div>
    );
  }

  // 409 ) pendingApiCall varsa Spinner çağıracak
  // 502 ) user.username !== username ekledik
  if (pendingApiCall || user.username !== username){
    return <Spinner />;
  }


  return (
    <div className="container">
      {/** 200) ProfileCard oluşturduk username belirledik. */}
      {/** 215 ) props kısmına gerek kalmadı */}
      {/** 394 ) user property sini user olarak ProfileCard */}
      {/** 503 ) ProfileCard ve HoaxFeed aynı yerde gösterdik*/}
      <div className="row">
        <div className="col">
          <ProfileCard user={user} />
        </div>
        <div className="col">
          <HoaxFeed />
        </div>
      </div>
    </div>
  );
}

// 173 ) Bu objeyi başka yerlerde kullanmak için  export default UserPage dedik
export default UserPage;