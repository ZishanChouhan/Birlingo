const GET_LESSON_LIBRARY = 'GET_LESSON_LIBRARY';

export const setLessonLibrary = (lessonLibraryList) => {
  return {
    type: GET_LESSON_LIBRARY,
    lessonLibraryList
  }
}

const initialState = {
  lessonLibraryList: null,

}

// reducer function to manage the modal state
export default function lessonLibrary(state = initialState, action) {

  switch (action.type) {
    case GET_LESSON_LIBRARY:
      return {
        ...state,
        lessonLibraryList: action.lessonLibraryList,
      }

    default:
      return state
  }
}



