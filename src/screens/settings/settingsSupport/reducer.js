const GET_SUPPORT_DETAILS = 'GET_SUPPORT_DETAILS';

export const setSupportDetails = (supportDetails) => {
  return {
    type: GET_SUPPORT_DETAILS,
    supportDetails
  }
}

const initialState = {
  supportDetails: null,

}

// reducer function to manage the modal state
export default function supportDetails(state = initialState, action) {

  switch (action.type) {
    case GET_SUPPORT_DETAILS:
      return {
        ...state,
        supportDetails: action,
      }

    default:
      return state
  }
}



