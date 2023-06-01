const LOGIN_USER = 'LOGIN_USER';
const GEO_CODE = 'GEO_CODE';
const FORGOT_PASSWORD = 'FORGOT_PASSWORD';
export const setLoginUser = (user, userLoggedIn = false) => {
  return {
    type: LOGIN_USER,
    userLoggedIn: userLoggesdIn,
    user
  }
}

export const setGeoCode = (location) => {
  return {
    type: GEO_CODE,
    defaultLocation: location,
  }
}

export const setEmailDetails = (user) => {
  return {
    type: FORGOT_PASSWORD,
    user
  }
}

export const resetReducer = () => {
  return {
    type: "RESET"
  }
}

const initialState = {
  user: null,
  userLoggedIn: false,
  loginWith: 'app',
}

// reducer function to manage the modal state
export default function login(state = initialState, action) {

  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        user: action.user,
        userLoggedIn: action.userLoggedIn,
        loginWith: action.user ? (action.user.facebook_id ? 'fb' : action.user.google_id ? 'google' : action.user.twitter_id ? 'tw' : 'app') : 'app',
      }

    case FORGOT_PASSWORD:
      //console.log("FORGOT_PASSWORD ",action);
      return {
        ...state,
        user: action,
      }
    case "RESET":
      // console.log("login RESET called");

      return {
        user: null,
        userLoggedIn: false,
        loginWith: 'app'
      }
    default:
      return state
  }
}



