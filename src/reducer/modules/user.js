export const USER_TOKEN = 'USER_TOKEN';

const initialState = {
    USER_TOKEN: '',
};

const userTokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_TOKEN:
      return {
        ...state,
        USER_TOKEN: action.payload
      };
    
    default:
      return state;
  }
}
export default userTokenReducer;