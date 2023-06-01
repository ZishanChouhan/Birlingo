const GET_RATING_DETAILS = 'GET_RATING_DETAILS';

export const setRatingDetails = (ratingDetails) => {
    return {
        type: GET_RATING_DETAILS,
        ratingDetails
    }
}

const initialState = {
    ratingDetails: null,

}

// reducer function to manage the modal state
export default function ratingDetails(state = initialState, action) {

    switch (action.type) {
        case GET_RATING_DETAILS:
            return {
                ...state,
                ratingDetails: action.ratingDetails,
            }

        default:
            return state
    }
}



