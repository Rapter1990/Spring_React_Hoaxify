import React from 'react';
import defaultPicture from '../assets/profile.png';
import { Link } from 'react-router-dom';
import ProfileImageWithDefault from './ProfileImageWithDefault';

// 369 ) User listeleyeceğimiz UserListItem tanımladık
const UserListItem = props => { // <UserListItem key={user.username} user={user} /> -> user prop olarak alıp gerekli işlemleri yapıyoruz

  // 370 ) proptan user ve ona bağlı username, displayName, image aldık
  const { user } = props;
  const { username, displayName, image } = user;

  // 403 ) ProfileImageWithDefault tanımladığımız için buraya gerek kalmadı
  // let imageSource = defaultPicture;
  // if (image) {
  //   imageSource = image;
  // }

  // 371 ) User Item tasarımını belirledik 
  return (
    <Link to={`/user/${username}`} className="list-group-item list-group-item-action">
      {/** 404 ) img yerine ProfileImageWithDefault kullandık*/}
      {/**<img className="rounded-circle" width="32" height="32" alt={`${username} profile`} src={imageSource} />*/}
      <ProfileImageWithDefault className="rounded-circle" width="32" height="32" alt={`${username} profile`} image={image} />
      <span className="pl-2"> {/** pl -> padding left */}
        {displayName}@{username}
      </span>
    </Link>
  );
};

export default UserListItem;