import { apiUrls } from './constants/constants'
import { doPost, doGet } from '../actions/fetchApiActions';
// import { token, loggedinId } from './getToken';

export async function getAppGuideApi(languageId) {
  return await doPost(`${apiUrls.app_guide}`, languageId);
}

export async function userLogin(data) {
  return await doPost(`${apiUrls.login}`, data);
}

export async function userFacebookLogin(data) {
  return await doPost(`${apiUrls.loginwithfacebook}`, data);
}

export async function userGoogleLogin(data) {
  return await doPost(`${apiUrls.loginwithgoogle}`, data);
}


export async function fotgotPasswordApi(data) {
  return await doPost(`${apiUrls.forgotpassword}`, data);
}

export async function resetPasswordApi(data) {
  return await doPost(`${apiUrls.resetpassword}`, data);
}

export async function getLearningLanguagesApi(langId) {
  return await doGet(`${apiUrls.learningLanguages}/${langId}`);
}

export async function userRegistrationApi(data) {
  return await doPost(`${apiUrls.registration}`, data);
}

export async function otpVerifyApi(data) {
  return await doPost(`${apiUrls.verifyOtp}`, data);
}

export async function resendOtpApi(data) {
  return await doPost(`${apiUrls.resendotp}`, data);
}

export async function getCountries(languageId) {
  return await doGet(`${apiUrls.countries}`);
}
// export async function getLastTermDate(languageId) {
//   return await doPost(`${apiUrls.getLastInsertedTermDate}`, languageId);
// }