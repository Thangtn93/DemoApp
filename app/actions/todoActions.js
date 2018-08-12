import * as types from './actionTypes';
import { Alert } from 'react-native';
import firebase, { firebaseRef } from '../config/firebase';
import * as constants from '../share/constant';
import { validateEmail, validatePhoneNumber } from '../share/Util';
import moment from 'moment';
import { Actions } from "react-native-router-flux";

export function loadUserInfor(uid) {
  return (dispatch, getState) => {
    dispatch(changeCondition({ isLoading: true }));
    var userRef = firebase.database().ref('users/' + uid);
    userRef.once('value').then(snapshot => {
      var following = [];
      var teams = {};
      var freeMatch = {};
      if (typeof snapshot.val().following !== 'undefined') {
        following = Object.keys(snapshot.val().following);
      }
      if (typeof snapshot.val().teams !== 'undefined') {
        teams = snapshot.val().teams;
      }
      if (typeof snapshot.val().freeMatchs !== 'undefined') {
        freeMatch = snapshot.val().freeMatchs;
      }
      var userInfor = {
        UID: uid,
        shortInfor: snapshot.val().shortInfor,
        following: following,
        teams: teams,
        freeMatch: freeMatch
      }
      dispatch({
        type: types.LOAD_USER_INFO,
        userInfor
      });
      dispatch(changeCondition({ isLoading: false }));
    });
  };
}

export function googleSignIn(user) {
  return (dispatch, getState) => {
    dispatch(changeCondition({ isLoading: true }));
    var userRef = firebase.database().ref('users/' + user.uid);
    userRef.once('value').then((snapshot) => {
      if (snapshot.val() === null) {
        userRef.child('shortInfor').set({
          UID: user.uid,
          email: user.email,
          fullName: user.displayName,
          phoneNumber: user.phoneNumber,
          avatar: user.photoURL,
          description: ''
        });
        dispatch(changeUserData({ UID: user.uid }));
        dispatch(loadUserInfor(user.uid));
        dispatch(changeCondition({ isLoading: false }));
      } else {
        dispatch(changeUserData({ UID: user.uid }));
        dispatch(loadUserInfor(user.uid));
        dispatch(changeCondition({ isLoading: false }));
      }
    })
  }
}

export function facebookSignIn(user) {
  return (dispatch, getState) => {
    dispatch(changeCondition({ isLoading: true }));
    var userRef = firebase.database().ref('users/' + user.uid);
    userRef.once('value').then((snapshot) => {
      if (snapshot.val() === null) {
        userRef.child('shortInfor').set({
          UID: user.uid,
          email: user.email,
          fullName: user.displayName,
          phoneNumber: user.phoneNumber,
          avatar: user.photoURL,
          description: ''
        });
        dispatch(changeUserData({ UID: user.uid }));
        dispatch(loadUserInfor(user.uid));
        dispatch(changeCondition({ isLoading: false }));
      } else {
        dispatch(changeUserData({ UID: user.uid }));
        dispatch(loadUserInfor(user.uid));
        dispatch(changeCondition({ isLoading: false }));
      }
    })
  }
}

///////////////////////
// USER

export function startSignup(formData) {
  return (dispatch, getState) => {
    dispatch(changeCondition({ isLoading: true }));
    if (!validateEmail(formData.email)) {
      // email
      Alert.alert('', 'Email không đúng định dạng');
      dispatch(changeCondition({ isLoading: false }));
    } else if (!validatePhoneNumber(formData.phoneNumber)) {
      // phone number
      Alert.alert('', "Số điện thoại không đúng định dạng");
      dispatch(changeCondition({ isLoading: false }));
    } else if (formData.password !== formData.rePassword) {
      Alert.alert('', "Mật khẩu không trùng nhau");
      dispatch(changeCondition({ isLoading: false }));
    } else {
      fetch(constants.SIGNUP_LINK, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          name: formData.name,
          password: formData.password,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (typeof responseJson.error === 'undefined') {
            firebase.auth().signInWithEmailAndPassword(formData.email, formData.password)
              .then(snapshot => {
                dispatch(changeUserData({ UID: snapshot.uid }));
                dispatch(loadUserInfor(snapshot.uid));
                dispatch(changeCondition({ isLoading: false }));
                // Alert.alert('', 'Đăng ký thành công', [
                //   { text: 'OK', onPress: () => Actions.pop() },
                // ])
              }, error => {
                dispatch(changeCondition({ isLoading: false }));
                Alert.alert('', JSON.stringify(error.message));
              });
          } else {
            dispatch(changeCondition({ isLoading: false }));
            Alert.alert('', JSON.stringify(responseJson.error.message));
          }
        })
        .catch((error) => {
          dispatch(changeCondition({ isLoading: false }));
          Alert.alert('', JSON.stringify(error.message));
        });
    }
  };
}

