import * as actionTypes from '../actions/actionTypes';

const initialState = {
    competitions: []
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.AVAILABLE_COMPETITIONS:
            return {
                ...state,
                competitions: action.competitions
            };
        default:
            return state;
    }
};

export default reducer;