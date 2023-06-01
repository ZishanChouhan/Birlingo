import axios from 'axios';
import {Keyboard} from 'react-native';

const URL = 'https://birlingo.de:8081/api/webservice/'; // live
// const URL = 'https://admin.birlingo.de:17276/api/webservice'; 
// const URL = 'http://172.16.11.252:8081/api/webservice/';
//  const URL = 'https://birlingo.devtechnosys.tech:17275/api/webservice/';
//console.log(URL)s

export const postService = (urlAction, params) => {
  Keyboard.dismiss();
  //console.log("params ==>", params);
  let ServiceUrl = URL + urlAction;
  // console.log(" postservice ServiceUrl---", ServiceUrl, params);
  // console.log("global.AuthToken =>", global.AuthToken);
  let headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${global.AuthToken}`,
  };
  // console.log('headers==', headers);
  console.log('url post  =>', ServiceUrl);
  return axios({
    method: 'post',
    url: ServiceUrl,
    data: params,
    headers: headers,
  }).catch(err => console.log("err2", err));
};
