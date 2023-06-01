const GET_LESSON_FAMILY = 'GET_LESSON_FAMILY';

export const setLessonFamily = (lessonFamilyList) => {
  return {
    type: GET_LESSON_FAMILY,
    lessonFamilyList
  }
}

const initialState = {
  lessonFamilyList: null,

}

// reducer function to manage the modal state
export default function lessonFamily(state = initialState, action) {
  // console.log("detailUser", action);

  switch (action.type) {
    case GET_LESSON_FAMILY:
      return {
        ...state,
        lessonFamilyList: action,
      }

    default:
      return state
  }
}



