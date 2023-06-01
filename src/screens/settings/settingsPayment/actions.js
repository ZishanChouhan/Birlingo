import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  addAsyncWorkingRequest,
  removeAsyncWorkingRequest,
} from "../../../reducer/modules/systemWorking";
import {
  paymentApi,
  getSubscriptionStatusApi,
  subscribedForApplePayApi,
  oneTimePaymentApi,
  subscribedForGooglePayApi,
} from "../../../api/paymentActions";
import { setUserDetails } from "./reducer";
import * as ActionTypes from "../../../actions/actionTypes";
import { navigate } from "../../../actions/routing";
import {
  showToast,
  showDangerToast,
} from "../../../assets/utility/ToastMessage";

export const paymentAction = (data, appString) => {
  return async function(dispatch) {
    try {
      dispatch(addAsyncWorkingRequest());
      console.log("data", data);
      let response;
      if(data.subscription_id !== "6053388673a4430b580f01ae"){
        response = await paymentApi(data);
      }
      else{
        const data1 = {
          stripeToken: data.stripeToken,
          subscription_id: data.subscription_id,
          price: '99.99'
        }
        response = await oneTimePaymentApi(data1);
      }
      
      console.log("paymentApi response", response);
      const subscribeResponse = await getSubscriptionStatusApi();
      console.log("getSubscriptionStatusAction", response);
      await AsyncStorage.setItem(
        "subscriptionStatus",
        JSON.stringify(subscribeResponse.data)
      );
      if (response.statuscode === 200) {
        showToast(appString[response.message]);
        dispatch(navigate({ name: "LessonOverviewChoose" }));
      }
      if (response.statuscode === 400) {
        showDangerToast(appString[response.message]);
      }
      //dispatch(setUserDetails(response.data))
    } catch (error) {
      console.log("err ", error);
    } finally {
      // console.log("finally ");
      dispatch(removeAsyncWorkingRequest());
    }
  };
};

export const subscribedForApplePay = (data, appString) => {
  // console.log("subscribed for apple pay api hit");
  return async function(dispatch) {
    try {
      dispatch(addAsyncWorkingRequest());
      console.log("data from subscribedForApplePay", data);

      const response = await subscribedForApplePayApi(data);
      console.log("subscribedForApplePay response", response);
      const subscribeResponse = await getSubscriptionStatusApi();
      console.log(
        "getSubscriptionStatusAction from subscribedForApplePay",
        subscribeResponse
      );
      await AsyncStorage.setItem(
        "subscriptionStatus",
        JSON.stringify(subscribeResponse.data)
      );
      if (response.statuscode === 200) {
        showToast(appString[response.message]);
        dispatch(navigate({ name: "LessonOverviewChoose" }));
      }
      if (response.statuscode === 400) {
        showDangerToast(appString[response.message]);
      }
      //dispatch(setUserDetails(response.data))
    } catch (error) {
      console.log("err ", error);
    } finally {
      // console.log("finally ");
      dispatch(removeAsyncWorkingRequest());
    }
  };
};

export const subscribedForGooglePay = (data, appString) => {
  return async function(dispatch) {
    try {
      dispatch(addAsyncWorkingRequest());
      console.log("data from subscribedForGooglePay", data);

      const response = await subscribedForGooglePayApi(data);
      console.log("subscribedForGooglePay response", response);
      const subscribeResponse = await getSubscriptionStatusApi();
      console.log(
        "getSubscriptionStatusAction from subscribedForGooglePay",
        subscribeResponse
      );
      await AsyncStorage.setItem(
        "subscriptionStatus",
        JSON.stringify(subscribeResponse.data)
      );
      if (response.statuscode === 200) {
        showToast(appString[response.message]);
        dispatch(navigate({ name: "LessonOverviewChoose" }));
      }
      if (response.statuscode === 400) {
        showDangerToast(appString[response.message]);
      }
      //dispatch(setUserDetails(response.data))
    } catch (error) {
      console.log("err ", error);
    } finally {
      // console.log("finally ");
      dispatch(removeAsyncWorkingRequest());
    }
  };
};
