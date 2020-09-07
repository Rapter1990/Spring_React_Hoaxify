import axios from 'axios';

// 29 ) api class işlemini apiCall.js klasöre alıp signup methodunu tanımladık
export const signup = body => {
  // 55 ) axios.post kısmında config yere  { headers: { 'accept-language': 'tr' } } yazdık mesajların tr olarak çıkması için
  // 69 ) { headers: { 'accept-language': 'tr' } } kısmı sildik.
  return axios.post('/api/1.0/users', body);
};

// 68 ) Change language olayını için fonksiyon yazdık
export const changeLanguage = language => {
  axios.defaults.headers['accept-language'] = language;
};

// 100 ) login function çağırma cred alıp /api/1.0/auth auth durumunu yapacak.
export const login = creds => {
  // 101 ) {} herhangi bir değer göndermiyoruz sadece auth durumunu kontrol edeceğiz.
  return axios.post('/api/1.0/auth', {}, { auth: creds });
};

// 363 ) getUsers methodunu yazdık
// 372 ) pagination özelliği ekledik
export const getUsers = (page = 0, size = 3) => {
  return axios.get(`/api/1.0/users?page=${page}&size=${size}`);
};

// 380 ) Loginde current user göstermemek için ilk önce setAuthorizationHeader tanımladık ve login olduğunda Authorization değerini alacak
export const setAuthorizationHeader = ({ username, password, isLoggedIn }) => {
  if (isLoggedIn) {
    const authorizationHeaderValue = `Basic ${btoa(username + ':' + password)}`;  // btoa -> base64 çevirme
    axios.defaults.headers['Authorization'] = authorizationHeaderValue;
  } else {
    delete axios.defaults.headers['Authorization'];
  }
};

// 387 ) getUser methodunu tanımladık
export const getUser = username => {
  return axios.get(`/api/1.0/users/${username}`);
};

// 425 ) updateUser methodunu tanımladık
export const updateUser = (username, body) => {
  return axios.put(`/api/1.0/users/${username}`, body);
};

// 467 ) postHoax işlemini tanımladık
export const postHoax = hoax => {
  return axios.post('/api/1.0/hoaxes', hoax);
};

// 474 ) getHoaxes işlemini tanımladık
// 484 ) eski hoaxları göstermek için ilk başta page = 0 verdik
// 497 ) getHoaxes şu şekilde tanımladık
export const getHoaxes = (username, page = 0) => {
  const path = username ? `/api/1.0/users/${username}/hoaxes?page=` : '/api/1.0/hoaxes?page=';
  return axios.get(path + page);
};

// 504 )  getOldHoaxes id parametresini alarak tanımladık
// 514 ) username de parametre olarak tanımladık
export const getOldHoaxes = (id, username) => {
  const path = username ? `/api/1.0/users/${username}/hoaxes/${id}` : `/api/1.0/hoaxes/${id}`;
  return axios.get(path);
}

// 515 ) getNewHoaxCount id parametresini alarak tanımladık 
// 520 ) username de parametre olarak tanımladık
export const getNewHoaxCount = (id, username) => {
  const path = username ? `/api/1.0/users/${username}/hoaxes/${id}?count=true` : `/api/1.0/hoaxes/${id}?count=true`;
  return axios.get(path);
};

// 521 ) getNewHoaxes id, username parametrelerini alarak tanımladık 
export const getNewHoaxes = (id, username) => {
  const path = username ? `/api/1.0/users/${username}/hoaxes/${id}?direction=after` : `/api/1.0/hoaxes/${id}?direction=after`;
  return axios.get(path);
};

// 517 ) postHoaxAttachment attachment parametresini alarak tanımladık 
export const postHoaxAttachment = attachment => {
  return axios.post('/api/1.0/hoax-attachments', attachment);
};

// 528 ) deleteHoax methodunu tanımladık
export const deleteHoax = id => {
  return axios.delete(`/api/1.0/hoaxes/${id}`);
};