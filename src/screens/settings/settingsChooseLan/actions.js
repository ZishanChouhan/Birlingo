import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  changeLearingApi,
  afterLoginlearningLanguagesApi,
} from "../../../api/settingsActions";
import RNRestart from 'react-native-restart';
import { setLearningAppAfterLogin } from "./reducer";
import * as ActionTypes from "../../../actions/actionTypes";
import { navigate } from "../../../actions/routing";
import {
  showToast,
  showDangerToast,
} from "../../../assets/utility/ToastMessage";
import { CommonActions } from "@react-navigation/native";
import { navigatorRef } from "../../../actions/navigationHelpers";
export const getAfterLoginLearningLangAction = () => {
  return async function(dispatch) {
    try {
      //console.log('languageId====== ', languageId)

      dispatch(serviceActionPending());
      const response = await afterLoginlearningLanguagesApi();
      //console.log('getLearningLangAction====== ', response)
      dispatch(setLearningAppAfterLogin(response));
      // dispatch(serviceActionSuccess(response))
    } catch (error) {
      //console.log('err ', error)
      dispatch(serviceActionError(error));
    } finally {
      dispatch(serviceActionError());
      // console.log('finally ')
    }
  };
};

export const changeLearningLanguage = (data, appString) => {
  return async function(dispatch) {
    try {
      // console.log('data ', data)
      dispatch(serviceActionPending());
      const response = await changeLearingApi(data);
           console.log('changeLearningLanguage ', response)
      if (response.statuscode === 200) {
        const responseLearning = await afterLoginlearningLanguagesApi();
        //console.log('getLearningLangAction====== ', responseLearning)
        dispatch(setLearningAppAfterLogin(responseLearning));
        await AsyncStorage.setItem("learning_language_id", JSON.stringify(response.data));
        showToast(appString[response.message]);
        setTimeout(() => {
          navigatorRef.dispatch(CommonActions.reset({
            index: 0,
            routes:[
              {name: 'LessonOverview'}
            ]
            })
          )
        }, Platform.OS == "ios" ? 500 : 500);
        dispatch(serviceActionSuccess(response));
        // setTimeout(() => {
        //   // RNRestart.Restart();
        //   dispatch(navigate("LessonOverview", {name: ""}))
        // }, 1000)
      } else {
        dispatch(serviceActionSuccess(response));
        showDangerToast(appString[response.message]);
      }
      dispatch(serviceActionSuccess(response));
    } catch (error) {
      // console.log('err ', error)
      dispatch(serviceActionError(error));
      //dispatch(serviceActionError(error))
    } finally {
      dispatch(serviceActionSuccess());
      // console.log('finally ')
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
