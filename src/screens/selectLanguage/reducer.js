const GET_APP_LANGUAGES = 'GET_APP_LANGUAGES';
const GET_APP_STRING = 'GET_APP_STRING';
const GET_LAST_TERM_DATE = 'GET_LAST_TERM_DATE';
export const setAppLanguage = (getAppLanguage) => {
  return {
    type: GET_APP_LANGUAGES,
    getAppLanguage
  }
}

export const setAppString = (getAppString) => {
  return {
    type: GET_APP_STRING,
    getAppString
  }
 }

export const setLastTermDate = (getLastTermDate) => {
  return {
    type: GET_LAST_TERM_DATE,
    getLastTermDate
  }
 }

const initialState = {
  getAppLanguage: null,
  getAppString:'',
  getLastTermDate:''
}

// reducer function to manage the modal state
export default function appLanguage(state = initialState, action) {
 
  switch (action.type) {
    case GET_APP_LANGUAGES:
      return {
        ...state,
        getAppLanguage: action,
        }
    case GET_LAST_TERM_DATE:
      return {
        ...state,
        getLastTermDate: action,
        }     
    case GET_APP_STRING:
      return {
        ...state,
        getAppString: action.getAppString,
        }
  default:
      return state
  }
}



