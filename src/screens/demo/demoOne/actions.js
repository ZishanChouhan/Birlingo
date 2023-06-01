import AsyncStorage from '@react-native-async-storage/async-storage';
import {getDemoLessionApi, saveHistoryApi} from '../../../api/demoActions';
import {setDemoLesson} from './reducer';
//import { setLessonSentence } from './lessonReducer';
import * as ActionTypes from '../../../actions/actionTypes';
import {navigate} from '../../../actions/routing';

import {
  addAsyncWorkingRequest,
  removeAsyncWorkingRequest,
} from '../../../reducer/modules/systemWorking';
import {getLessonFamilyApi} from '../../../api/lessonFamilyActions';
import {setLessonFamily} from '../../lessonOverview/lessonOverviewChoose/reducer';
export const demoAction = (data, appString) => {
  console.log('data in demo action', data);
  return async function (dispatch) {
    try {
      // dispatch(addAsyncWorkingRequest());

      const response = await getDemoLessionApi(data);
      console.log('demoAction response', response);
      // dispatch(removeAsyncWorkingRequest());
      // dispatch(setDemoLesson(response.data));
      dispatch(setDemoLesson(response.data));
    } catch (error) {
      console.log('err ', error);
    } finally {
      // console.log('finally ');
      // dispatch(removeAsyncWorkingRequest());
    }
  };
};

export const saveHistoryAction = (data, navType) => {
  return async function (dispatch) {
    try {
      // console.log('lessonAction demo data ', data)
      const response = await saveHistoryApi(data);
      console.log('saveHistoryAction response', response);
      if (response) {
        // const postData = {
        //   lessonfamily_id: response.language_id,
        // };
        // const responseList = await getLessonFamilyApi(postData);
        //console.log('getLessonLibraryAction', responseList)
        // dispatch(setLessonFamily(responseList.data));
        // // console.log("navType   =>>>>", navType); //chooseSubscription

        if (navType === 'subscrib') {
          dispatch(navigate({name: 'ChooseSubscription'}));
        }
      }
    } catch (error) {
      console.log('err lessonAction', error);
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