export function startLogin(emailOrPhone, password) {
  return (dispatch, getState) => {
    dispatch(changeCondition({ isLoading: true }));
    if (validateEmail(emailOrPhone)) {
      // email
      firebase.auth().signInWithEmailAndPassword(emailOrPhone, password)
        .then(snapshot => {
          dispatch(changeUserData({ UID: snapshot.uid }));
          dispatch(loadUserInfor(snapshot.uid));
          dispatch(changeCondition({ isLoading: false }));
        }, error => {
          Alert.alert('', JSON.stringify(error.message));
          dispatch(changeCondition({ isLoading: false }));
        });
    } else if (validatePhoneNumber(emailOrPhone)) {
      // phone number
      fetch(constants.SIGNIN_LINK, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: emailOrPhone,
          password: password,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.error === undefined) {
            firebase.auth().signInWithEmailAndPassword(responseJson.email, password)
              .then(snapshot => {
                dispatch(changeUserData({ UID: snapshot.uid }));
                dispatch(loadUserInfor(snapshot.uid));
                dispatch(changeCondition({ isLoading: false }));
              }, error => {
                dispatch(changeCondition({ isLoading: false }));
                Alert.alert('', JSON.stringify(error.message));
              });
          } else {
            dispatch(changeCondition({ isLoading: false }));
            Alert.alert('', JSON.stringify(responseJson.message));
          }
        })
        .catch((error) => {
          dispatch(changeCondition({ isLoading: false }));
          Alert.alert('', JSON.stringify(error));
        });
    } else {
      dispatch(changeCondition({ isLoading: false }));
      Alert.alert('', JSON.stringify('Email hoặc số điện thoại không đúng'));
    }
  };
}

export function startLogout() {
  return (dispatch, getState) => {
    return firebase.auth().signOut();
  };
}

export function changeName(name) {
  return {
    type: types.CHANGE_NAME,
    name
  }
}

export function changeEmail(email) {
  return {
    type: types.CHANGE_EMAIL,
    email
  }
}

export function changePhoneNumber(phoneNumber) {
  return {
    type: types.CHANGE_PHONE_NUMBER,
    phoneNumber
  }
}

export function addImageProfile(oldUrl, imageUrl, UID, index) {
  return (dispatch, getState) => {
    dispatch(changeCondition({ isLoading: true }));
    (async function loop() {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      var metadata = {
        contentType: 'image/jpeg',
      };

      let name = new Date().getTime() + "-media.jpg"
      const ref = firebase
        .storage()
        .ref()
        .child('assets/' + name)

      const task = ref.put(blob, metadata);
      return new Promise((resolve, reject) => {
        task.on(
          'state_changed',
          (snapshot) => {
          },
          (error) => reject(error),
          () => {
            var imageURL = task.snapshot.downloadURL;
            var teamRef = firebase.database().ref('users/' + UID + '/shortInfor/images/' + index).set(imageURL);
            if (oldUrl !== '') {
              var path = oldUrl.split('/');
              var imageName = path[path.length - 1].split('?')[0].split('assets%2F')[1];
              firebase
                .storage()
                .ref()
                .child('assets/' + imageName).delete().then(function () {

                }).catch(function (error) {

                });
            }
            dispatch({
              type: types.ADD_IMAGE_PROFILE,
              oldUrl, // old image
              imageURL
            })
            dispatch(changeCondition({ isLoading: false }));
          }
        );
      });
    })(dispatch, oldUrl, imageUrl, UID, index);
  }
}

export function addImageTeamProfile(oldUrl, imageUrl, UID, index) {
  return (dispatch, getState) => {
    dispatch(changeCondition({ isLoading: true }));
    (async function loop() {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      var metadata = {
        contentType: 'image/jpeg',
      };

      let name = new Date().getTime() + "-media.jpg"
      const ref = firebase
        .storage()
        .ref()
        .child('assets/' + name)

      const task = ref.put(blob, metadata);
      return new Promise((resolve, reject) => {
        task.on(
          'state_changed',
          (snapshot) => {
          },
          (error) => reject(error),
          () => {
            var imageURL = task.snapshot.downloadURL;
            var teamRef = firebase.database().ref('teams/' + UID + '/images/' + index).set(imageURL);
            if (oldUrl !== '') {
              var path = oldUrl.split('/');
              var imageName = path[path.length - 1].split('?')[0].split('assets%2F')[1];
              firebase
                .storage()
                .ref()
                .child('assets/' + imageName).delete().then(function () {

                }).catch(function (error) {

                });
            }
            dispatch({
              type: types.ADD_IMAGE_TEAM_PROFILE,
              oldUrl, // old image
              imageURL
            })
            dispatch(changeCondition({ isLoading: false }));
          }
        );
      });
    })(dispatch, oldUrl, imageUrl, UID, index);
  }
}

export function changePassword(password) {
  return {
    type: types.CHANGE_PASSWORD,
    password
  }
}

export function changeRePassword(rePassword) {
  return {
    type: types.CHANGE_REPASSWORD,
    rePassword
  }
}

export function changeUserData(payload) {
  return {
    type: types.CHANGE_USER_DATA,
    payload
  }
}

export function changePhoneOrEmail(phoneOrEmail) {
  return {
    type: types.CHANGE_PHONE_OR_EMAIL,
    phoneOrEmail
  }
}

export function getVerifyCodeByPhone(phoneNumber) {
  return (dispatch, getState) => {
    return firebase.auth().signInWithPhoneNumber(phoneNumber);
  };
}

