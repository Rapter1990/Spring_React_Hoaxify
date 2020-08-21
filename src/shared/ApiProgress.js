// 128 ) LoginPage.js de componentDidMount işlemini UserSignUpPage içinde yapabiliriz. Aynı işlemi copy paste yapmak yerine 
// ApiProgress.js Component oluşturup bu işlemi burada yaptık.

//import React, { Component } from 'react'; // 129 ) React Component import ettik
import axios from 'axios'; // 130 ) axios import ettik

// 348 ) Component yerine hook yapısını kullanacağımız için useState, useEffect kullandık
import { useState, useEffect } from 'react';


// 160 ) getDisplayName tanımladık
/*function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}*/

// 155 ) HOC Higher Order Component Yapısını kullanacağımız için ApiProgress sildik
// 349 ) withApiProgress yerine useApiProgress function tanımladık
// 420 ) useApiProgress GET,POST,PUT,DELETE methodları sağlamak için apiMethod tanımladık
// 504 ) strictPath (UserPage -> // 506 ) kısma refer ) çakışma kısmını çözebilmek için true dedik
export const useApiProgress = (apiMethod, apiPath, strictPath) => {

    //static displayName = `ApiProgress(${getDisplayName(WrappedComponent)})`;

    // 350 ) useState false yapıp pendingApiCall, setPendingApiCall atadık
    const [pendingApiCall, setPendingApiCall] = useState(false);

    // 156 ) state objesi oluşturup içerisine  pendingApiCall false tanımladık
    /*state = {
      pendingApiCall: false
    };*/

    // 351 ) useEffect fonksiyonu tanımlayıp componentDidMount ,componentWillUnmount , updateApiCallFor içinde yaptık
    useEffect(() => {

      let requestInterceptor, responseInterceptor;

      // 352 ) updateApiCallFor tanımladık
      // 421 ) method ekledik
      const updateApiCallFor = (method, url, inProgress) => {
        // 383 ) === yerine startsWith kullandık
        // 422 ) method === apiMethod koşulunu yazdık
        // 504 )
        if (method !== apiMethod) {
          return; // fail fast yaklaşımı
        }
        if (strictPath && url === apiPath) {
          setPendingApiCall(inProgress);
        } else if (!strictPath && url.startsWith(apiPath)) {
          setPendingApiCall(inProgress);
        }
      };  

      // 353 ) componentDidMount içindeki registerInterceptors request ve response olayını burdada tanımladık
      const registerInterceptors = () => {

        requestInterceptor = axios.interceptors.request.use(request => {
          // 435 ) request'den url, method aldık
          const { url, method } = request;
          updateApiCallFor(method, url, true);
          return request;
        });
  

        responseInterceptor = axios.interceptors.response.use(response => {
          // 423 ) response.config 'den url, method aldık
          const { url, method } = response.config;
          updateApiCallFor(method, url, false);
          return response;
        },
        error => {
          // 423 ) error.config 'den url, method aldık
          const { url, method } = error.config;
          updateApiCallFor(method, url, false);
          throw error;
        }); 

      };



    // // 159 ) componentDidMount (render'dan sonra çalışacak) tanımladık
    // componentDidMount() {
    //   // 182 ) request işlemini this.requestInterceptor assign ettik. 
    //   this.requestInterceptor = axios.interceptors.request.use(request => {
    //     this.updateApiCallFor(request.url, true);
    //     return request;
    //   });


    //   // 183 ) response işlemini this.responseInterceptor assign ettik.
    //   this.responseInterceptor = axios.interceptors.response.use(
    //     response => {
    //       this.updateApiCallFor(response.config.url, false);
    //       return response;
    //     },
    //     error => {
    //       this.updateApiCallFor(error.config.url, false);
    //       throw error;
    //     }
    //   );
    // };

    // 181 ) Sign Up ve Login işlemlerine geçişte bir Login veya Sign Up basınca
    // birden fazla axios.interceptors.request ve axios.interceptors.response methodu çalışıyor. Bunu engellemek için
    // componentWillUnmount methodunu oluşturduk bu sayede componentDidMount tekrar çağırılmayı engelledik.
    // Sign veya Login işlemine göre sadece bir tane request çağırılma olacak
    /*componentWillUnmount() {
      axios.interceptors.request.eject(this.requestInterceptor);
      axios.interceptors.response.eject(this.responseInterceptor);
    };*/

    // 354 ) componentWillUnmount içindeki unregisterInterceptors eject olayını burdada tanımladık
    const unregisterInterceptors = () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };

    // 158 ) updateApiCallFor tanımladık
    /*updateApiCallFor = (url, inProgress) => {
      if (url === apiPath) {
        this.setState({ pendingApiCall: inProgress });
      }
    };*/

      // 355 ) registerInterceptors çağırdık
      registerInterceptors();

      // 356 ) useEffect return functiom olarak unmount tanımladık
      return function unmount() {
        unregisterInterceptors();
      };

      // 379 ) , [] ->  useEffect sürekli çağırılıyor , infinite loop engellemek için array dependency kullandık ve her işlemde tek bir defa çağırılıcak
      // 410 ) useEffect kısmını sadece 1 defa yapıyor bir daha uğramıyor username sürekli değişiyor
      //       useApiProgress('/api/1.0/users/' + username) gibi parametre olma durumunda artık şu şekilde tanımladık [apiPath]
      // 424 ) array dependency'e apiMethod ekledik
      // 505 ) array dependency'e strictPath ekledik
    }, [apiPath, apiMethod, strictPath]); 

    // 157 ) render olarak WrappedComponent return ettik
    /*render() {
      console.log("Api Progress : | props :" , this.props , "state : " , this.state)
      // 302 ) Progress oluştuduk Sign Up tan sonra Login için ikisi de Progress yapacak
      const pendingApiCall = this.state.pendingApiCall || this.props.pendingApiCall;
      return <WrappedComponent {...this.props} pendingApiCall={pendingApiCall} />;
    }*/

    return pendingApiCall;
}

