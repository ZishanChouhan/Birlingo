import axios from 'axios';

const URL = 'https://birlingo.de:8081/api/webservice/'; // live
// const URL = 'https://admin.birlingo.de:17276/api/webservice'; 
// const URL = 'http://172.16.11.252:8081/api/webservice/';
//  const URL = 'https://birlingo.devtechnosys.tech:17275/api/webservice/';
// http://172.16.11.154:8081/api/webservice
export const getService = (urlAction, getParams) => {
  let ServiceUrl = URL + urlAction;

  let headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${global.AuthToken}`,
  };
  console.log('url get =>', ServiceUrl);

  return axios({
    method: 'get',
    url: ServiceUrl,
    params: getParams,
    headers: headers,
  });
};
