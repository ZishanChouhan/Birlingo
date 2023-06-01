
const GET_LAST_TERM_DATE = 'GET_LAST_TERM_DATE';

export const setLastTermDate = (getLastTermDate) => {
  return {
    type: GET_LAST_TERM_DATE,
    getLastTermDate
  }
 }

const initialState = {
  getLastTermDate:''
}

// reducer function to manage the modal state
export default function termDate(state = initialState, action) {
  switch (action.type) {
   
    case GET_LAST_TERM_DATE:
      return {
        ...state,
        getLastTermDate: action,
        }     
   
  default:
      return state
  }
}



