const GET_LEARNING_LANG = 'GET_LEARNING_LANG';
const GET_COUNTRIES     = 'GET_COUNTRIES';

export const setLearningApp = (getLearningLanguages) => {
  return {
    type: GET_LEARNING_LANG,
    getLearningLanguages
  }
}
export const setCountries = (countries) => {
  return {
    type: GET_COUNTRIES,
    countries
  }
}

const initialState = {
    getLearningLanguages:'',
    countries: ""
  }

// reducer function to manage the modal state
export default function appLearning(state = initialState, action) {
 
  switch (action.type) {
    case GET_LEARNING_LANG:
      return {
        ...state,
        getLearningLanguages: action,
        }
    case GET_COUNTRIES:
      return {
        ...state,
        countries: action,
        }
  default:
      return state
  }
}



