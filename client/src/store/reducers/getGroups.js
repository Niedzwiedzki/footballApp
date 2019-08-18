import * as actionTypes from '../actions/actionTypes';

const initialState = {
    groups: [],
    groupToJoin: {}
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.GET_GROUPS:
            return {
                ...state,
                groups: action.groups
            };
        case actionTypes.GROUP_FOUND:
            return {
                ...state,
                groupToJoin: action.groupToJoin
            };
        case actionTypes.LOGOUT:
            return {
            groups: [],
            groupToJoin: {}
        }
        default:
            return state;
    }
};


export default reducer;