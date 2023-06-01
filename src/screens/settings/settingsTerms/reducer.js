const GET_TERM_CONDITION = 'GET_TERM_CONDITION';

export const setTermCondition = (termConditionDetails) => {
  return {
    type: GET_TERM_CONDITION,
    termConditionDetails
  }
}

const initialState = {
  termConditionDetails: null,

}

// reducer function to manage the modal state
export default function termCondition(state = initialState, action) {

  switch (action.type) {
    case GET_TERM_CONDITION:
      return {
        ...state,
        termConditionDetails: action,
      }

    default:
      return state
  }
}



