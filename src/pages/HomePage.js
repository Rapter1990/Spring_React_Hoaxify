// 168 ) HomePage Sayfası için HomePage.js oluşturduk

import React from 'react';
import UserList from '../components/UserList';
import HoaxSubmit from '../components/HoaxSubmit';
import { useSelector } from 'react-redux';
import HoaxFeed from '../components/HoaxFeed';

// 169 ) HomePage function olarak tanımladık çağırıldığında return edecek
const HomePage = () => {

  // 465 ) isLoggedIn olduğunu belirliyoruz
  const { isLoggedIn } = useSelector(store => ({ isLoggedIn: store.isLoggedIn }));


  // 368 ) div içinde UserList tanımladık
  // 466 ) 1 row -> 2 col olarak ekranı böldük
  return (
    <div className="container">
        <div className="row">
        <div className="col">
          {isLoggedIn && (
            <div className="mb-1">
              <HoaxSubmit />
            </div>
          )}
          <HoaxFeed />
        </div>
        <div className="col">
          <UserList />
        </div>
      </div>
    </div>
  );
};

// 170 ) Bu objeyi başka yerlerde kullanmak için  export default HomePage dedik
export default HomePage;