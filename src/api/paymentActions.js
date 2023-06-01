import { apiUrls } from './constants/constants'
import { doPost, doGet } from '../actions/fetchApiActions';
//import { token, loggedinId } from './getToken';

// export async function getLanguagesApi() {
//     return await doGet(`${apiUrls.getLanguages}`);
// }

export async function paymentApi(data) {
    return await doPost(`${apiUrls.subscribed}`, data);
}
export async function oneTimePaymentApi(data) {
    return await doPost(`${apiUrls.subscribeForOneTime}`, data);
}
export async function getSubscriptionStatusApi() {
    return await doGet(`${apiUrls.getSubsriptionStatus}`);
}

export async function subscribedForApplePayApi(data) {
    return await doPost(`${apiUrls.subscribedForApplePay}`, data);
}

export async function subscribedForGooglePayApi(data) {
    return await doPost(`${apiUrls.subscribedForGooglePay}`, data);
}