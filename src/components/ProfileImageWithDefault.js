import React from 'react';
import defaultPicture from '../assets/profile.png';

// 399 ) ProfileImage default olarak şekilde tanımlayıp Component yaptık
const ProfileImageWithDefault = props => {
  // 440 ) props'tan image dışında tempImage ekledik
  // 443 ) tempImage Unknown hatası aldığımız için onu sildik
  // 445 ) tempimage yeniden tanımladık
  const { image, tempimage } = props;

  let imageSource = defaultPicture;
  if (image) {
    // 446 ) images directoryden image değerini aldık
    imageSource = 'api/1.0/images/profile/' + image;
    console.log(imageSource);
  }
  // 441 ) src kısmına tempImage ekledik tempImage varsa o yoksa imageSource 
  // 444 ) tempImage Unknown hatası aldığımız için onu sildik
  // 447 ) return işlemini bu şekilde yaptık
  return (
    <img
      alt={`Profile`}
      src={tempimage || imageSource}
      {...props}
      onError={event => {
        event.target.src = defaultPicture;
      }}
    />
  );
};

// 400 ) Başka alanlarda kullanmak için export ettik
export default ProfileImageWithDefault;