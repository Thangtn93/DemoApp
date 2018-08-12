var firebase = require('firebase');

firebase.initializeApp({
  apiKey: "AIzaSyC40Dy3O6UvzmbuukMA7y0-YwPl8fjaZDM",
  authDomain: "football-2dd0f.firebaseapp.com",
  databaseURL: "https://football-2dd0f.firebaseio.com",
  projectId: "football-2dd0f",
  storageBucket: "",
  messagingSenderId: "316544273820"
});

//dummyUser();
createNewTeam('1', '2', ['11','22','33']);

function createNewTeam(teamName, avatar, member) {
	  const UID = 'yydzu9XyuGQ8cvcSiUclCUC2kP13';
	  const teamRef = firebase.database().ref('teams');
	  teamRef.push({
	    name: teamName,
	    avatar: avatar,
	  }).then((snap) => {
	    const teamID = snap.key;
//	    snap.child('member/admin').push(UID).then((ref)=>{
	      const result = member.map(async (item) => {
	    	  console.log(item)
//	        const ref = await firebase.database().ref('users/' + item.UID + '/teams').push(teamID);
	        
	        const ref = await snap.child('member/member').push(item);
	        console.log('finish')
//	        console.log(ref);
	        return ref;
	      });
	      console.log('result'+result);
        
        Promise.all(result).then((resolve) => {
          console.log("DONE")
        });
//	    });
	    
	  });
	}

// firebase.auth().signInWithEmailAndPassword('demo1@gmail.com', 'anhdax').then(function (user) {
//   var friendsRef = firebase.database().ref('users/' + user.uid).child('friends');
//   const friends = [];
//   friendsRef.once('value').then(snapshot => {
//     const friendID = snapshot.val() || {};
//     Object.keys(friendID).forEach(function (key) {
//       console.log(friendID[key]);
//       firebase.database().ref('users/' + friendID[key]).once('value').then(snapshot => {
//         // console.log(snapshot.val());
//         friends.push(snapshot.val());
//       })
//     }).then((val)=>{
//       console.log(friends)
//       return dispatch({
//         type: types.NEW_TEAM_LOAD_FRIENDS,
//         friends: friends,
//       });
//     });
    
//   });
// });

// dummyFriends('demo1@gmail.com', 'anhdax');


function dummyFriends(email, password) {
  firebase.auth().signInWithEmailAndPassword(email, password).then(function (user) {
    firebase.database().ref('users/' + user.uid).child('friends').push('iRf4YZCPnpdj1H0Fx9gXBSu1mMa2');
    firebase.database().ref('users/' + user.uid).child('friends').push('esK8aJtWvUMXuRl0lP2Ag03RePz2');
  });
}

function dummyUser() {
  startSignup('demo1@gmail.com', 'anhdax', 'Nguyễn Văn A', '0949926268');
  startSignup('demo2@gmail.com', 'anhdax', 'Nguyễn Văn A', '0949926268');
  startSignup('demo3@gmail.com', 'anhdax', 'Nguyễn Văn A', '0949926268');
  startSignup('demo4@gmail.com', 'anhdax', 'Nguyễn Văn A', '0949926268');
  startSignup('demo5@gmail.com', 'anhdax', 'Nguyễn Văn A', '0949926268');
  startSignup('demo6@gmail.com', 'anhdax', 'Nguyễn Văn A', '0949926268');
  startSignup('demo7@gmail.com', 'anhdax', 'Nguyễn Văn A', '0949926268');
  startSignup('demo8@gmail.com', 'anhdax', 'Nguyễn Văn A', '0949926268');
  startSignup('demo9@gmail.com', 'anhdax', 'Nguyễn Văn A', '0949926268');
}

function startSignup(email, password, fullname, phoneNumber) {
  firebase.auth().createUserWithEmailAndPassword(email, password).then(function (user) {
    firebase.database().ref('users/' + user.uid + "/shortInfor").set({
      email: email,
      fullName: fullname,
      phoneNumber: phoneNumber,
      avatar: 'https://scontent.fhan2-1.fna.fbcdn.net/v/t1.0-1/c47.0.160.160/p160x160/10354686_10150004552801856_220367501106153455_n.jpg?_nc_cat=0&_nc_eui2=AeEy49-OxPz6tv0jL0jNZWgw5siSoN_BMyc2svVnKtCUfcMExS3RJRNfaO9gR9yNPYdJ4b4l9Q4Wj8qFUPCtKQQmkTvYdwIwre_V6vtDllyOfg&oh=b7b63c86b1e4704bdf0f676ee73385a4&oe=5B958449'
      //some more user data
    });
  }).catch(function (error) {
    // TODO
    console.log(error.code);
    console.log(error.message);
  });
}

function updateProfile(email, password, phoneNumber, lastName, firstName, birthDay, adress) {
  firebase.database().ref('users/' + user.uid).set({
    email: email,
    password: password,
    phoneNumber: phoneNumber,
    lastName: lastName,
    firstName: firstName,
    birthDay: birthDay,
    adress: adress
  }).catch(function (error) {
    // TODO
    console.log(error.code);
    console.log(error.message);
  });
}

// TODO: get user profile


// Pitch
function createPitch() {
  const UID = firebase.auth().currentUser.uid;
  firebase.database().ref('pitchs/' + UID).set({
    pitchID: pitchID, // TODO: chua biet cach gen id
    userID: UID,
    name: name, // tên sân
    adress: adress, // địa chỉ: phố Bạch Mai, Hà Nội
    location: location, // địa chỉ gps
    area: area, // diện tích sân
    type: type, // loại sân: 5 người, 7 người hay 11 người
    score: score, // điểm số qua đánh giá của người dùng
    avatar: avatar, // url ảnh avatar
    images: [], // ảnh chụp sân
    price: {

    }, // giá thuê theo khung giờ
    calendar: calendar, // lịch sân
    comment: comment, // comment của người dùng gồm điểm số, userID, nội dung commnet, thời gian
    descreption: description, // mô tả về sân bóng
  }).catch(function (error) {
    // TODO
    console.log(error.code);
    console.log(error.message);
  });
}

// tìm sân