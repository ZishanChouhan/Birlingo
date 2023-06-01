const GET_APPURL_DETAILS = 'GET_APPURL_DETAILS';

export const setUrlDetails = (urlDetails) => {
    return {
        type: GET_APPURL_DETAILS,
        urlDetails
    }
}

const initialState = {
    urlDetails: null,

}

// reducer function to manage the modal state
export default function urlDetails(state = initialState, action) {

    switch (action.type) {
        case GET_APPURL_DETAILS:
            return {
                ...state,
                urlDetails: action.urlDetails,
            }

        default:
            return state
    }
}