export function getVerifyCodeByEmail(email) {
  return (dispatch, getState) => {
    console.log(email)
    return firebase.auth().sendPasswordResetEmail(email).then(function () {
      Alert.alert('',
        'Vui lòng check email',
        [
          { text: 'OK', onPress: () => Actions.pop() },
        ],
      )
    }).catch(function (error) {
      Alert.alert('',
        JSON.stringify(error.message)
      )
    });
  };
}

////////////////////////////////////////////////////////

export function changeCondition(payload) {
  return {
    type: types.CHANGE_CONDITION,
    payload
  }
}

export function addTodo(payload) {
  return {
    type: types.ADD_TODO,
    payload
  };
}

export function updateTodo(id, payload) {
  return {
    type: types.UPDATE_TODO,
    id,
    payload
  };
}

export function toggleStarTodo(id) {
  return {
    type: types.TOGGLE_STAR_TODO,
    id
  };
}

export function toggleEditTodo(id) {
  return {
    type: types.TOGGLE_EDIT_TODO,
    id
  }
}

export function editTodo(id, text) {
  return {
    type: types.EDIT_TODO,
    id,
    text
  };
}

export function removeTodo(id) {
  return {
    type: types.REMOVE_TODO,
    id
  };
}

export function setVisibilityFilter(filter) {
  return {
    type: types.SET_VISIBILITY_FILTER,
    filter
  };
}

/////////////////////////////////////////////////////////
// BOOKING

export function changeFindPitchLocation(location) {
  return {
    type: types.CHANGE_FIND_PITCH_LOCATION,
    location
  }
}

export function changeFindPitchDate(date) {
  return {
    type: types.CHANGE_FIND_PITCH_DATE,
    date
  }
}

export function changeFindPitchTime(time) {
  return {
    type: types.CHANGE_FIND_PITCH_TIME,
    time
  }
}

export function changeFindPitchTypePitch(typePitch) {
  return {
    type: types.CHANGE_FIND_PITCH_TYPE_PITCH,
    typePitch
  }
}

export function searchPitchForBooking(month, day, time, type) {
  return (dispatch, getState) => {
    //const url = `https://us-central1-football-2dd0f.cloudfunctions.net/searchPitchForBooking?date=${date}&time=${time}&type=${type}`;
    // const url = `https://us-central1-football-2dd0f.cloudfunctions.net/searchPitchForBooking?date=2018/10/6&time=5&type=7`;
    const url = `https://script.google.com/macros/s/AKfycbxH-KVudXIC-CIfaMQkBIeNSoITb1GjdxWaViylLxu5H0AcvWI/exec?key=12345&time=${time}&day=${day}&month=${month}`;
    console.log(url);
    fetch(url)
      .then(res => res.json())
      .then(results => {
        console.log(results);
        dispatch({
          type: types.FIND_PITCH_RESULT,
          results
        });
        dispatch(changeCondition({ isLoading: false }));
      })
      .catch(error => {
        console.log(error);
      })
  }
}

export function loadAllPitch() {
  return (dispatch, getState) => {
    firebase.database().ref('pitchs').once('value').then((snapshot) => {
      var results = snapshot.val();
      dispatch({
        type: types.FIND_PITCH_RESULT,
        results
      });
      dispatch(changeCondition({ isLoading: false }));
    })
  }
}

export function loadCommentOfPitch(pitchID) {
  return (dispatch, getState) => {
    console.log(pitchID)
    var commentRef = firebase.database().ref('comments/' + pitchID);
    return commentRef.once('value');
  }
}

export function sendComment(comment, pitchID) {
  return (dispatch, getState) => {
    var commentRef = firebase.database().ref('comments/' + pitchID);
    return commentRef.push(comment);
  }
}

///////////////////////////////////////////////////////////
// ĐẶT KÈO
export function requestCreateMatch(khuvuc, san, tilekeo, pitchReducer, teamReducer, moreRequest) {
  return (dispatch, getState) => {
    var dateOfMatch = pitchReducer.date.getDate() + '/' + (pitchReducer.date.getMonth() + 1) + '/' + pitchReducer.date.getFullYear();
    // check trận mới bị trùng thời gian với các trận mà user đang tham gia
    var isDuplicateMatchTime = false;
    teamReducer.matchs.filter((match) => {
      if (match.date === dateOfMatch && match.time === pitchReducer.time) {
        isDuplicateMatchTime = true;
      }
    })
    if (isDuplicateMatchTime) {
      Alert.alert('',
        'Thời gian thi đấu trùng với thời gian của một trận khác'
      )
    } else {
      var matchRef = firebase.database().ref('matchs');
      var match = {
        teamID: teamReducer.ID,
        address: pitchReducer.location,
        date: dateOfMatch,
        time: pitchReducer.time,
        teamSize: pitchReducer.typePitch,
        moreRequest: moreRequest,
        type: 'request',
        name: teamReducer.name,
        avatar: teamReducer.avatar,
        khuvuc: khuvuc,
        san: san,
        tilekeo: tilekeo
      }
      matchRef.push(match).then((snap) => {
        var teamRef = firebase.database().ref('teams/' + teamReducer.ID + '/matchs/' + snap.key).set('1');
        var matchRef = firebase.database().ref('matchs/' + snap.key + '/ID').set(snap.key);
        match.ID = snap.key;
        dispatch({
          type: types.ADD_MATCH,
          match
        });
        Alert.alert(
          'Đặt kèo thành công'
        )
      });
    }
  }
}

