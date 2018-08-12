var firebase = require('firebase');

firebase.initializeApp({
    apiKey: "AIzaSyC40Dy3O6UvzmbuukMA7y0-YwPl8fjaZDM",
    authDomain: "football-2dd0f.firebaseapp.com",
    databaseURL: "https://football-2dd0f.firebaseio.com",
    projectId: "football-2dd0f",
    storageBucket: "",
    messagingSenderId: "316544273820"
});

dummyPitchs('Sân bóng Bách Khoa', 'A1, Lê Thanh Nghị, Bách Khoa, Hai Bà Trưng, Hà Nội', '21.003046, 105.847836', 11);
dummyPitchs('Sân bóng Thủy Lợi', 'Ngõ 95 Chùa Bộc, Trung Liệt, Đống Đa, Hà Nội', '21.007286, 105.827171', 11);

function dummyPitchs(name, address, location, size) {
    firebase.database().ref('pitchs').push({
        name: name,
        address: address, // dia chi
        location: location, // dia chi gps
        size: size, // 5 7 hay 11 người
        avatar: '',
        image: [],
        desciption: '',
        comment: [],

        //some more user data
    });
}