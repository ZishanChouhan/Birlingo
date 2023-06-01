import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  addAsyncWorkingRequest,
  removeAsyncWorkingRequest,
} from "../../reducer/modules/systemWorking";
import {
  getAppGuideApi,
  userLogin,
  userFacebookLogin,
  userGoogleLogin,
} from "../../api/getAppGuide";
import { setAppGuide } from "./reducer";
import { setInternetConnection } from "../../reducer/modules/offLineReducer";
import * as ActionTypes from "../../actions/actionTypes";
import { navigate } from "../../actions/routing";
import { showToast, showDangerToast } from "../../assets/utility/ToastMessage";
import { userToken } from "../../reducer/modules/userTokenAction";

export const getAppGuideAction = (languageId) => {
  return async function(dispatch) {
    try {
      dispatch(addAsyncWorkingRequest());

      const response = await getAppGuideApi(languageId);
      console.log('getAppGuideAction ', response)
      dispatch(setAppGuide(response));
      //  dispatch(navigate({ routeName: navi }))
    } catch (error) {
      // console.log('err ', error)
    } finally {
      dispatch(removeAsyncWorkingRequest());
      //  console.log('finally ')
    }
  };
};

export const internetAction = (data) => {
  return async function(dispatch) {
    try {
      console.log("enter in internetAction  ");
      // dispatch(addAsyncWorkingRequest());
      dispatch(setInternetConnection(data));
    } catch (error) {
      console.log("err ", error);
    } finally {
      dispatch(removeAsyncWorkingRequest());
      // console.log("finally ");
    }
  };
};

export const userLoginAction = (data, appString, lastNav) => {
  return async function(dispatch) {
    try {
      dispatch(addAsyncWorkingRequest());
      const response = await userLogin(data);
      console.log("response.data =>", response);
      if (response.statuscode !== 400) {
        await AsyncStorage.setItem('access_token', response?.data.token);
        // setTokens(userToken(response?.data.token));
        dispatch(userToken(response?.data.token))
        // var now = new Date().getTime();
        // await AsyncStorage.setItem("setupTime", 84780000 + "");
        if (response.data.status === 0) {
          dispatch(
            navigate({
              name: "VerifyOtp",
              params: { email: response.data.email, screen: lastNav },
            })
          );

        } else {
          await AsyncStorage.setItem("authUser", JSON.stringify(response.data));
          await AsyncStorage.setItem(
            "learning_language_id",
            JSON.stringify(response.data.learning_language_id)
          );
          global.AuthToken = response.data.token;
          
          if (response.data.hasOwnProperty("isWeclomeProceed")) {
            if (response.data.isWeclomeProceed == 1) {
              dispatch(navigate("LessonOverviewChoose"));
            } else {
              dispatch(navigate({ name: "TabNavigator" }));
            }
          } else {
            dispatch(navigate({ name: "LessonOverviewChoose" }));
          }
          // dispatch(navigate({ routeName: 'Visitor' }))
        }
        AsyncStorage.getItem("rememberMe", (err1, item1) => {
          if (item1 != null) {
            var userDetails = JSON.parse(item1);
            if (userDetails.checked) {
              AsyncStorage.setItem(
                "loginDetails",
                JSON.stringify({
                  email: data.email,
                  password: data.password,
                  checked: userDetails.checked,
                })
              );
            } else {
              AsyncStorage.removeItem("loginDetails");
            }
          } else {
            AsyncStorage.removeItem("loginDetails");
          }
        });
      } else {
        showDangerToast(appString[response.message]);
      }
      setTimeout(() => {
        dispatch(removeAsyncWorkingRequest());
      }, 1000)
    } catch (error) {
      console.log("err ", error);
    } finally {
      // dispatch(removeAsyncWorkingRequest());
      // console.log("finally ");
    }
  };
};

export const facebookLoginAction = (data, json, appString, lastNav) => {
  return async function(dispatch) {
    try {
      dispatch(serviceActionPending());
      const response = await userFacebookLogin(data);
      //console.log('facebookLoginAction--- ', response)
      if (response.data.isCompleted === 0) {
        dispatch(
          navigate({
            name: "Signup",
            params: { email: response, userData: json, type: "fb" },
          })
        );
      } else {
        if (response.data !== null) {
          if (response.data.status === 0) {
            showToast(appString[response.message]);
            dispatch(
              navigate({
                name: "VerifyOtp",
                params: { email: response.data.email, screen: lastNav },
              })
            );
          } else {
            //showToast(appString[response.message]);
            await AsyncStorage.setItem(
              "authUser",
              JSON.stringify(response.data)
            );
            await AsyncStorage.setItem(
              "learning_language_id",
              JSON.stringify(response.data.learning_language_id)
            );
            global.AuthToken = response.data.token;
            dispatch(navigate({ routeName: "Visitor" }));
          }
        } else {
          showDangerToast(appString[response.message]);
        }
      }
    } catch (error) {
      // console.log('err ', error)
      dispatch(serviceActionError(error));
    } finally {
      dispatch(serviceActionSuccess());
      //  console.log('finally ')
    }
  };
};

export const googleLoginAction = (data, google, appString, lastNav) => {
  return async function(dispatch) {
    try {
      dispatch(serviceActionPending());
      const response = await userGoogleLogin(data);
      //console.log('googleLoginAction--- ', response)
      if (response.data.isCompleted === 0) {
        dispatch(
          navigate({
            name: "Signup",
            params: { email: response, userData: google, type: "google" },
          })
        );
      } else {
        if (response.data !== null) {
          if (response.data.status === 0) {
            showToast(appString[response.message]);
            dispatch(
              navigate({
                routeName: "VerifyOtp",
                params: { email: response.data.email, screen: lastNav },
              })
            );
          } else {
            // showToast(appString[response.message]);
            await AsyncStorage.setItem(
              "authUser",
              JSON.stringify(response.data)
            );
            await AsyncStorage.setItem(
              "learning_language_id",
              JSON.stringify(response.data.learning_language_id)
            );
            //console.log("response.data", response.data);
            global.AuthToken = response.data.token;
            // console.log("global.AuthToken", global.AuthToken);
            dispatch(navigate({ routeName: "Visitor" }));
          }
        } else {
          showDangerToast(appString[response.message]);
        }
      }
    } catch (error) {
      // console.log('err ', error)
      dispatch(serviceActionError(error));
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
