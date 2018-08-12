var firebase = require('firebase');

firebase.initializeApp({
    // apiKey: "AIzaSyC40Dy3O6UvzmbuukMA7y0-YwPl8fjaZDM",
    // authDomain: "football-2dd0f.firebaseapp.com",
    // databaseURL: "https://football-2dd0f.firebaseio.com",
    // projectId: "football-2dd0f",
    // storageBucket: "",
    // messagingSenderId: "316544273820"

    // apiKey: "AIzaSyD-FWrgYWqVcFrjI3f2hNXHDtyEmzHfGTQ",
    // authDomain: "football-3a5da.firebaseapp.com",
    // databaseURL: "https://football-3a5da.firebaseio.com",
    // projectId: "football-3a5da",
    // storageBucket: "football-3a5da.appspot.com",
    // messagingSenderId: "1084900365322"

    apiKey: "AIzaSyCS8o0OsUI0_akSUjp29EL9t029A4-XoyE",
    authDomain: "bongviet-156bf.firebaseapp.com",
    databaseURL: "https://bongviet-156bf.firebaseio.com",
    projectId: "bongviet-156bf",
    storageBucket: "bongviet-156bf.appspot.com",
    messagingSenderId: "732120503804"
});

// var firebase2 = require('firebase');

// const MESSAGE_PER_PAGE = 1000;

// firebase.database().ref('chats/-LG9oE03F313fOjxBFdl/peoples/7n4TThftsbdsvhZq1PFooQpI8D83').once('value').then((snapshot) => {
//     // lấy msgID của tin nhắn đã đọc cuối cùng
//     var lastSeenMessageID = snapshot.val().lastSeenMessageID;

//     if(lastSeenMessageID === undefined){
//         // load 1000 tin nhắn tiếp theo
//         firebase.database().ref('chats/-LG9oE03F313fOjxBFdl').child('messages').limitToFirst(MESSAGE_PER_PAGE + 1).on('child_added', (snapshot) => {
//         // var msgArr = Object.values(snapshot.val());
//         // this.setState({
//         //     messages: msgArr
//         // })
//         // snapshot.val().forEach(element => {
//             console.log(snapshot.val());
//             console.log('END');
//         // });

//     });
//     } else {
//         console.log('B')
//     }

//     // load 1000 tin nhắn tiếp theo
//     // this._chatRef.child('messages').startAt(lastSeenMessageID).limitToFirst(MESSAGE_PER_PAGE + 1).on('child_added', (snapshot) => {
//     //     var msgArr = Object.values(snapshot.val());
//     //     this.setState({
//     //         messages: msgArr
//     //     })
//     // });
// })

// firebase.database().ref('matchs/' + '-LFkdK6YOEKBhn0QiQhU').update({type: 'approve'});
// var date = '24/6/2018';
// var time = 0;

// firebase.database().ref('matchs')
//     .orderByChild('date')
//     .equalTo(date)
//     .on("value", function (snapshot) {
//         var snapArr = Object.values(snapshot.val());
//         var result = snapArr.filter((item) => {
//             if(item.time === time && item.type === 'request'){
//                 console.log(item)
//                 return item;
//             }
//         })
//         console.log(result);
//     })

// firebase.database().ref('teams/' + "-LGkVWUDzL1D2plfoUvG" + '/matchs/-LGxMr9vy12GqW058mUO').remove();
// firebase.database().ref('matchs/' + '-LGydeshVOqbbIyPhvmK').update({ chatID: 'test', type: 'waitting' });

// firebase.database().ref('users/' + "7n4TThftsbdsvhZq1PFooQpI8D83" + '/requestAddFriends/VErPlTlGp0QzrppYVf0FHvZGysa2').set('1');

// firebase.initializeApp({
//     apiKey: "AIzaSyC40Dy3O6UvzmbuukMA7y0-YwPl8fjaZDM",
//     authDomain: "football-2dd0f.firebaseapp.com",
//     databaseURL: "https://football-2dd0f.firebaseio.com",
//     projectId: "football-2dd0f",
//     storageBucket: "",
//     messagingSenderId: "316544273820"
// });
var fs = require('fs');
var userRef = firebase.database().ref('pitchs/').once('value').then((snapshot) => {
    // console.log(snapshot.val())
    // firebase.database().ref('pitchs/').set(snapshot.val())

    var obj = JSON.parse(fs.readFileSync('pitch.txt', 'utf8'));
    firebase.database().ref('pitchs/').set(obj)
    // fs.writeFile('pitch.txt', JSON.stringify(snapshot.val()), (err) => {
    //     // throws an error, you could also catch it here
    //     if (err) throw err;

    //     // success case, the file was saved
    //     console.log('Lyric saved!');
    // });
})
    // userRef.once('value').then(snapshot => {
    //     console.log(snapshot.val())
    // //   var team = snapshot.val();
    // })