///////////////////////////////////////////////////////////
// NEW TEAM

export function loadFriendsInfor(following) {
  return (dispatch, getState) => {
    var friendsInfor = [];
    for (var i = 0; i < following.length; i++) {
      var item = following[i];
      firebase.database().ref('users/' + item).once('value').then(snapshot => {
        var infor = snapshot.val().shortInfor;
        infor.isSelected = false;
        friendsInfor.push(infor);
        if (friendsInfor.length === following.length) {
          dispatch({
            type: types.NEW_TEAM_LOAD_FRIENDS,
            friendsInfor
          });
          dispatch(changeCondition({ isLoading: false }));
        }
      })
    };
  }
};

// update danh sach friends duoc slect vao store
export function selectMemberForNewTeam(UID) {
  return (dispatch, getState) => {
    return dispatch({
      type: types.SELECT_MEMBER_FOR_NEW_TEAM,
      UID
    });
  }
}

// lưu thông tin của new team vào db (firebase)
export function createNewTeam(teamName, member, avatar) {
  return (dispatch, getState) => {
    (async function loop() {
      const response = await fetch(avatar);
      const blob = await response.blob();
      var metadata = {
        contentType: 'image/jpeg',
      };

      let name = new Date().getTime() + "-media.jpg";
      const ref = firebase.storage().ref().child('assets/' + name);
      const task = ref.put(blob, metadata);
      return new Promise((resolve, reject) => {
        task.on('state_changed', (snapshot) => { },
          (error) => reject(error), /* this is where you would put an error callback! */
          () => {
            var downloadURL = task.snapshot.downloadURL;
            //console.log("_uploadAsByteArray ", task.snapshot.downloadURL)
            var teamRef = firebase.database().ref(`teams`);
            teamRef.push({
              name: teamName,
              avatar: downloadURL,
              address: '',
              description: ''
            }).then((snap) => {
              const teamID = snap.key;
              dispatch({
                type: types.NEW_TEAM,
                teamID
              });
              snap.child('ID').set(teamID);
              snap.child('member/admin/' + firebase.auth().currentUser.uid).set('1')
              firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/teams/' + teamID).set('admin');
              console.log('member')
              console.log(member)
              firebase.database().ref('chats/' + teamID + '/messages').push({
                _id: 1,
                text: 'Hello ' + teamName,
                createdAt: moment(new Date()).format('YYYYMMDDHHmmss'),
                system: true,
                // Any additional custom parameters are passed through
              });
              member.map((item) => {
                firebase.database().ref('users/' + item.UID + '/teams/' + teamID).set('member');
                snap.child('member/member/' + item.UID).set('1');
                firebase.database().ref('chats/' + teamID + '/messages').push({
                  _id: item.UID + moment(new Date()).format('YYYYMMDDHHmmss'),
                  text: 'Hello ' + item.fullName,
                  createdAt: moment(new Date()).format('YYYYMMDDHHmmss'),
                  system: true,
                  // Any additional custom parameters are passed through
                });
              });
              dispatch(changeCondition({ isLoading: false }));
              Alert.alert('',
                'Tạo đội thành công, quay lại màn hình quản lý đội bóng để bắt đầu',
                [
                  { text: 'OK', onPress: () => Actions.mainScreen({ type: "reset" }) },
                ],
              )
              // dispatch(loadNewTeamInfor(teamID));
              resolve(teamID);
            })
          }
        );
      });
    })(dispatch, teamName, member, avatar);
  }
}

export function loadNewTeamInfor(teamID) {
  return (dispatch, getState) => {
    firebase.database().ref('teams/' + teamID).once('value', (snapshot) => {
      var teamInfor = snapshot.val();
      teamInfor.rule = 'admin';
      // teamInfor.ID = teamID;
      dispatch({
        type: types.NEW_TEAM_PROFILE,
        teamInfor
      });
      dispatch(changeCondition({ isLoading: false }));
    })
  }
}

export function getListTeam(teams) {
  return (dispatch, getState) => {
    dispatch(changeCondition({ isLoading: true }));
    firebase.database().ref('teams').once('value').then(snapshot => {
      if ((snapshot.val()) !== null) {
        var allTeam = Object.values(snapshot.val());
        const teamIDArr = Object.keys(teams);
        var listTeamInfor = allTeam.filter((item) => {
          if (teamIDArr.indexOf(item.ID) > -1) {
            item.rule = teams[item.ID];
          }
          return item;
        })
        dispatch({
          type: types.LOAD_LIST_TEAM,
          listTeamInfor
        });
        dispatch(changeCondition({ isLoading: false }));
      }
    })
  }
}

