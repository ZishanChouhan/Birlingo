import {navigatorRef} from '../actions/navigationHelpers';

const IS_CONNECTED = 'IS_CONNECTED';
const VISIBLE = "VISIBLE";
const IN_DOWNLOADS = "IN_DOWNLOADS";

export const setNetConnected = (isConnected) => { 
  // console.log("navigatorRef", navigatorRef);
  console.log("getCurrentRoute", navigatorRef.getCurrentRoute());
  const currentRoute = navigatorRef.getCurrentRoute();
  if(currentRoute.name == "DownloadsList" || currentRoute.name =='LessonSentenceDownloads'){
    return {
      type: IN_DOWNLOADS,
      isConnected: isConnected,
    };
  }else{
    return {
      type: IS_CONNECTED,
      isConnected: isConnected,
    };
  }
};

export const setVisible = (visible) => { 
  return {
    type: VISIBLE,
    visible: visible,
  };
};

const initialState = {
  isConnected: true,
  visible: false
};

// reducer function to manage the modal state
export default function isNetConnected(state = initialState, action) { 

  switch (action.type) {
    case IS_CONNECTED:
      return {
        ...state,
        isConnected: action.isConnected,
        visible : !(action.isConnected)
      };
    case VISIBLE:
      return {
        ...state,
        visible : action.visible
      };
    case IN_DOWNLOADS:
      return {
        ...state,
        isConnected: action.isConnected,
      };

    default:
      return state;
  }
}