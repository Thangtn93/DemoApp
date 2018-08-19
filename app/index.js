import React, { Component } from "react";
import { connect } from 'react-redux';
import { Scene, Router } from 'react-native-router-flux';

import LoginScreen from './screen/Login';
import SignupScreen from './screen/Signup';
import MainScreen from './screen/Main';
import BookPitch from './screen/BookPitch';
import ListPitch from './screen/ListPitch';
import BookDetail from './screen/BookDetail';

import TeamProfile from './screen/team/TeamProfile';
import CreateTeam from './screen/team/CreateTeam';
import SelectAvatar from './screen/team/SelectAvatar';
import ListTeam from './screen/team/ListTeam';
import TeamManager from './screen/team/TeamManager';
import CreateMatch from './screen/team/CreateMatch';
import ListMember from './screen/team/ListMember';
import TeamCalendar from './screen/team/TeamCalendar';
import FindMatch from './screen/team/FindMatch';
import ListMatch from './screen/team/ListMatch';
import MatchProfile from './screen/match/MatchProfile';

import FreeMatch from './screen/match/FreeMatch';

import RecoverPasswordScreen from './screen/user/RecoverPass';
import VertifyCodeScreen from './screen/user/VertifyCode';

import ChatScreen from './screen/chat/ChatScreen';

import UserProfile from './screen/user/UserProfile';
import EditProfile from './screen/user/EditProfile';

import SearchScreen from './screen/search/SearchScreen';
import SearchResult from './screen/search/SearchResult';

import ListGiaiDau from './screen/giaidau/ListGiaiDau';
import TaoGiaiDau from './screen/giaidau/TaoGiaiDau';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Scene key='root'>
          <Scene key='loginScreen'
            animation='fade'
            component={LoginScreen}
            panHandlers={null}
            hideNavBar={true} initial />

          <Scene key='signupScreen'
            animation='fade'
            component={SignupScreen}
            panHandlers={null}
            hideNavBar={true} />

          <Scene key='recoverPasswordScreen'
            animation='fade'
            component={RecoverPasswordScreen}
            panHandlers={null}
            hideNavBar={true} />

          <Scene key='vertifyCodeScreen'
            animation='fade'
            component={VertifyCodeScreen}
            panHandlers={null}
            hideNavBar={true} />

          <Scene key='mainScreen'
            animation='fade'
            component={MainScreen}
            panHandlers={null}
            hideNavBar={true} />

          <Scene key='bookPitchScreen'
            animation='fade'
            component={BookPitch}
            panHandlers={null}
            hideNavBar={true} />

          <Scene key='listPitchScreen'
            animation='fade'
            component={ListPitch}
            panHandlers={null}
            hideNavBar={true} />

          <Scene key='bookDetailScreen'
            animation='fade'
            component={BookDetail}
            panHandlers={null}
            hideNavBar={true} />

          <Scene key='teamProfileScreen'
            animation='fade'
            component={TeamProfile}
            panHandlers={null}
            hideNavBar={true} />

          <Scene key='createTeamScreen'
            animation='fade'
            component={CreateTeam}
            panHandlers={null}
            hideNavBar={true} />

          <Scene key='selectAvatarScreen'
            animation='fade'
            component={SelectAvatar}
            panHandlers={null}
            hideNavBar={true} />

          <Scene key='listTeamScreen'
            animation='fade'
            component={ListTeam}
            panHandlers={null}
            hideNavBar={true} />

          <Scene key='teamManagerScreen'
            animation='fade'
            component={TeamManager}
            panHandlers={null}
            hideNavBar={true} />

          <Scene key='createMatchScreen'
            animation='fade'
            component={CreateMatch}
            panHandlers={null}
            hideNavBar={true} />

          <Scene key='listMemberScreen'
            animation='fade'
            component={ListMember}
            panHandlers={null}
            hideNavBar={true} />

          <Scene key='teamCalendarScreen'
            animation='fade'
            component={TeamCalendar}
            panHandlers={null}
            hideNavBar={true} />

          <Scene key='chatScreen'
            animation='fade'
            component={ChatScreen}
            panHandlers={null}
            hideNavBar={true} />

          <Scene key='findMatchScreen'
            animation='fade'
            component={FindMatch}
            panHandlers={null}
            hideNavBar={true} />

          <Scene key='listMatchScreen'
            animation='fade'
            component={ListMatch}
            panHandlers={null}
            hideNavBar={true} />

          <Scene key='matchProfileScreen'
            animation='fade'
            component={MatchProfile}
            panHandlers={null}
            hideNavBar={true} />

          <Scene key='userProfileScreen'
            animation='fade'
            component={UserProfile}
            panHandlers={null}
            hideNavBar={true} />

          <Scene key='searchScreen'
            animation='fade'
            component={SearchScreen}
            panHandlers={null}
            hideNavBar={true} />

          <Scene key='searchResultScreen'
            animation='fade'
            component={SearchResult}
            panHandlers={null}
            hideNavBar={true} />

          <Scene key='freeMatchScreen'
            animation='fade'
            component={FreeMatch}
            panHandlers={null}
            hideNavBar={true} />

          <Scene key='editUserProfileScreen'
            animation='fade'
            component={EditProfile}
            panHandlers={null}
            hideNavBar={true} />

          <Scene key='listGiaiDau'
            animation='fade'
            component={ListGiaiDau}
            panHandlers={null}
            hideNavBar={true} />

          <Scene key='taoGiaiDau'
            animation='fade'
            component={TaoGiaiDau}
            panHandlers={null}
            hideNavBar={true} />
        </Scene>
      </Router>
    );
  }
}

