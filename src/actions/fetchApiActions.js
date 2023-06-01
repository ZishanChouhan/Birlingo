//import { asyncLogOffWithoutApi } from "./authActions";
import {selectLanguageActionAfterLogin} from '../screens/selectLanguage/actions';
import store from '../reducer';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as navigation from './navigationHelpers'
import { showDangerToast } from '../assets/utility/ToastMessage';
import { postService } from '../services/postServices';
import { apiUrls } from '../api/constants/constants';
import {isEmpty} from 'lodash';
import { useDispatch } from 'react-redux';

export async function doPost(url, payload) {
  return await doRequest(url, payload);
}

export async function doPatch(url, payload, method = 'PATCH') {
  return await doRequest(url, payload, method);
}

export async function doGet(url, page) {
  return await doRequest(url, {}, 'GET', page);
}

// export async function doGet(url) {
//   return await doRequest(url,{},{}, 'GET')
// }

export async function doDelete(url) {
  return await doRequest(url, {}, 'DELETE');
}

async function doRequest(url, payload, method = 'POST', page) {
  //console.log("global.AuthToken =>", global.AuthToken);
  // console.log('pages', page);
  try{
  const headers = {
    'content-type': 'application/json',
    Authorization: `Bearer ${global.AuthToken}`,
  };
  console.log('payload', payload);
  console.log('url', url);

  const request = {
    cache: 'no-cache',
    method: method,
    headers: headers,
  };

  if (method !== 'GET') request.body = JSON.stringify(payload);
  // console.log('request.body', request.body);

  let responseStream;
  if(page){
    responseStream = await fetch(url + page, request);
  }else{
    responseStream = await fetch(url, request);
    // console.log("responseStream", responseStream);
  }

  //console.log( 'res ', responseStream )
  //unauthorised
  // if (responseStream.status == 403) {
  //   asyncLogOffWithoutApi()

  // }

  //successful no body
  if (responseStream.statuscode === 204) {
    return {};
  }
  if (responseStream.status == 401) {
    // console.log("return");
    await AsyncStorage.removeItem("authUser");
    await AsyncStorage.removeItem("learning_language_id");
    await AsyncStorage.removeItem("rememberLesson");
    global.logout = 1;
    // navigate("Login");
    // navigation.navigate({name: "Login"})
    showDangerToast("You are logged out. Please login again")
    return
  }

  const resp = await responseStream.json();
  // console.log('resp', resp);

  if (
    resp.hasOwnProperty('data') ||
    (responseStream.statuscode >= 200 && responseStream.statuscode < 300)
  ) {
    const lastSelectDate = await AsyncStorage.getItem('changeDate');

    //await GetUpdatedTerms._checkDate(resp.last_updated_date);
    console.log("resp.last_updated_date", resp.last_updated_date);
    console.log("lastSelectDate", lastSelectDate);
    var lastEditDate = resp.last_updated_date;
    var lastSelectDate2 = lastSelectDate;

    if(resp.last_updated_date){
      var diff = getDifferenceBetweenTwoDates(lastSelectDate, resp.last_updated_date);
      console.log("diff", diff);
      if (diff > 0) {
        const langSelect = await AsyncStorage.getItem('language');
        const lang = JSON.parse(langSelect);
        languageId = {
          language_id: lang && lang.language_id,
        };
        //console.log("this.props", props);
        //  this.props.selectLanguage(languageId);
        const currentDate = new Date().toISOString();
        await AsyncStorage.setItem('changeDate', currentDate);

        // store.dispatch(selectLanguageActionAfterLogin(languageId, global.Terms));
        postService('afterloginterms', languageId).then(async response => {
          console.log("after login", response);
          if(response.success){
            var obj = response.data;
            if (isEmpty(obj)) {

            }else{
              store.dispatch(setAppString(response.data.data));
              await AsyncStorage.setItem('appTerms', JSON.stringify(response.data.data));
            }
          }else{
            showDangerToast(response.message);
          }
        }).catch(err => console.log("err", err))
      } else {
        //console.log("enter in else part fetch api");
      }
    }
    // console.log('resp===', resp);
    return resp;
  }

  var errorMessage = '';
  if (
    resp.hasOwnProperty('error') &&
    resp.error.details &&
    resp.error.details.messages &&
    typeof resp.error.details.messages === 'object'
  ) {
    var messsage = resp.error.details.messages;
    var keys = Object.keys(messsage);
    keys.forEach((element) => {
      resp.error.details.messages[element].forEach((msg) => {
        errorMessage = errorMessage + capitalize(element) + ' : ' + msg + '\n';
      });
    });
  } else if (resp.error && resp.error.message) {
    var messsage = resp.error.message;
    errorMessage = capitalize(messsage);
  }

  throw {
    responseStatus: responseStream.status,
    errorCodes: resp.hasOwnProperty('error')
      ? resp.error.statusCode
      : ['unknown'],
    errorMessage: errorMessage,
  };
}catch(err){
  // console.log("error", err);
}
}
function capitalize(s) {
  return s[0].toUpperCase() + s.slice(1);
}

const getDifferenceBetweenTwoDates = function (startDate, endDate) {
  startDate 	= new Date(startDate);
  endDate = endDate ? new Date(endDate) : new Date();
  
  var timeDiff = endDate.getTime() - startDate.getTime();
  console.log("timeDiff", timeDiff);
  var diffInSeconds = Math.ceil(timeDiff / 1000);
  // var diffInDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24))
  return diffInSeconds;
};
