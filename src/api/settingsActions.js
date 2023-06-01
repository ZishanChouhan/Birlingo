import { apiUrls } from './constants/constants'
import { doPost, doGet } from '../actions/fetchApiActions';

export async function getUserDetailsApi(userId) {
  return await doGet(`${apiUrls.getManageAccount}/${userId}`);
}

export async function updateProfileApi(data) {
  return await doPost(`${apiUrls.updateManageAccount}`, data);
}

export async function removeProfileApi() {
  return await doPost(`${apiUrls.removeUserProfile}`, {});
}

export async function changePasswordApi(data) {
  return await doPost(`${apiUrls.changepassword}`, data);
}

export async function changeLearingApi(languageId) {
  return await doPost(`${apiUrls.updatelearninglang}`, languageId);
}

export async function getPrivacyPolicyApi(data) {
  return await doPost(`${apiUrls.privacy_policy}`, data);
}

export async function getAgbApi(data) {
  return await doPost(`${apiUrls.agb}`, data);
}

export async function getTermConditionApi(data) {
  return await doPost(`${apiUrls.terms_conditions}`, data);
}

export async function getSubscriptionApi(data) {
  return await doPost(`${apiUrls.subscriptions}`, data);
}

export async function afterLoginlearningLanguagesApi() {
  return await doGet(`${apiUrls.afterLoginlearningLanguages}`);
}

export async function logoutApi(data) {
  return await doPost(`${apiUrls.logout}`, data);
}

export async function getRatingApi() {
  return await doGet(`${apiUrls.getRatings}`);
}

export async function feedbackApi(data) {
  return await doPost(`${apiUrls.rating}`, data);
}

export async function getAppStoreUrlApi() {
  return await doGet(`${apiUrls.getStoreUrl}`);
}

export async function cancelPlanApi(data) {
  return await doPost(`${apiUrls.cancelSubscription}`, data);
}

export async function subscriptionDetailsApi() {
  return await doGet(`${apiUrls.susbcontent}`);
}

export async function subscriptionContentsApi() {
  return await doGet(`${apiUrls.getSubscriptionContent}`);
}

export async function getAccessTokenApi() {
  return await doGet(`${apiUrls.accessToken}`);
}
export async function getTransactionHistory(page) {
  return await doGet(`${apiUrls.getTransactionHistory}`, page);
}
