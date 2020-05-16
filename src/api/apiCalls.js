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