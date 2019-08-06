import * as actionTypes from '../actions/actionTypes';

const initialState = {
    groupId: '',
    players: []
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_GROUP:
            return {
                ...state,
                groupId: action.groupId
            };
        case actionTypes.GET_PLAYERS:
            return {
                ...state,
                players: action.players
            };
        default:
            return state;
    }
};


export default reducer;

