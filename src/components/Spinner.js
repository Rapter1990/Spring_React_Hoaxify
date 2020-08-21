import React from 'react';

// 405 ) Spinner function component tanımladık
const Spinner = () => {
  return (
    <div className="d-flex justify-content-center">
      <div className="spinner-border text-black-50">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

// 406 ) Diğer yerlerde kullanmak için export ettik
export default Spinner;
