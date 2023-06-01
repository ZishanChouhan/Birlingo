const GET_LESSON = 'GET_LESSON';

export const setLessonSentence = (lessonDetails) => {
    return {
        type: GET_LESSON,
        lessonDetails
    }
}

const initialState = {
    lessonDetails: null,

}

// reducer function to manage the modal state
export default function lessonSentence(state = initialState, action) {
    // console.log("detailUser", action);

    switch (action.type) {
        case GET_LESSON:
            return {
                ...state,
                lessonDetails: action,
            }

        default:
            return state
    }
}



