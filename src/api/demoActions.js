import { apiUrls } from './constants/constants'
import { doPost, doGet } from '../actions/fetchApiActions';
import { Alert } from 'react-native';
//import { token, loggedinId } from './getToken';

// export async function getLanguagesApi() {
//     return await doGet(`${apiUrls.getLanguages}`);
// }

export async function getDemoLessionApi(data) {
    return await doPost(`${apiUrls.app_demo}`, data);
}

export async function getLessionApi(data) {
    return await doPost(`${apiUrls.sentencesByLessonId}`, data);
}

export async function saveHistoryApi(data) {
    return await doPost(`${apiUrls.saveLessonHistory}`, data);
}