import * as types from '../actions/actionTypes';

const initialState = {
  UID: '',
  shortInfor: {},
  following: [], // arr following uid
  teams: {},
  freeMatch: {},
  freeMatchs: [],
  yourGiaiDau: [], // giải đấu team tham gia
  allGiaiDau: [] // toàn bộ giải đấu
};

export default function userDataReducer(state = initialState, action) {
  switch (action.type) {

    case types.CHANGE_USER_DATA:
      return Object.assign({}, state, action.payload);

    case types.LOAD_USER_INFO:
      return Object.assign({}, state, action.userInfor);

    case types.CHANGE_AVATAR_USER_PROFILE:
      state.shortInfor.avatar = action.imageURL;
      return Object.assign({}, state, { shortInfor: state.shortInfor });

    case types.ADD_IMAGE_PROFILE:
      if (typeof state.shortInfor.images === 'undefined') {
        state.shortInfor.images = [action.imageURL];
      } else {
        var indexOfImage = state.shortInfor.images.indexOf(action.oldUrl);
        if (indexOfImage === -1) {
          state.shortInfor.images.push(action.imageURL);
        } else {
          state.shortInfor.images[indexOfImage] = action.imageURL;
        }
      }
      var newState = Object.assign({}, state, { shortInfor: state.shortInfor });
      return newState;

    case types.ADD_FOLLOWING:
      var newState = Object.assign({}, state, { following: [action.followingUID, ...state.following] });
      return newState;

    case types.REMOVE_FOLLOWING:
      state.following.splice(state.following.indexOf(action.followingUID), 1);
      var newState = Object.assign({}, state, { following: state.following });
      return newState;

    case types.NEW_TEAM:
      state.teams[action.teamID] = 'admin';
      var newState = Object.assign({}, state, { teams: state.teams });
      return newState;

    case types.JOIN_TEAM:
      state.teams[action.teamID] = 'waitting';
      var newState = Object.assign({}, state, { teams: state.teams });
      return newState;

    case types.LEAVE_TEAM:
      delete state.teams[action.teamID];
      var newState = Object.assign({}, state, { teams: state.teams });
      return newState;

    case types.LOAD_FREE_MATCH:
      return Object.assign({}, state, { freeMatchs: action.freeMatchs });

    case types.CLEAR_FREE_MATCH:
      return Object.assign({}, state, { freeMatchs: [] });

    case types.JOIN_FREE_MATCH:
      var matchID = action.match.ID;
      state.freeMatch[matchID] = 'member';
      return Object.assign({}, state, { freeMatch: state.freeMatch });

    case types.LEAVE_FREE_MATCH:
      delete state.freeMatch[action.match.ID];
      return Object.assign({}, state, { freeMatch: state.freeMatch });

    case types.CREATE_FREE_MATCH:
      var matchID = action.match.ID;
      state.freeMatch[matchID] = 'admin';
      return Object.assign({}, state, { freeMatch: state.freeMatch, freeMatchs: [action.match, ...state.freeMatchs] });

    case types.DELETE_FREE_MATCH:
      delete state.freeMatch[action.match.ID];
      state.freeMatchs.splice(state.freeMatchs.indexOf(action.match), 1);
      return Object.assign({}, state, { freeMatch: state.freeMatch, freeMatchs: state.freeMatchs });

    case types.ADD_GIAI_DAU:
      var newState = Object.assign({}, state, { allGiaiDau: [...state.allGiaiDau, action.league] });
      return newState;

    case types.LOAD_ALL_GIAI_DAU:
      return Object.assign({}, state, { allGiaiDau: action.allGiaiDau });

    default:
      return state;
  }

}