export function loadTeamData(teamID, rule) {
  return (dispatch, getState) => {
    var teamData = {};
    firebase.database().ref('teams/' + teamID + '/').once('value').then(snapshot => {
      var team = snapshot.val();
      teamData.rule = rule;
      teamData.ID = teamID;
      teamData.address = team.address;
      teamData.name = team.name;
      teamData.avatar = team.avatar;
      teamData.description = team.description;
      teamData.phoneNumber = team.phoneNumber;
      teamData.khunggio = team.khunggio;
      teamData.level = team.level;

      // member
      var promise = [];
      var requestJoinTeam = [];
      var admin = [];
      var member = [];
      var matchs = [];

      if (team.requestJoinTeam !== undefined) {
        Object.keys(team.requestJoinTeam).forEach((UID) => {
          firebase.database().ref('users/' + UID).once('value').then(snapshot => {
            promise.push(requestJoinTeam.push({ shortInfor: snapshot.val().shortInfor }));
          });
        });
      }

      Object.keys(team.member.admin).forEach((UID) => {
        firebase.database().ref('users/' + UID).once('value').then(snapshot => {
          promise.push(admin.push({
            UID: UID,
            fullName: snapshot.val().shortInfor.fullName,
            avatar: snapshot.val().shortInfor.avatar,
          }));
        });
      });

      if (team.member.member !== undefined) {
        Object.keys(team.member.member).forEach((UID) => {
          firebase.database().ref('users/' + UID).once('value').then(snapshot => {
            promise.push(member.push({
              UID: UID,
              fullName: snapshot.val().shortInfor.fullName,
              avatar: snapshot.val().shortInfor.avatar,
            }));
          });
        });
      }

      if (team.matchs !== undefined) {
        Object.keys(team.matchs).forEach((matchID) => {
          firebase.database().ref('matchs/' + matchID).once('value').then(snapshot => {
            promise.push(matchs.push(snapshot.val()));
          });
        });
      }

      Promise.all(promise).then(results => {
        teamData.requestJoinTeam = requestJoinTeam;
        teamData.admin = admin;
        teamData.member = member;
        teamData.matchs = matchs;

        dispatch({
          type: types.LOAD_TEAM_DATA,
          teamData
        });
        dispatch(changeCondition({ isLoading: false }));
      })

    })
  }
};

// accept lời mời thi đấu
export function acceptMatch(match) {
  return (dispatch, getState) => {
    var matchID = match.ID;
    firebase.database().ref('matchs/' + matchID).update({ type: 'approve' });
    firebase.database().ref('chats/' + matchID + '/messages').push({
      _id: 1,
      text: 'Hello team ' + match.name,
      createdAt: moment(new Date()).format('YYYYMMDDHHmmss'),
      system: true,
      // Any additional custom parameters are passed through
    });
    firebase.database().ref('chats/' + matchID + '/messages').push({
      _id: 2,
      text: 'Hello team ' + match.name2,
      createdAt: moment(new Date()).format('YYYYMMDDHHmmss'),
      system: true,
      // Any additional custom parameters are passed through
    });

    dispatch({
      type: types.ACCEPT_MATCH,
      matchID
    });
  }
}

// từ chối lời mời thi đấu
export function rejectMatch(matchID, teamID2) {
  return (dispatch, getState) => {
    firebase.database().ref('matchs/' + matchID).update({ type: 'request' });
    firebase.database().ref('teams/' + teamID2 + '/matchs/' + matchID).remove();

    dispatch({
      type: types.REJECT_MATCH,
      matchID
    });
  }
}

// remove kèo của team
export function removeMatch(teamID, matchID) {
  return (dispatch, getState) => {
    firebase.database().ref('matchs/' + matchID).remove();
    firebase.database().ref('teams/' + teamID + '/matchs/' + matchID).remove();
    dispatch({
      type: types.REMOVE_MATCH,
      matchID
    });
  }
}

// hủy kèo đã approve
export function cancelMatchApprove(matchID, teamID2) {
  return (dispatch, getState) => {
    firebase.database().ref('matchs/' + matchID + '/type').set('request');
    firebase.database().ref('teams/' + teamID2 + '/matchs/' + matchID).remove();
    firebase.database().ref('chats/' + matchID).remove();
    dispatch({
      type: types.REJECT_MATCH,
      matchID
    });
  }
}

export function searchMatch(date, time, teamSize) {
  return (dispatch, getState) => {
    firebase.database().ref('matchs')
      .orderByChild('date')
      .equalTo(date)
      .on("value", function (snapshot) {
        var snapArr = Object.values(snapshot.val());
        var results = snapArr.filter((item) => {
          if (item.time === time && item.type === 'request') {
            return item;
          }
        })
        dispatch(changeCondition({ isLoading: false }));
        dispatch({
          type: types.FIND_PITCH_RESULT,
          results
        });
      })
  }
}

export function loadMatchProfile(item) {
  return (dispatch, getState) => {
    var matchProfile = item;
    var teamData = {};
    dispatch({
      type: types.LOAD_MATCH_PROFILE,
      matchProfile
    });
    firebase.database().ref('teams/' + matchProfile.teamID).once('value').then(snapshot => {
      // var team2 = snapshot.val();
      // dispatch({
      //   type: types.LOAD_TEAM2_INFOR,
      //   team2
      // });
      dispatch(selectTeam(snapshot.val()));
      dispatch(changeCondition({ isLoading: false }));
    })
  }
}

