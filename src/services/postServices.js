import axios from 'axios';
import {Keyboard} from 'react-native';

const URL = 'https://example.com/api/webservice/';

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
