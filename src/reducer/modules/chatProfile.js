const CHAT_USER_IMAGE = 'CHAT_USER_IMAGE';

export const setProfileImage = (userImage) => {
  return {
    type: CHAT_USER_IMAGE,
    userImage
  }
}

const initialState = {
  userImage: null,
}

// reducer function to manage the modal state
export default function getUserProfileImage(state = initialState, action) {

  switch (action.type) {
    case CHAT_USER_IMAGE:
      return {
        ...state,
        userImage: action,
        }
  default:
      return state
  }
}



