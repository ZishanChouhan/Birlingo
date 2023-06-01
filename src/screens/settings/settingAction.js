import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getPrivacyPolicyApi,
  getTermConditionApi,
  getSubscriptionApi,
  logoutApi,
  getRatingApi,
  feedbackApi,
  getAppStoreUrlApi,
  subscriptionDetailsApi,
  cancelPlanApi,
  subscriptionContentsApi,
  getAgbApi,
  getAccessTokenApi
} from '../../api/settingsActions';
import {setTermCondition} from './settingsTerms/reducer';
import {setPrivacyPolicy, setAgb} from './settingsPrivacy/reducer';
import {
  setSubscription,
  getSubscriptionContent,
} from './settingsAccount/reducer';
import {setSupportDetails} from './settingsSupport/reducer';
import {setRatingDetails} from './settingsRate/reducer';
import {setUrlDetails} from './settingsRate/getUrlReducer';
// import {setSubsDetails} from './settingChooseSubscription/reducer';
import { userToken } from '../../reducer/modules/userTokenAction';
//import * as ActionTypes from '../../../actions/actionTypes';
import {navigate} from '../../actions/routing';
import {showToast, showDangerToast} from '../../assets/utility/ToastMessage';
import {
  addAsyncWorkingRequest,
  removeAsyncWorkingRequest,
} from '../../reducer/modules/systemWorking';
export const getPrivacyPolicyAction = (data, appString) => {
  return async function(dispatch) {
    try {
      dispatch(addAsyncWorkingRequest());
      const response = await getPrivacyPolicyApi(data);
      // console.log('getPrivacyPolicyAction ', response.data)
      dispatch(setPrivacyPolicy(response.data));
    } catch (error) {
      console.log('err ', error);
    } finally {
      // console.log('finally ');
      dispatch(removeAsyncWorkingRequest());
    }
  };
};

export const getAgbAction = (data, appString) => {
  return async function(dispatch) {
    try {
      dispatch(addAsyncWorkingRequest());
      const response = await getAgbApi(data);
       console.log("getAgbAction action ", response.data);
      dispatch(setAgb(response.data));
    } catch (error) {
      console.log('err ', error);
    } finally {
      // console.log('finally ');
      dispatch(removeAsyncWorkingRequest());
    }
  };
};

export const getTermAction = (data, appString) => {
  return async function(dispatch) {
    try {
      dispatch(addAsyncWorkingRequest());
      const response = await getTermConditionApi(data);
      // console.log('getTermAction ', response.data)
      dispatch(setTermCondition(response.data));
    } catch (error) {
      console.log('err ', error);
    } finally {
      // console.log('finally ');
      dispatch(removeAsyncWorkingRequest());
    }
  };
};

export const getSubscriptionAction = (data, appString) => {
  return async function(dispatch) {
    try {
      setTimeout(() => {
        dispatch(addAsyncWorkingRequest());
      }, 500);
      const response = await getSubscriptionApi(data);
      console.log('getSubscriptions ', response);
      dispatch(setSubscription(response.data));
    } catch (error) {
      console.log('err ', error);
    } finally {
      // console.log('finally ');
      setTimeout(() => {
        dispatch(removeAsyncWorkingRequest());
      }, 500);
    }
  };
};

export const getAccessTokenAction = () => {
  console.log("in access api func");
  return async function(dispatch) {
    try {
      setTimeout(() => {
        dispatch(addAsyncWorkingRequest());
      }, 500);
      const response = await getAccessTokenApi();
      console.log('getAccessTokenApi ===', response);
      dispatch(getAccessToken(response.data));
    } catch (error) {
      console.log('err getAccessTokenApi ===', error.message);
    } finally {
      // console.log('finally ');
      setTimeout(() => {
        dispatch(removeAsyncWorkingRequest());
      }, 500);
    }
  };
};

export const getSubscriptionContentAction = () => {
  return async function(dispatch) {
    try {
      setTimeout(() => {
        dispatch(addAsyncWorkingRequest());
      }, 500);
      const response = await subscriptionContentsApi();
      console.log("getSubscriptionContentAction ", response);
      dispatch(getSubscriptionContent(response.data));
    } catch (error) {
      console.log('err ', error);
    } finally {
      // console.log('finally ');
      setTimeout(() => {
        dispatch(removeAsyncWorkingRequest());
      }, 500);
    }
  };
};

export const cancelPlanAction = (data, appString) => {
  return async function(dispatch) {
    try {
      setTimeout(() => {
        dispatch(addAsyncWorkingRequest());
      }, 500);
      const cancelResponse = await cancelPlanApi(data);
      //   console.log('cancelPlanAction ', cancelResponse)
      showToast(appString[cancelResponse.message]);
      const response = await getSubscriptionApi(data);
      // console.log('getSubscriptionAction ', response)
      dispatch(setSubscription(response.data));
    } catch (error) {
      console.log('err ', error);
    } finally {
      // console.log('finally ');
      setTimeout(() => {
        dispatch(removeAsyncWorkingRequest());
      }, 500);
    }
  };
};

export const getSupportAction = (data, appString) => {
  return async function(dispatch) {
    try {
      console.log('data ', data);
      dispatch(addAsyncWorkingRequest());
      const response = await getTermConditionApi(data);
      console.log('getSupportAction ', response);
      dispatch(setSupportDetails(response.data));
    } catch (error) {
      console.log('err ', error);
    } finally {
      // console.log('finally ');
      dispatch(removeAsyncWorkingRequest());
    }
  };
};

export const logoutAction = data => {
  return async function(dispatch) {
    try {
      // console.log('enter in logoutAction')
      dispatch(addAsyncWorkingRequest());
      const response = await logoutApi(data);
      global.logout = 1;
      console.log('logoutAction====== ', response)
      await AsyncStorage.removeItem('authUser');
      await AsyncStorage.removeItem('learning_language_id');
      await AsyncStorage.removeItem('rememberLesson');
      await AsyncStorage.removeItem('access_token');
      dispatch(removeAsyncWorkingRequest());
      dispatch(userToken(null))
      
      // dispatch(navigate({name: 'Login'}));
    } catch (error) {
      console.log('err ', error);
    } finally {
      // console.log('finally ');
      dispatch(removeAsyncWorkingRequest());
    }
  };
};

export const getRatingAction = () => {
  return async function(dispatch) {
    try {
      dispatch(addAsyncWorkingRequest());
      const response = await getRatingApi();
      //console.log('getRatingAction ', response)
      dispatch(setRatingDetails(response.data));
    } catch (error) {
      console.log('err ', error);
    } finally {
      // console.log('finally');
      dispatch(removeAsyncWorkingRequest());
    }
  };
};

export const feedbackAction = (data, appString, type, nav) => {
  return async function(dispatch) {
    try {
      setTimeout(() => {
        dispatch(addAsyncWorkingRequest());
      }, 1000);

      const response = await feedbackApi(data);
      console.log('feedbackAction ', response);
      if (type != 'no') {
        showToast(appString[response.message]);
      }
      nav ? '' : dispatch(navigate({name: 'SettingsMenu'}));
    } catch (error) {
      setTimeout(() => {
        dispatch(removeAsyncWorkingRequest());
      }, 100);
      console.log('err ', error);
    } finally {
      console.log('finally ');

      setTimeout(() => {
        dispatch(removeAsyncWorkingRequest());
      }, 1000);
    }
  };
};

// export const getAppUrlAction = () => {
//   return async function(dispatch) {
//     try {
//       dispatch(addAsyncWorkingRequest());
//       const response = await getAppStoreUrlApi();
//       console.log('getAppUrlAction ', response)
//       dispatch(setUrlDetails(response.data));
//     } catch (error) {
//       console.log('err ', error);
//     } finally {
//       console.log('finally ');
//       dispatch(removeAsyncWorkingRequest());
//     }
//   };
// };

export const getsubscriptionDetailsAction = () => {
  return async function(dispatch) {
    try {
      dispatch(addAsyncWorkingRequest());
      const response = await subscriptionDetailsApi();
      //console.log('subscriptionDetailsAction ', response.data)
      dispatch(setSubsDetails(response.data));
    } catch (error) {
      console.log('err ', error);
    } finally {
      console.log('finally ');
      dispatch(removeAsyncWorkingRequest());
    }
  };
};

// getsubscriptionDetailsAction