export function requestMatch(match, teamInfor) {
  return (dispatch, getState) => {
    var matchID = match.ID;
    firebase.database().ref('teams/' + teamInfor.ID + '/matchs/' + matchID).set('1');
    firebase.database().ref('matchs/' + matchID + '/avatar2').set(teamInfor.avatar);
    firebase.database().ref('matchs/' + matchID + '/name2').set(teamInfor.name);
    firebase.database().ref('matchs/' + matchID + '/teamID2').set(teamInfor.ID);
    firebase.database().ref('matchs/' + matchID + '/type').set('waitting');
    match.avatar2 = teamInfor.avatar;
    match.name2 = teamInfor.name;
    match.teamID2 = teamInfor.ID;
    match.type = 'waitting';
    dispatch({
      type: types.ADD_MATCH,
      match
    });

    // remove khỏi danh sách trận - ListMatch
    dispatch({
      type: types.REMOVE_ITEM_PITCH_RESULT,
      match
    });

    dispatch(changeCondition({ isLoading: false }));
  }
}

/**
 * search team, user
 */
export function search(text) {
  return (dispatch, getState) => {
    fetch(constants.SEARCH_LINK + `?text=${text}`)
      .then((response) => response.json())
      .then((responseJson) => {
        var results = {
          users: responseJson.users,
          teams: responseJson.teams
        }
        dispatch({
          type: types.SEARCH,
          results
        });

        dispatch(changeCondition({ isLoading: false }));
      })
      .catch((error) => {
        console.error(error);
        dispatch(changeCondition({ isLoading: false }));
      });
  }
}

/**
 * select user
 */
export function selectUser(userSelect) {
  return (dispatch, getState) => {
    dispatch({
      type: types.SELECT_USER,
      userSelect
    });
  }
}

export function clearSelectUser() {
  return (dispatch, getState) => {
    dispatch({
      type: types.CLEAR_SELECT_USER
    });
  }
}

export function follow(UID, followingUID) {
  return (dispatch, getState) => {
    firebase.database().ref('users/' + UID + '/following/' + followingUID).set('1');
    dispatch({
      type: types.ADD_FOLLOWING,
      followingUID
    });
  }
}

export function unfollow(UID, followingUID) {
  return (dispatch, getState) => {
    firebase.database().ref('users/' + UID + '/following/' + followingUID).remove();
    dispatch({
      type: types.REMOVE_FOLLOWING,
      followingUID
    });
  }
}

export function selectTeam(teamSelect) {
  return (dispatch, getState) => {
    dispatch({
      type: types.SELECT_TEAM,
      teamSelect
    });
  }
}

export function clearSelectTeam() {
  return (dispatch, getState) => {
    dispatch({
      type: types.CLEAR_SELECT_TEAM
    });
  }
}

export function requestJoinTeam(UID, teamID) {
  return (dispatch, getState) => {
    firebase.database().ref('users/' + UID + '/teams/' + teamID).set('waitting');
    firebase.database().ref('teams/' + teamID + '/requestJoinTeam/' + UID).set('1');
    dispatch({
      type: types.JOIN_TEAM,
      teamID
    });
  }
}

export function leaveTeam(UID, teamID) {
  return (dispatch, getState) => {
    firebase.database().ref('users/' + UID + '/teams/' + teamID).remove();
    firebase.database().ref('teams/' + teamID + '/member/member' + UID).remove();
    dispatch({
      type: types.LEAVE_TEAM,
      teamID
    });
  }
}

export function cancelRequestJoinTeam(UID, teamID) {
  return (dispatch, getState) => {
    firebase.database().ref('users/' + UID + '/teams/' + teamID).remove();
    firebase.database().ref('teams/' + teamID + '/requestJoinTeam/' + UID).remove();
    dispatch({
      type: types.LEAVE_TEAM,
      teamID
    });
  }
}

// create free match
export function createFreeMatch(pitchReducer, userData, moreRequest) {
  return (dispatch, getState) => {
    // ngày tháng mà trận đấu diễn ra
    var dateOfMatch = pitchReducer.date.getDate() + '/' + (pitchReducer.date.getMonth() + 1) + '/' + pitchReducer.date.getFullYear();
    // check trận mới bị trùng thời gian với các trận mà user đang tham gia
    var isDuplicateMatchTime = false;
    userData.freeMatchs.filter((match) => {
      if (Object.keys(userData.freeMatch).indexOf(match.ID) > -1 && match.date === dateOfMatch && match.time === pitchReducer.time) {
        isDuplicateMatchTime = true;
      }
    })
    if (isDuplicateMatchTime) {
      Alert.alert('',
        'Thời gian thi đấu trùng với thời gian của một trận khác mà bạn có tham gia'
      )
    } else {
      var matchRef = firebase.database().ref('matchs');
      var UID = userData.shortInfor.UID;
      var match = {
        address: pitchReducer.location,
        date: dateOfMatch,
        time: pitchReducer.time,
        teamSize: pitchReducer.typePitch,
        moreRequest: moreRequest,
        type: 'free',
        name: userData.shortInfor.fullName,
        avatar: userData.shortInfor.avatar,
      }
      var member = {};
      member[UID] = 'admin';
      match['member'] = member;
      matchRef.push(match).then((snap) => {
        firebase.database().ref('users/' + UID + '/freeMatchs/' + snap.key).set('admin');
        firebase.database().ref('matchs/' + snap.key + '/ID').set(snap.key);
        // firebase.database().ref('matchs/' + snap.key + '/member/' + UID).set('admin');
        firebase.database().ref('chats/' + snap.key + '/messages').push({
          _id: 1,
          text: 'Hello ' + userData.shortInfor.fullName,
          createdAt: moment(new Date()).format('YYYYMMDDHHmmss'),
          system: true,
          // Any additional custom parameters are passed through
        });
        match.ID = snap.key;
        dispatch({
          type: types.CREATE_FREE_MATCH,
          match
        });
        Alert.alert('',
          'Tạo trận thành công',
          [
            { text: 'OK', onPress: () => Actions.pop() },
          ],
        )
      });
    }
  }
}

