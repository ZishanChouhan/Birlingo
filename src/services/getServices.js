import axios from 'axios';

const URL = 'https://example.com/api/webservice/';

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
