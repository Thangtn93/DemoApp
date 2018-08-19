import {combineReducers} from 'redux';
import formData from './formReducer';
import userData from './userDataReducer';
import condition from './conditionReducer';
import pitchReducer from './pitchReducer';
import newTeamReducer from './newTeamReducer';
import teamReducer from './teamReducer';
import searchReducer from './searchReducer';
import leagueReducer from './leagueReducer';

const rootReducer = combineReducers({
  formData,
  userData,
  condition,
  pitchReducer,
  newTeamReducer,
  teamReducer,
  searchReducer,
  leagueReducer
});

export default rootReducer;
