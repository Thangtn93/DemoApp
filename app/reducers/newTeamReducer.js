import * as types from '../actions/actionTypes';

const initialState = {
    friends: [],
    teamInfor: {}
};

const newTeamReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.NEW_TEAM_LOAD_FRIENDS:
            return Object.assign({}, state, { friends: action.friendsInfor });

        case types.SELECT_MEMBER_FOR_NEW_TEAM:
            var newFriends = state.friends.map((user) => {
                if (user.UID === action.UID) {
                    var test = !user.isSelected;
                    return Object.assign({}, user, { isSelected: test });
                }
                return user;
            })
            return Object.assign({}, state, { friends: newFriends });

        case types.NEW_TEAM_PROFILE:
            return Object.assign({}, state, { teamInfor: action.teamInfor });

        default:
            return state;
    }

}

export default newTeamReducer;
