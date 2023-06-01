const INCREMENT_REQUEST_COUNT = 'INCREMENT_REQUEST_COUNT'
const DECREMENT_REQUEST_COUNT = 'DECREMENT_REQUEST_COUNT'

export const addAsyncWorkingRequest = () => {
  return {
    type: INCREMENT_REQUEST_COUNT,
  }
}

export const removeAsyncWorkingRequest = () => {
  return {
    type: DECREMENT_REQUEST_COUNT,
  }
}

const initialState = {
  visible: false,
}

// reducer function to manage the modal state
export default function systemWorking( state = initialState, action ) {
        
  switch ( action.type ) {
  case INCREMENT_REQUEST_COUNT:
              
    return {
      ...state,
      visible:true
    }

  case DECREMENT_REQUEST_COUNT:
    
    return {
      ...state,
      visible:false
    }

  default:
    return state
  }
}

