const GET_APP_GUIDE = 'GET_APP_GUIDE';

export const setAppGuide = (getAppGuide) => {
  return {
    type: GET_APP_GUIDE,
    getAppGuide
  }
}

const initialState = {
  getAppGuide:'',
  }

// reducer function to manage the modal state
export default function appGuide(state = initialState, action) {
 
  switch (action.type) {
    case GET_APP_GUIDE:
      return {
        ...state,
        getAppGuide: action,
        }
  default:
      return state
  }
}



