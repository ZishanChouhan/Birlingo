import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  addAsyncWorkingRequest,
  removeAsyncWorkingRequest,
} from '../../reducer/modules/systemWorking';
import {
  getLanguagesApi,
  getLanguageString,
  getLastTermDate,
  getLanguageTerms,
  getNativeLanguagesApi,
} from '../../api/selectLanguage';
import {
  setAppLanguage,
  setAppString,
} from '../../screens/selectLanguage/reducer';
import {setLastTermDate} from '../../reducer/modules/lastTermdateReducer';
import * as ActionTypes from '../../actions/actionTypes';
import {navigate} from '../../actions/routing';
import {showToast, showDangerToast} from '../../assets/utility/ToastMessage';
import {isEmpty} from 'lodash';
import { log } from 'react-native-reanimated';
export const getNativeLanguageAction = () => {
  return async function (dispatch) {
    try {
      dispatch(serviceActionPending());
      const response = await getLanguagesApi();
      console.log('getNativeLanguageAction', response);
      dispatch(setAppLanguage(response.data));
    } catch (error) {
      console.log('err ', error);
      dispatch(serviceActionError());
    } finally {
      // console.log('finally ');
      dispatch(serviceActionSuccess());
    }
  };
};

export const selectLanguageAction = (languageId, navi) => {
  console.log('selectLanguageAction', languageId)
  return async function (dispatch) {
    try {
      setTimeout(() => {
        dispatch(addAsyncWorkingRequest());
      }, 500);

      const response = await getLanguageString(languageId);
      console.log("selectLanguageAction=======", response);
      global.Terms = response.data;
      dispatch(setAppString(response));
      // dispatch(navigate({routeName: navi}));
      await AsyncStorage.setItem('appTerms', JSON.stringify(response.data));
      setTimeout(() => {
        dispatch(removeAsyncWorkingRequest());
      }, 500);
    } catch (error) {
      console.log('err ', error);
    } finally {
      console.log('finally ');
      setTimeout(() => {
        dispatch(removeAsyncWorkingRequest());
      }, 500);
    }
  };
};

export const getNativeLanguageAfterLoginAction = () => {
  return async function (dispatch) {
    try {
      dispatch(serviceActionPending());
      const response = await getNativeLanguagesApi();
      console.log('response ==>', response);
      //  console.log("getNativeLanguageAction", response);
      dispatch(setAppLanguage(response.data));
    } catch (error) {
      console.log('err ', error);
      dispatch(serviceActionError());
    } finally {
      // console.log('finally ');
      dispatch(serviceActionSuccess());
    }
  };
};

export const selectLanguageActionAfterLogin = (languageId, appString) => {
  return async function (dispatch) {
    try {
      dispatch(serviceActionPending());
      const response = await getLanguageTerms(languageId);
      var obj = response.data;
      console.log("after login", response);
      if (isEmpty(obj)) {
        dispatch(setAppString(appString));
        const responseAppLang = await getNativeLanguagesApi();
        await AsyncStorage.setItem('appTerms', JSON.stringify(appString));
        dispatch(setAppLanguage(responseAppLang.data));
      } else {
        dispatch(setAppString(response));
        const responseAppLang = await getNativeLanguagesApi();
        await AsyncStorage.setItem('appTerms', JSON.stringify(response.data));
        dispatch(setAppLanguage(responseAppLang.data));
      }
    } catch (error) {
      console.log('err ', error);
      dispatch(serviceActionError(error));
    } finally {
      // console.log('finally ');
      dispatch(serviceActionSuccess());
    }
  };
};

export const languageActionAfterLogin = (languageId, appString) => {
  return async function (dispatch) {
    try {
      dispatch(serviceActionPending());
      const response = await getLanguageTerms(languageId);
      var obj = response.data;
      if (response.success == true) {
        if (isEmpty(obj)) {
          dispatch(setAppString(appString));
          const responseAppLang = await getNativeLanguagesApi();
          await AsyncStorage.setItem('appTerms', JSON.stringify(appString));
          dispatch(setAppLanguage(responseAppLang.data));
        } else {
          dispatch(setAppString(response));
          const responseAppLang = await getNativeLanguagesApi();
          await AsyncStorage.setItem('appTerms', JSON.stringify(response.data));
          dispatch(setAppLanguage(responseAppLang.data));
        }
        global.Terms = response.data;
        showToast(response.data[response.message]);
      } else {
        showToast(appString[response.message]);
      }
    } catch (error) {
      console.log('err ', error);
      dispatch(serviceActionError(error));
    } finally {
      // console.log('finally ');
      dispatch(serviceActionSuccess());
    }
  };
};

export const getLastInsertedTermDateAction = (languageId) => {
  return async function (dispatch) {
    try {
      dispatch(serviceActionPending());
      const response = await getLastTermDate(languageId);
      console.log("response", response);
      dispatch(setLastTermDate(response.data.date));
    } catch (error) {
      console.log('err ', error);
      dispatch(serviceActionError(error));
    } finally {
      // console.log('finally ');
      dispatch(serviceActionSuccess());
    }
  };
};

export const serviceActionPending = () => ({
  type: ActionTypes.SERVICE_PENDING,
});

export const serviceActionError = (error) => ({
  type: ActionTypes.SERVICE_ERROR,
  error: error,
});

export const serviceActionSuccess = (data) => ({
  type: ActionTypes.SERVICE_SUCCESS,
  data: data,
});
