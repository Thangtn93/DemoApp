var firebase = require('firebase');
var fetch = require('node-fetch');
var request = require('request');

firebase.initializeApp({
    apiKey: "AIzaSyC40Dy3O6UvzmbuukMA7y0-YwPl8fjaZDM",
    authDomain: "football-2dd0f.firebaseapp.com",
    databaseURL: "https://football-2dd0f.firebaseio.com",
    projectId: "football-2dd0f",
    storageBucket: "",
    messagingSenderId: "316544273820"
});

createNewPitch('1', 'ChIJn4GjC3SsNTER5_lhFLD1Xis', 'Sân bóng Bách Khoa');
createNewPitch('2', 'ChIJuRpA-IesNTERjANnCc2ExMc', 'Airforce Soccer Field');
createNewPitch('3', 'ChIJUUV7uAusNTERCNava_8oWog', 'Tuoi Tre Football Field');
createNewPitch('4', 'ChIJ1aFlSXysNTERsuRLnhCvy90', 'Tennis Medical University');
createNewPitch('5', 'ChIJhxkO_YCsNTERN-8fD7w4Nng', 'Sân bóng Thủy Lợi');
createNewPitch('6', 'ChIJZ2bFtJqsNTERjd223WMbt9g', 'Thuong Dinh stadium');
createNewPitch('7', 'ChIJRd8L5hasNTERsLQpB69Bq7I', 'Sân Bóng Quân Đội Hoàng Mai');
createNewPitch('8', 'ChIJFUDMBGysNTER3BuhVRLdOT4', 'Sân bóng Minh Kiệt - Hoàng Mai');

function createNewPitch(key, placeID, name) {
    var pitch = {};
    const pitchRef = firebase.database().ref('pitchs');
    fetch(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeID}&key=AIzaSyB676TgO6Sl8GhBOdbIl2egaZN5iHPaMeQ`)
        .then(res => res.json())
        .then(json => {
            pitch.address = json.result.formatted_address;
            pitch.location = json.result.geometry.location;
            pitch.name = name;
            pitch.rating = {
                count: 0,
                score: json.result.rating
            }
            pitch.desciption = '';
            pitch.pitchID = key;

            var promises = [];
            for (var i = 0; i < json.result.photos.length; i++) {
                var item = json.result.photos[i];
                var photo_reference = item.photo_reference;
                var height = item.height;
                var width = item.width;

                var url = `https://maps.googleapis.com/maps/api/place/photo?photoreference=${photo_reference}&sensor=false&maxheight=${height}&maxwidth=${width}&key=AIzaSyB676TgO6Sl8GhBOdbIl2egaZN5iHPaMeQ`;

                promises.push(new Promise(function (resolve, reject) {
                    request(url, function (err, res, body) {
                        if (err) {
                            return reject(err);
                        } else if (res.statusCode !== 200) {
                            err = new Error("Unexpected status code: " + res.statusCode);
                            err.res = res;
                            return reject(err);
                        }
                        resolve(res.request.uri.href);
                    });
                }));
            }

            //pitch.images = images;
            Promise.all(promises).then((result) => {
                console.log(result)
                pitch.images = result;
                pitch.avatar = result[0] || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCW55imq1nlkRlp306wgHMQGMXIyl9ZGJbrNFY-zJ8Rw8gplSs';
                console.log(pitch);
                pitchRef.child(key).setValue(pitch);
            });
        });
}