export function clearFreeMatchData(pitchReducer, userData) {
  return (dispatch, getState) => {
    dispatch({
      type: types.CLEAR_FREE_MATCH
    });
  }
}

// load thông tin các trận tự do
export function loadFreeMatchData() {
  return (dispatch, getState) => {
    dispatch(changeCondition({ isLoading: true }));
    firebase.database().ref('matchs').once('value').then(snapshot => {
      if (snapshot.val() !== null) {
        var snapArr = Object.values(snapshot.val());
        var freeMatchs = snapArr.filter((item) => {
          if (item.type === 'free') {
            return item;
          }
        })

        dispatch({
          type: types.LOAD_FREE_MATCH,
          freeMatchs
        });
        dispatch(changeCondition({ isLoading: false }));
      } else {
        dispatch(changeCondition({ isLoading: false }));
      }
    });
  }
};

export function joinFreeMatch(match, UID) {
  return (dispatch, getState) => {
    firebase.database().ref('matchs/' + match.ID + '/member/' + UID).set('member');
    firebase.database().ref('users/' + UID + '/freeMatchs/' + match.ID).set('member');

    dispatch({
      type: types.JOIN_FREE_MATCH,
      match
    });
  }
};

export function leaveFreeMatch(match, UID) {
  return (dispatch, getState) => {
    firebase.database().ref('matchs/' + match.ID + '/member/' + UID).remove();
    firebase.database().ref('users/' + UID + '/freeMatchs/' + match.ID).remove();

    dispatch({
      type: types.LEAVE_FREE_MATCH,
      match
    });
  }
};

export function deleteFreeMatch(match) {
  return (dispatch, getState) => {
    firebase.database().ref('matchs/' + match.ID).remove();
    firebase.database().ref('chats/' + match.ID).remove();

    Object.keys(match.member).forEach((memberID) => {
      firebase.database().ref('users/' + memberID + '/freeMatchs/' + match.ID).remove();
    })

    dispatch({
      type: types.DELETE_FREE_MATCH,
      match
    });
  }
};

export function updateProfile(userInfor, name, email, phoneNumber, address, vitrisotruong, level, description) {
  return (dispatch, getState) => {
    // firebase.auth().updateUser(uid, {
    //   email: "modifiedUser@example.com",
    //   phoneNumber: "+11234567890",
    //   emailVerified: true,
    //   password: "newPassword",
    //   displayName: "Jane Doe",
    //   photoURL: "http://www.example.com/12345678/photo.png",
    //   disabled: true
    // })
    //   .then(function(userRecord) {
    //     // See the UserRecord reference doc for the contents of userRecord.
    //     console.log("Successfully updated user", userRecord.toJSON());
    //   })
    //   .catch(function(error) {
    //     console.log("Error updating user:", error);
    //   });
    dispatch(changeCondition({ isLoading: true }));
    // if(typeof phoneNumber === 'undefined'){
    //   phoneNumber = '';
    // }
    if (typeof address === 'undefined') {
      address = '';
    }
    if (typeof vitrisotruong === 'undefined') {
      vitrisotruong = '';
    }
    if (typeof level === 'undefined') {
      level = '';
    }
    if (typeof description === 'undefined') {
      description = '';
    }
    firebase.database().ref('users/' + userInfor.shortInfor.UID + '/shortInfor').update({
      address: address,
      description: description,
      vitrisotruong: vitrisotruong,
      level: level
    });
    userInfor.shortInfor.address = address;
    userInfor.shortInfor.description = description;
    userInfor.shortInfor.vitrisotruong = vitrisotruong;
    userInfor.shortInfor.level = level;
    dispatch({
      type: types.LOAD_USER_INFO,
      userInfor
    });
    dispatch(changeCondition({ isLoading: false }));
    Alert.alert(
      'Update thành công'
    )
  }
}

