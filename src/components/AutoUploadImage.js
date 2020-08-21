import React from 'react';
import '../css/AutoUploadImage.css';

// 520 ) AutoUploadImage tanımladık
const AutoUploadImage = ({ image, uploading }) => {
  return (
    <div style={{ position: 'relative' }}>
      <img className="img-thumbnail" src={image} alt="hoax-attachment" />
      <div className="overlay" style={{ opacity: uploading ? 1 : 0 }}>
        <div className="d-flex justify-content-center h-100">
          <div className="spinner-border text-light m-auto"> {/** spinner vertical ve horizontal olarak ortaya alabilmek için m-auto yazdık */}
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoUploadImage;