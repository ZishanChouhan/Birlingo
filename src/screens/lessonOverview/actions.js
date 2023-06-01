import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getLessonFamilyApi,
  getLessonLibraryApi,
  getSubscriptionStatusApi,
} from '../../api/lessonFamilyActions';
import {setLessonFamily} from './lessonOverviewChoose/reducer';
import {setLessonLibrary} from './lessonOverviewDownload/reducer';
import * as ActionTypes from '../../actions/actionTypes';
import {navigate} from '../../actions/routing';

import {
  addAsyncWorkingRequest,
  removeAsyncWorkingRequest,
} from '../../reducer/modules/systemWorking';

export const getLessonFamilyAction = (data) => {
  return async function (dispatch) {
    try {
      dispatch(addAsyncWorkingRequest());
      console.log("data",data);
      const response = await getLessonFamilyApi(data);
      console.log("responsibe", response);
      if(response){

        dispatch(setLessonFamily(response.data));
        dispatch(removeAsyncWorkingRequest());
      }
      // const subs_response = await getSubscriptionStatusApi();
      // await AsyncStorage.setItem("subscriptionStatus", JSON.stringify(subs_response.data));
    } catch (error) {
      console.log('err ', error);
    } finally {
      // console.log('finally ');
      dispatch(removeAsyncWorkingRequest());
    }
  };
};

export const getLessonLibraryAction = (data, appString) => { 
  return async function (dispatch) {
    try {
      dispatch(addAsyncWorkingRequest());
      const response = await getLessonLibraryApi(data);
      console.log("response", response);
      if(response){
        dispatch(setLessonLibrary(response.data));

      }
    } catch (error) {
      console.log('err ', error);
    } finally {
      // console.log('finally ');
      dispatch(removeAsyncWorkingRequest());
    }
  };
};

export const getSubscriptionStatusAction = () => {
  return async function (dispatch) {
    try {
      const response = await getSubscriptionStatusApi();
      console.log("is_subscribed", response);
      if(response){
        await AsyncStorage.setItem(
          'subscriptionStatus',
          JSON.stringify(response.data),
        );
      }
    } catch (error) {
      console.log('err ', error);
    } finally {
      // console.log('finally ');
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
