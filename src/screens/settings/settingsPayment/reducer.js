const GET_User_Details = 'GET_User_Details';

export const setUserDetails = (userDetails) => {
  return {
    type: GET_User_Details,
    userDetails
  }
}

const initialState = {
    userDetails: null,

}

// reducer function to manage the modal state
export default function detailUser(state = initialState, action) {
// console.log("detailUser", action);
 
  switch (action.type) {
    case GET_User_Details:
      return {
        ...state,
        userDetails: action,
        }
  
  default:
      return state
  }
}



