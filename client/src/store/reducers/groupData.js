import * as actionTypes from '../actions/actionTypes';

const initialState = {
    players: [],
    matches: {finished: [], scheduled: [], inPlay:[]}
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.GET_PLAYERS:
            
            return {
                ...state,
                players: action.players
            };
        case actionTypes.SET_MATCHES:
            return {
                ...state,
                matches: action.matches
            };
        case actionTypes.UPDATE_BETS:
            const updatedMatches = state.matches.scheduled.slice()
            updatedMatches[action.index].bet = {
                ...updatedMatches[action.index].bet,
                [action.value.team]: Number(action.value.score)
            }
            return {
                ...state,
                matches: {
                    ...state.matches,
                    scheduled: [...updatedMatches]
                }
            }
        case actionTypes.INCREASE_OR_DECREASE:
            if(state.matches.scheduled[action.index].bet[action.team] > 0 || action.op !== -1){

                const updatedMatchesIncDec = state.matches.scheduled.slice()
                updatedMatchesIncDec[action.index].bet = {
                    ...updatedMatchesIncDec[action.index].bet,
                    [action.team]: Number(updatedMatchesIncDec[action.index].bet[action.team]) + action.op
                }
                    return {
                        ...state,
                        matches: {
                            ...state.matches,
                            scheduled: [...updatedMatchesIncDec]
                        }
                    }
            } else {
                console.log('cannot update')
            }
        case actionTypes.SENDING_BET_START:
            const updatedMatchesSending = state.matches.scheduled.slice()
            updatedMatchesSending[action.index].betStatus = 'sending'
            return {
                ...state,
                matches: {
                    ...state.matches,
                    scheduled: [...updatedMatchesSending]
                }
            }
        case actionTypes.SENDING_BET_SUCCESS:
            const updatedMatchesSent = state.matches.scheduled.slice()
            updatedMatchesSent[action.index].betStatus = 'full'
            return {
                ...state,
                matches: {
                    ...state.matches,
                    scheduled: [...updatedMatchesSent]
                }
            }
        case actionTypes.LOGOUT:
                return {
                players: [],
                matches: {finished: [], scheduled: [], inPlay:[]}
            }
        default:
            return state;
    }
};


export default reducer;
