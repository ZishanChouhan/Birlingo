const START_STOP_LOOP = 'START_STOP_LOOP';

export const startStopLoop = (loop) => {
  return {
    type: START_STOP_LOOP,
    loop
  }
}

const initialState = {
  loop:0,
  }

// reducer function to manage the modal state
export default function appGuide(state = initialState, action) {
 
  switch (action.type) {
    case START_STOP_LOOP:
      return {
        ...state,
        loop: action,
        }
  default:
      return state
  }
}