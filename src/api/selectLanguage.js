import { apiUrls } from './constants/constants'
import { doPost, doGet } from '../actions/fetchApiActions';
//import { token, loggedinId } from './getToken';

export async function getLanguagesApi() {
  return await doGet(`${apiUrls.getLanguages}`);
}

export async function getLanguageString(languageId) {
  return await doPost(`${apiUrls.getLanguagesString}`, languageId);
}

export async function getLastTermDate(languageId) {
  return await doPost(`${apiUrls.getLastInsertedTermDate}`, languageId);
}

export async function getNativeLanguagesApi() {
  return await doGet(`${apiUrls.getNativeLanguages}`);
}

export async function getLanguageTerms(languageId) {
  return await doPost(`${apiUrls.getLanguagesTerms}`, languageId);
}