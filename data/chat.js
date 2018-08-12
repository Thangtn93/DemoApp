var firebase = require('firebase');

firebase.initializeApp({
    apiKey: "AIzaSyC40Dy3O6UvzmbuukMA7y0-YwPl8fjaZDM",
    authDomain: "football-2dd0f.firebaseapp.com",
    databaseURL: "https://football-2dd0f.firebaseio.com",
    projectId: "football-2dd0f",
    storageBucket: "",
    messagingSenderId: "316544273820"
});

// var teamRef = firebase.database().ref('teams/' + '-LEjAgC2yMSZ7FwJ3gtf' + '/matchs');
// teamRef.push("-LFkdK6YOEKBhn0QiQhU");
// teamRef.push("-LFkevwoWJA3cHFyDiXS");

// var teamRef = firebase.database().ref('chats').push({
//     messages: 'Hello',
//     people: {
//         lastSeenMsgID: 'test'
//     }
// });

firebase.database().ref('chats/-LG9oE03F313fOjxBFdl/peoples/7n4TThftsbdsvhZq1PFooQpI8D83').set({lastSeenMsgID: ''});
firebase.database().ref('chats/-LG9oE03F313fOjxBFdl/peoples/Ly5WTjjt0PdtIBoBl1BINExkFgd2').set({lastSeenMsgID: ''});
firebase.database().ref('chats/-LG9oE03F313fOjxBFdl/peoples/BpOBtkMh24eaxokYeF5QdSbAdQG3').set({lastSeenMsgID: ''});
firebase.database().ref('chats/-LG9oE03F313fOjxBFdl/peoples/Kh0lURpCgRXWEtwgm9jll6KbC2i1').set({lastSeenMsgID: ''});
firebase.database().ref('chats/-LG9oE03F313fOjxBFdl/peoples/Ly5WTjjt0PdtIBoBl1BINExkFgd2').set({lastSeenMsgID: ''});
// dummyChat('-LFkdK6YOEKBhn0QiQhU');

function dummyChat(matchID) {
    firebase.database().ref('matchs/' + matchID).on('value').then((snapshot) => {
        var teamID = snapshot.val().teamID;
        var teamID2 = snapshot.val().teamID2;

        var peoples = [];
        firebase.database().ref('teams/' + teamID).on('value').then((snapshot) => {
            var adminID = Object.values(snapshot.val().member.admin);
            peoples.push(adminID);
            var memberID = Object.values(snapshot.val().member.member);
            memberID.forEach(element => {
                peoples.push(element);
            });
        })
        firebase.database().ref('teams/' + teamID2).on('value').then((snapshot) => {
            var adminID = Object.values(snapshot.val().member.admin);
            peoples.push(adminID);
            var memberID = Object.values(snapshot.val().member.member);
            memberID.forEach(element => {
                peoples.push(element);
            });
        })
    })
}