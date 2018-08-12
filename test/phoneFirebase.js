var firebase = require('firebase');

firebase.initializeApp({
    apiKey: "AIzaSyC40Dy3O6UvzmbuukMA7y0-YwPl8fjaZDM",
    authDomain: "football-2dd0f.firebaseapp.com",
    databaseURL: "https://football-2dd0f.firebaseio.com",
    projectId: "football-2dd0f",
    storageBucket: "",
    messagingSenderId: "316544273820"
});

var phoneOrEmail = '0949926248';

firebase.database().ref('users').orderByChild("shortInfor/phoneNumber")
    .equalTo('0949926228')
    // .startAt('demo1@gmail.com')
    // .endAt('demo1@gmail.com')
    .on("value", function (snapshot) {
        // console.log(snapshot);
        if (snapshot.val() !== null) {
            console.log(snapshot.val());
        } else {
            console.log('Không tìm thấy số điện thoại');
        }
    });

fetch('https://us-central1-football-2dd0f.cloudfunctions.net/signIn', {
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
        console.log(responseJson);
        // this.setState({
        //   isLoading: false,
        //   dataSource: responseJson.movies,
        // }, function(){
        if (responseJson.error !== undefined) {
            console.log(Object.values(responseJson)[0]);
        } else {
            console.log(responseJson.error);
        }

        // });
    })
    .catch((error) => {
        console.error(error);
    });;