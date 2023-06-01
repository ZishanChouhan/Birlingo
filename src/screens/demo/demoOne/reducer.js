const GET_DEMO_LESSON = 'GET_DEMO_LESSON';

export const setDemoLesson = (demoLessonDetails) => { 
  return {
    type: GET_DEMO_LESSON,
    demoLessonDetails,
  };
};

const initialState = {
  demoLessonDetails: null,
};

// reducer function to manage the modal state
export default function demoLesson(state = initialState, action) { 

  switch (action.type) {
    case GET_DEMO_LESSON:
      return {
        ...state,
        demoLessonDetails: action,
      };

    default:
      return state;
  }
}
