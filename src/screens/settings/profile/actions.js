import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  updateProfileApi,
  getUserDetailsApi,
  removeProfileApi,
  logoutApi,
} from "../../../api/settingsActions";
import { setUserDetails } from "./reducer";
import * as ActionTypes from "../../../actions/actionTypes";
import { navigate } from "../../../actions/routing";
import {
  showToast,
  showDangerToast,
} from "../../../assets/utility/ToastMessage";
import {
  addAsyncWorkingRequest,
  removeAsyncWorkingRequest,
} from "../../../reducer/modules/systemWorking";

export const getUserProfileAction = (userId, appString) => {
  return async function(dispatch) {
    try {
      dispatch(addAsyncWorkingRequest());
      // dispatch(serviceActionPending());
      console.log("userId", userId);
      const response = await getUserDetailsApi(userId);
      console.log('getUserProfileAction', response)
      dispatch(setUserDetails(response.data.user_info));
      dispatch(removeAsyncWorkingRequest());
    } catch (error) {
      console.log("err ", error);
      //dispatch(serviceActionError(error))
    } finally {
      dispatch(removeAsyncWorkingRequest());
      // console.log("finally ");
    }
  };
};

export const removeProfileAction = (appString) => {
  return async function(dispatch) {
    try {
      dispatch(serviceActionPending());
      const response = await removeProfileApi();
      console.log("removeProfileAction response", response);
      if (response.statuscode === 200) {
        console.log("response.message 1", appString[response.message]);
        showToast(appString[response.message], (type = "success"));
        AsyncStorage.getItem("authUser", async (err1, item1) => {
          if (item1 != null) {
            var userDetails = JSON.parse(item1);
            data = {
              user_id: userDetails && userDetails._id,
            };
            const response = await logoutApi(data);
            console.log("logoutAction====== ", response);
            AsyncStorage.removeItem("authUser");
            await AsyncStorage.removeItem("learning_language_id");
            await AsyncStorage.removeItem("rememberLesson");
            global.logout = 1;
            dispatch(navigate({ name: "AuthLoading" }));
          } else {
          }
        });
        // dispatch(setUserDetails(response.data.user))
        // dispatch(navigate({ routeName: 'settingsProfile' }))
        dispatch(serviceActionSuccess(response));
      } else {
        dispatch(serviceActionSuccess(response));
        console.log("response.message 2", appString[response.message]);

        showToast(appString[response.message], (type = "success"));
      }
      dispatch(serviceActionSuccess(response));
    } catch (error) {
      console.log("err ", error);
      dispatch(serviceActionError(error));
    } finally {
      dispatch(serviceActionSuccess());
      // console.log("finally ");
    }
  };
};

export const updateProfileAction = (data, appString, initialEmail) => {
  return async function(dispatch) {
    try {
      dispatch(serviceActionPending());
      const response = await updateProfileApi(data);
      console.log("updateProfileAction response", response);
      if (response.statuscode === 200) {
        console.log("response.message 1", appString[response.message]);
        showToast(appString[response.message], (type = "success"));
        dispatch(setUserDetails(response.data.user));
        if(response.data.type == "new_email_verification"){
          dispatch(navigate("VerifyOtp", {email: data.email,initialEmail :initialEmail, screen: "SettingsProfile"} ));
        }else{
          dispatch(navigate({ name: "SettingsProfile" }));
        }
        dispatch(serviceActionSuccess(response));
      } else {
        dispatch(serviceActionSuccess(response));
        console.log("response.message 2", appString[response.message]);

        showToast(appString[response.message], (type = "success"));
      }
      dispatch(serviceActionSuccess(response));
    } catch (error) {
      console.log("err ", error);
      dispatch(serviceActionError(error));
      //dispatch(serviceActionError(error))
    } finally {
      dispatch(serviceActionSuccess());
      // console.log("finally ");
    }
  };
};

export const serviceActionPending = () => (
  console.log("serviceActionPending"),
  {
    type: ActionTypes.SERVICE_PENDING,
  }
);

export const serviceActionError = (error) => (
  console.log("serviceActionError"),
  {
    type: ActionTypes.SERVICE_ERROR,
    error: error,
  }
);

export const serviceActionSuccess = (data) => (
  console.log("serviceActionSuccess"),
  {
    type: ActionTypes.SERVICE_SUCCESS,
    data: data,
  }
);
