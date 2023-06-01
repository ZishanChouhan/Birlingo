import { getTransactionHistory } from "../../../api/settingsActions";
import { setTransactionHistory } from "./reducer";
import * as ActionTypes from "../../../actions/actionTypes";
import { navigate } from "../../../actions/routing";
import {
  showToast,
  showDangerToast,
} from "../../../assets/utility/ToastMessage";

export const getTransactionHistoryAction = (page) => {
  return async function(dispatch) {
    try {
      dispatch(serviceActionPending());
      // console.log('page', page);
      const response = await getTransactionHistory(page);
      console.log("getTransactionHistory ", response);
      if (response.statuscode === 200) {
        // showToast(appString[response.message]);
        dispatch(serviceActionSuccess(response));
          dispatch(setTransactionHistory(response.data));
      } else {
        dispatch(serviceActionSuccess(response));
        // showDangerToast(appString[response.message]);
      }
      //dispatch(setUserDetails(response.data.user_info))
      // dispatch(serviceActionSuccess(response));
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
