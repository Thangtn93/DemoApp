import * as types from '../actions/actionTypes';

const initialState = {
    users: [],
    teams: [],
    userSelect: {},
    teamSelect: {}
};

const searchReducer = (state = initialState, action) => {
    switch (action.type) {

        case types.SEARCH:
            var results = action.results;
            var newState = Object.assign({}, state, { users: results.users, teams: results.teams });
            return newState;
        case types.SELECT_USER:
            return Object.assign({}, state, { userSelect: action.userSelect });

        case types.CLEAR_SELECT_USER:
            return Object.assign({}, state, { userSelect: {} });

        case types.SELECT_TEAM:
            return Object.assign({}, state, { teamSelect: action.teamSelect });

        case types.CLEAR_SELECT_TEAM:
            return Object.assign({}, state, { teamSelect: {} });

        default:
            return state;
    }
}

export default searchReducer;
