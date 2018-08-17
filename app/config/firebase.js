import * as firebase from 'firebase';

firebase.initializeApp({
    // apiKey: "AIzaSyC40Dy3O6UvzmbuukMA7y0-YwPl8fjaZDM",
    // authDomain: "football-2dd0f.firebaseapp.com",
    // databaseURL: "https://football-2dd0f.firebaseio.com",
    // projectId: "football-2dd0f",
    // storageBucket: "football-2dd0f.appspot.com",
    // messagingSenderId: "316544273820"

    // apiKey: "AIzaSyD-FWrgYWqVcFrjI3f2hNXHDtyEmzHfGTQ",
    // authDomain: "football-3a5da.firebaseapp.com",
    // databaseURL: "https://football-3a5da.firebaseio.com",
    // projectId: "football-3a5da",
    // storageBucket: "football-3a5da.appspot.com",
    // messagingSenderId: "1084900365322"

    apiKey: "AIzaSyDNwqJ2GQR49mZtS0yJvhzPLCekjA9LIE8",
    authDomain: "bongviet-156bf.firebaseapp.com",
    databaseURL: "https://bongviet-156bf.firebaseio.com",
    projectId: "bongviet-156bf",
    storageBucket: "bongviet-156bf.appspot.com",
    messagingSenderId: "732120503804"
});

export const firebaseRef = firebase.database().ref();
export default firebase;
