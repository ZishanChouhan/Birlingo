import { apiUrls } from './constants/constants'
import { doPost, doGet } from '../actions/fetchApiActions';
//import { token, loggedinId } from './getToken';

export async function getSubscriptionStatusApi() {
    return await doGet(`${apiUrls.getSubsriptionStatus}`);
}

export async function getLessonFamilyApi(data) {
    return await doPost(`${apiUrls.lesson_family}`, data);
}

export async function getLessonLibraryApi(data) {
    return await doPost(`${apiUrls.lesson_library}`, data);
}


// getSubscriptionStatusApi