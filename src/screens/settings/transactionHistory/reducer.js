const GET_TRANSACTION_HISTORY = 'GET_TRANSACTION_HISTORY';

export const setTransactionHistory = (history) => {
  return {
    type: GET_TRANSACTION_HISTORY,
    history
  }
}

const initialState = {
  history: null,
}

// reducer function to manage the modal state
export default function transactionHistory(state = initialState, action) {
// console.log("detailUser", action);
 
  switch (action.type) {
    case GET_TRANSACTION_HISTORY:
      return {
        ...state,
        history: action,
        }
  
  default:
      return state
  }
}