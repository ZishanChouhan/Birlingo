const CHECK_OFF_LINE = 'CHECK_OFF_LINE';

export const setInternetConnection = (checkNet) => {

    return {
        type: CHECK_OFF_LINE,
        checkNet
    }
}

const initialState = {
    checkNet: null,
}

// reducer function to manage the modal state
export default function getInternetConnection(state = initialState, action) {

    switch (action.type) {
        case CHECK_OFF_LINE:
            return {
                ...state,
                checkNet: action.checkNet,
            }
        default:
            return state
    }
}



