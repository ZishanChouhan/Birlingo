const AFTER_LOGIN_GET_LEARNING_LANG = 'AFTER_LOGIN_GET_LEARNING_LANG';

export const setLearningAppAfterLogin = (getLearningLangAfterLogin) => {
  return {
    type: AFTER_LOGIN_GET_LEARNING_LANG,
    getLearningLangAfterLogin
  }
}

const initialState = {
    getLearningLangAfterLogin:'',
  }

// reducer function to manage the modal state
export default function appLearningAfterLogin(state = initialState, action) {
 
  switch (action.type) {
    case AFTER_LOGIN_GET_LEARNING_LANG:
      return {
        ...state,
        getLearningLangAfterLogin: action,
        }
  default:
      return state
  }
}



