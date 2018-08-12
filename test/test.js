var firebase = require('firebase');
var config = {
    apiKey: "AIzaSyA99QXxZE5vAVm9Ltft6skmYxXHqMRtKTQ",
    authDomain: "node-firebase-7e2bb.firebaseapp.com",
    databaseURL: "https://node-firebase-7e2bb.firebaseio.com",
    projectId: "node-firebase-7e2bb",
    storageBucket: "node-firebase-7e2bb.appspot.com",
    messagingSenderId: "770034031219"
};
firebase.initializeApp(config);

var database = firebase.database();
// var coinRef = database.ref('/Coin');
// coinRef.push('BTC');

// thực hiện sigin
// firebase.auth().createUserWithEmailAndPassword("nguyenthedan8894@gmail.com", "password").then(user => {

//     user.sendEmailVerification().then(function () {
//         console.log("send email vertification");
//     }).catch(function (error) {
//         console.log(error);
//     });
// })
//     .catch(error => {
//         console.error(error)
//     });;
///////////////////////////////////////////////////////////////////////////////////////////

// thực hiện login
firebase.auth().signInWithEmailAndPassword("nguyenthedan8894@gmail.com", "password").then(user => {

    console.log(user.emailVerified);
    if (!user.emailVerified) {
        user.sendEmailVerification().then(function () {
            console.log("resend email vertification");
        }).catch(function (error) {
            console.log(error);
        });
    }

})
    .catch(error => {
        console.error(error)
    });;
///////////////////////////////////////////////////////////////////////////////////////////



// firebase.auth().currentUser.sendEmailVerification().then(function () {
//     console.log("send email vertification");
// }).catch(function (error) {
//     console.log(error);
// });
