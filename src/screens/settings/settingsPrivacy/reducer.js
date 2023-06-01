const GET_PRIVACY_POLICY = 'GET_PRIVACY_POLICY';
const AGB = 'AGB';

export const setPrivacyPolicy = (privacyPolicyDetails) => {
  return {
    type: GET_PRIVACY_POLICY,
    privacyPolicyDetails
  }
}

export const setAgb = (AgbDetails) => {
  return {
    type: AGB,
    AgbDetails
  }
}

const initialState = {
  privacyPolicyDetails: null,
  AgbDetails:null

}

// reducer function to manage the modal state
export default function privacyPolicy(state = initialState, action) {

  switch (action.type) {
    case GET_PRIVACY_POLICY:
      return {
        ...state,
        privacyPolicyDetails: action,
      }

    default:
      return state
  }
}

export function Agb(state = initialState, action) {

  switch (action.type) {
    case AGB:
      return {
        ...state,
        AgbDetails: action,
      }

    default:
      return state
  }
}



