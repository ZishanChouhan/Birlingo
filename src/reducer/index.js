import {applyMiddleware, compose, createStore, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {
  persistCombineReducers,
  persistStore,
  persistReducer,
} from 'redux-persist';
//import storage from "redux-persist/lib/storage";
import AsyncStorage from '@react-native-async-storage/async-storage';
//import login from './modules/login';
import appLanguage from '../screens/selectLanguage/reducer';
import serviceReducer from './modules/serviceReducer';
import lastTermDateReducer from './modules/lastTermdateReducer';
import authReducer from '../screens/login/reducer';
import loopReducer from '../screens/stopLoop/reducer';
import signUpReducer from '../screens/signUpScreen/reducer';
import systemWorking from './modules/systemWorking';
import userDetails from '../screens/settings/profile/reducer';
import afterLoginLearningLang from '../screens/settings/settingsChooseLan/reducer';
import termCondition from '../screens/settings/settingsTerms/reducer';
import privacyPolicy from '../screens/settings/settingsPrivacy/reducer';
import {Agb} from '../screens/settings/settingsPrivacy/reducer';
import lessonFamily from '../screens/lessonOverview/lessonOverviewChoose/reducer';
import subscription from '../screens/settings/settingsAccount/reducer';
import demoLesson from '../screens/demo/demoOne/reducer';
import lessonSentence from '../screens/lessons/lessonSentence/lessonReducer';
import support from '../screens/settings/settingsSupport/reducer';
import lessonLibrary from '../screens/lessonOverview/lessonOverviewDownload/reducer';
import netReducer from './modules/offLineReducer';
import transactionHistory from '../screens/settings/transactionHistory/reducer';
import rating from '../screens/settings/settingsRate/reducer';
import getUrlDetails from '../screens/settings/settingsRate/getUrlReducer';
// import getSubsDetails from '../screens/settings/settingChooseSubscription/reducer';
import userTokenReducer from './modules/user';
import lessonSentenceDownloads from '../screens/downloads/lessonSentenceDownloads/lessonReducer';
import isNetConnected from "../navigation/AppReducer";
// import { composeWithDevTools } from 'redux-devtools-extension';
const config = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [
    'userTokenReducer',
  ],
};

const appReducer = combineReducers({
  systemWorking,
  appLanguage,
  serviceReducer,
  lastTermDateReducer,
  authReducer,
  loopReducer,
  signUpReducer,
  userDetails,
  afterLoginLearningLang,
  termCondition,
  privacyPolicy,
  lessonFamily,
  subscription,
  demoLesson,
  support,
  transactionHistory,
  lessonLibrary,
  lessonSentence,
  netReducer,
  rating,
  getUrlDetails,
  // getSubsDetails,
  Agb,
  userTokenReducer,
  lessonSentenceDownloads,
  isNetConnected
});
const rootReducer = persistReducer(config, appReducer);
store = createStore(rootReducer, applyMiddleware(thunk));
persistStore(store);
export default store;