export function updateTeamProfile(teamData, name, phoneNumber, address, khunggio, level, description) {
  return (dispatch, getState) => {
    dispatch(changeCondition({ isLoading: true }));
    if (typeof phoneNumber === 'undefined') {
      phoneNumber = '';
    }
    if (typeof address === 'undefined') {
      address = '';
    }
    if (typeof khunggio === 'undefined') {
      khunggio = '';
    }
    if (typeof level === 'undefined') {
      level = '';
    }
    if (typeof description === 'undefined') {
      description = '';
    }
    firebase.database().ref('teams/' + teamData.ID).update({
      name: name,
      address: address,
      phoneNumber: phoneNumber,
      description: description,
      khunggio: khunggio,
      level: level
    });
    teamData.name = name;
    teamData.address = address;
    teamData.phoneNumber = phoneNumber;
    teamData.description = description;
    teamData.khunggio = khunggio;
    teamData.level = level;
    dispatch({
      type: types.LOAD_TEAM_DATA,
      teamData
    });

    dispatch(changeCondition({ isLoading: false }));
    Alert.alert(
      'Update thành công'
    )
  }
}

// accept lời mời thi đấu
export function acceptMember(userData, teamData) {
  return (dispatch, getState) => {
    firebase.database().ref('teams/' + teamData.ID + '/requestJoinTeam/' + userData.shortInfor.UID).remove();
    firebase.database().ref('teams/' + teamData.ID + '/member/member/' + userData.shortInfor.UID).set('1');
    firebase.database().ref('users/' + userData.shortInfor.UID + '/teams/' + teamData.ID).set('member');
    // firebase.database().ref('chats/' + teamData.ID + '/messages').push({
    //   _id: 1,
    //   text: 'Hello ' + userData.shortInfor.fullName,
    //   createdAt: moment(new Date()).format('YYYYMMDDHHmmss'),
    //   system: true,
    //   // Any additional custom parameters are passed through
    // });

    dispatch({
      type: types.ACCEPT_MEMBER,
      userData
    });
    dispatch({
      type: types.REJECT_MEMBER,
      userData
    });
  }
}

// từ chối lời mời thi đấu
export function rejectMember(userData, teamData) {
  return (dispatch, getState) => {
    firebase.database().ref('teams/' + teamData.ID + '/requestJoinTeam/' + userData.shortInfor.UID).remove();

    dispatch({
      type: types.REJECT_MEMBER,
      userData
    });
  }
}

export function deleteTeam(team) {
  return (dispatch, getState) => {
    if (team.matchs.length > 0) {
      Alert.alert(
        'Hủy các trận trước khi xóa đội'
      )
    } else {
      firebase.database().ref('teams/' + team.ID).remove();
      team.admin.forEach(user => {
        firebase.database().ref('users/' + user.UID + '/teams/' + team.ID).remove();
      })
      team.member.forEach(user => {
        firebase.database().ref('users/' + user.UID + '/teams/' + team.ID).remove();
      })
    }
  }
}

export function editAvatarProfile(isEditUserAvatar, oldUrl, imageUrl, UID) {
  return (dispatch, getState) => {
    dispatch(changeCondition({ isLoading: true }));
    (async function loop() {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      var metadata = {
        contentType: 'image/jpeg',
      };

      let name = new Date().getTime() + "-media.jpg"
      const ref = firebase
        .storage()
        .ref()
        .child('assets/' + name)

      const task = ref.put(blob, metadata);
      return new Promise((resolve, reject) => {
        task.on(
          'state_changed',
          (snapshot) => {
          },
          (error) => reject(error),
          () => {
            var imageURL = task.snapshot.downloadURL;
            if (isEditUserAvatar) {
              firebase.database().ref('users/' + UID + '/shortInfor/avatar').set(imageURL);
              if (oldUrl !== "https://scontent.fhan2-1.fna.fbcdn.net/v/t1.0-1/c47.0.160.160/p160x160/10354686_10150004552801856_220367501106153455_n.jpg?_nc_cat=0&_nc_eui2=AeEy49-OxPz6tv0jL0jNZWgw5siSoN_BMyc2svVnKtCUfcMExS3RJRNfaO9gR9yNPYdJ4b4l9Q4Wj8qFUPCtKQQmkTvYdwIwre_V6vtDllyOfg&oh=b7b63c86b1e4704bdf0f676ee73385a4&oe=5B958449") {
                var path = oldUrl.split('/');
                var imageName = path[path.length - 1].split('?')[0].split('assets%2F')[1];
                firebase
                  .storage()
                  .ref()
                  .child('assets/' + imageName).delete().then(function () {
                  }).catch(function (error) {
                  });
              }
            } else {
              firebase.database().ref('teams/' + UID + '/avatar').set(imageURL);
              var path = oldUrl.split('/');
              var imageName = path[path.length - 1].split('?')[0].split('assets%2F')[1];
              firebase
                .storage()
                .ref()
                .child('assets/' + imageName).delete().then(function () {
                }).catch(function (error) {
                });
            }

            if (isEditUserAvatar) {
              dispatch({
                type: types.CHANGE_AVATAR_USER_PROFILE,
                imageURL
              })
            } else {
              dispatch({
                type: types.CHANGE_AVATAR_TEAM_PROFILE,
                imageURL
              })
            }
            dispatch(changeCondition({ isLoading: false }));
          }
        );
      });
    })(dispatch, oldUrl, imageUrl, UID);
  }
}