import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  addAsyncWorkingRequest,
  removeAsyncWorkingRequest,
} from "../../reducer/modules/systemWorking";
import {
  getLearningLanguagesApi,
  userRegistrationApi,
  otpVerifyApi,
  logoutApi,
  fotgotPasswordApi,
  resetPasswordApi,
  resendOtpApi,
  getCountries
} from "../../api/getAppGuide";
import { setLearningApp, setCountries } from "./reducer";
import * as ActionTypes from "../../actions/actionTypes";
import { navigate } from "../../actions/routing";
import { showToast, showDangerToast } from "../../assets/utility/ToastMessage";
import { userToken } from "../../reducer/modules/userTokenAction";

export const getLearningLangAction = (languageId) => {
  return async function(dispatch) {
    try {
      console.log("languageId ", languageId);
      dispatch(serviceActionPending());
      const response = await getLearningLanguagesApi(languageId);
      // console.log('getLearningLangAction ', response)
      dispatch(setLearningApp(response));
    } catch (error) {
      //console.log('err ', error)
      dispatch(serviceActionError(error));
    } finally {
      dispatch(serviceActionError());
      // console.log('finally ')
    }
  };
};

export const userRegistrationAction = (data, nav, appString) => {
  return async function(dispatch) {
    try {
      dispatch(serviceActionPending());
      const response = await userRegistrationApi(data);
      console.log('response', response);
      if (response.statuscode === 400) {
        showDangerToast(appString[response.message]);
      } else {
        if (response.data.status === 1) {
          await AsyncStorage.setItem("authUser", JSON.stringify(response.data));
          await AsyncStorage.setItem("learning_language_id", JSON.stringify(response.data.learning_language_id));
          // await AsyncStorage.setItem(
          //   "learning_language_id",
          //   JSON.stringify(response.data.learning_language_id)
          // );
          // dispatch(navigate({ name: "Visitor" }));
        } else {
          showToast(appString[response.message]);
          dispatch(
            navigate({
              name: "VerifyOtp",
              params: { email: response.data.email, screen: nav },
            })
          );
        }
      }
    } catch (error) {
      showDangerToast(appString[response.message]);
      // console.log('err ', error)
      dispatch(serviceActionError());
    } finally {
      // console.log('finally ')
      dispatch(serviceActionError());
    }
  };
};

export const otpVerifyAction = (data, lastNav, appString) => {
  console.log("data, lastNav", data, lastNav);
  return async function(dispatch) {
    try {
      dispatch(addAsyncWorkingRequest());
      const response = await otpVerifyApi(data);
      console.log("otpVerifyAction ==>", response);

      if (response.statuscode === 400) {
        showDangerToast(appString[response.message]);
      } else {
        if (lastNav === "forgotPass") {
          console.log(" if condition");

          showToast(appString[response.message]);
          dispatch(
            navigate({
              name: "ResetPassword",
              params: { email: response.data.email },
            })
          );
        } else if (
          lastNav === "fb" ||
          lastNav === "google" ||
          lastNav === "login" ||
          lastNav === "registration"
        ) {
          dispatch(userToken(response?.data.token));
          await AsyncStorage.setItem("authUser", JSON.stringify(response.data));
          await AsyncStorage.setItem("learning_language_id", JSON.stringify(response.data.learning_language_id));
          // await AsyncStorage.setItem(
          //   "learning_language_id",
          //   JSON.stringify(response.data.learning_language_id)
          // );
          
          global.AuthToken = response.data.token;

          //  dispatch(navigate({ routeName: 'demoOne', params: { demoDetails: response.data } }))
          // dispatch(navigate({ routeName: "dashboard" }));
          dispatch(navigate({name: "MethodVideo" }));
        } else {
          console.log(" else condition");
        }
        dispatch(removeAsyncWorkingRequest());
      }
    } catch (error) {
      console.log("err ", error);
    } finally {
      // console.log("finally ");
      dispatch(removeAsyncWorkingRequest());
    }
  };
};

export const resendOtpAction = (data, appString) => {
  return async function(dispatch) {
    try {
      dispatch(serviceActionPending());
      const response = await resendOtpApi(data);
      // console.log('resendOtpAction====== ', response)
      if (response.statuscode === 400) {
        showDangerToast(appString[response.message]);
        dispatch(serviceActionSuccess(response));
      } else {
        showToast(appString[response.message]);
        dispatch(serviceActionSuccess(response));
      }
      dispatch(serviceActionSuccess(response));
    } catch (error) {
      // console.log('err ', error)
      dispatch(serviceActionError(error));
    } finally {
      // console.log('finally ')
      //dispatch(serviceActionSuccess())
    }
  };
};

export const forgotPasswordAction = (data, appString) => {
  return async function(dispatch) {
    try {
      dispatch(addAsyncWorkingRequest());
      // dispatch(serviceActionPending())

      const response = await fotgotPasswordApi(data);
      //console.log('forgotPasswordAction====== ', response.statuscode)
      if (response.statuscode === 400) {
        //   console.log('error')
        showDangerToast(appString[response.message]);
        //dispatch(serviceActionSuccess(response))
      } else {
        //  console.log('errorSuccess1')

        showToast(appString[response.message]);
        dispatch(
          navigate({
            name: "VerifyOtp",
            params: { email: response.data.email, screen: "forgotPass" },
          })
        );
        //dispatch(serviceActionSuccess(response))
        //  console.log('errorSuccess2')
      }
      //dispatch(serviceActionSuccess(response))
    } catch (error) {
      // console.log('err ', error)
      dispatch(serviceActionError(error));
    } finally {
      // console.log('finally ')
      dispatch(removeAsyncWorkingRequest());
      // dispatch(serviceActionError())
    }
  };
};

export const resetPassAction = (data, appString) => {
  return async function(dispatch) {
    try {
      dispatch(serviceActionPending());
      const response = await resetPasswordApi(data);
      //console.log('resetPassAction====== ', response)
      if (response.statuscode === 200) {
        showToast(appString[response.message]);
        dispatch(navigate({ name: "Login" }));
        dispatch(serviceActionSuccess(response));
      } else {
        showDangerToast(appString[response.message]);
        dispatch(serviceActionSuccess(response));
      }
      dispatch(serviceActionSuccess(response));
    } catch (error) {
      //  console.log('err ', error)
      dispatch(serviceActionError(error));
    } finally {
      //   console.log('finally ')
      // dispatch(serviceActionError())
    }
  };
};

export const getCountriesAction = () => {
  return async function (dispatch) {
    try {
      // dispatch(serviceActionPending());
      const response = await getCountries();
      console.log("response", response);
      dispatch(setCountries(response.data));
    } catch (error) {
      console.log('err ', error);
      // dispatch(serviceActionError(error));
    } finally {
      // console.log('finally ');
      // dispatch(serviceActionSuccess());
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
