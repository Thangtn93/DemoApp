var firebase = require('firebase');
var lunr = require('lunr');

firebase.initializeApp({
    apiKey: "AIzaSyC40Dy3O6UvzmbuukMA7y0-YwPl8fjaZDM",
    authDomain: "football-2dd0f.firebaseapp.com",
    databaseURL: "https://football-2dd0f.firebaseio.com",
    projectId: "football-2dd0f",
    storageBucket: "",
    messagingSenderId: "316544273820"
});



function searchUser2() {
    const userRef = firebase.database().ref('users');
    userRef.child('count').once('value').then(snapshot => {
        var count = snapshot.val();
        const RECORD_PER_PAGE = 2;
        // chia thành các mảng 100 rồi thực hiện tìm kiếm trong từng mảng
        var page = Math.floor(count / RECORD_PER_PAGE) + 1;

        var anchorKey;
        userRef.orderByKey().limitToFirst(1).on('child_added', (snapshot) => {
            console.log('anchorKey' + snapshot.key);
            anchorKey = snapshot.key;
        });
    })
}

function searchUser(searchText) {
    const userRef = firebase.database().ref('users');
    const countRef = firebase.database().ref('count');
    countRef.child('users').once('value').then(snapshot => {
        var count = snapshot.val();
        const RECORD_PER_PAGE = 2;
        // chia thành các mảng 100 rồi thực hiện tìm kiếm trong từng mảng
        var page = Math.ceil(count / RECORD_PER_PAGE);

        var anchorKey;
        userRef.orderByKey().limitToFirst(1).on('child_added', (snapshot) => {
            console.log('anchorKey1 ' + snapshot.key);
            anchorKey = snapshot.key;
            (async function loop() {
                for (var i = 0; i < page; i++) {
                    

                    await new Promise(resolve => {
                        userRef.orderByKey().startAt(anchorKey).limitToFirst(RECORD_PER_PAGE + 1).on('child_added', (snapshot) => {
                            var searchList = [];
                            console.log(snapshot.key);
                            anchorKey = snapshot.key;
                            searchList.push({ UID: snapshot.key, text: snapshot.val().shortInfor.fullName });
                            resolve(searchList);
                        })
                    }).then((searchList) => {
                        //console.log(result);
                        //console.log(searchList)
                        var idx = lunr(function () {
                            this.ref('UID');
                            this.field('text');

                            searchList.forEach(function (doc) {
                                this.add(doc);
                            }, this)
                        })

                        return idx.search(searchText);
                    });
                }
            })(anchorKey, searchText);
        });
    });
}

//searchUser('D');

//Promise.all(searchUser);

let allWithAsync = (...listOfPromises) => {
    return new Promise(async resolve => {
        let results = []
        for (let promise of listOfPromises) {
            results.push(await promise.then(async resolvedData => await resolvedData))
            if (results.length === listOfPromises.length) resolve(results)
        }
    })
}

//searchPitchForBooking('2018/10/6', 3, 5);

function searchPitchForBooking(date, time, type) {
    // const locaton = request.query.locaton;
    // const date = request.query.date; // mm/dd/yyyy
    // const time = request.query.time; // 5
    // const type = request.query.type; // 7

    const timeBooking = new Date(date);
    const now = new Date();
    var timeDiff = now - timeBooking;
    var diffDay = 0;
    if (timeDiff < 0) {
        // ERROR
    } else {
        diffDay = Math.ceil(timeDiff / (1000 * 3600 * 24));
    }

    if (diffDay > 30) {
        // ERROR
    }

    if (timeBooking.getDate == 15) {
        // xoa toan bo lich thi dau cu cua san bong
    }

    var resultQuery = [];

    //var promises = [];

    //firebase.database().ref('/pitchs').on('value', (snapshot) => {
    //    snapshot.forEach((child) => {
    //        promises.push(new Promise(resolve => {
    //            firebase.database().ref('/pitchs/' + child.key + '/size').on('value', (snapshot) => {
    //                if (snapshot.val() >= type) {
    //                    firebase.database().ref('/pitchs/' + child.key + '/calendar/' + date).on('value', (snapshot) => {
    //                        if (snapshot.exists()) {
    //                            snapshot.child(time).on('value', (snapshot) => {
    //                                if (!snapshot.exists()) {
    //                                    resultQuery.push({ pitchID: child.key });
    //                                    resolve({ pitchID: child.key });
    //                                }
    //                            });
    //                        } else {
    //                            console.log('resolve')
    //                            resultQuery.push({ pitchID: child.key })
    //                            resolve({ pitchID: child.key });
    //                        }
    //                    })
    //                }
    //            });
    //        }));
    //        // .then((pitch) => {
    //        //     resultQuery.push(pitch);
    //        // })

    //        // await child.child('size').on('value', (snapshot) => {
    //        //     if (snapshot.val() >= type) {
    //        //         await child.child('calendar/' + date).on('value', (snapshot) => {
    //        //             if (snapshot.exists()) {
    //        //                 await snapshot.child(time).on('value', (snapshot) => {
    //        //                     if (!snapshot.exists()) {
    //        //                         resultQuery.push({
    //        //                             PitchID: child.key
    //        //                         })
    //        //                     }
    //        //                 });
    //        //             } else {
    //        //                 resultQuery.push({
    //        //                     PitchID: child.key
    //        //                 })
    //        //             }
    //        //         });
    //        //     }
    //        // });
    //    });
    //});

    //(async function execute() {
    //    await Promise.all(promises);

    //    console.log('END');
    //    console.log(resultQuery);
    //})();

    firebase.database().ref('/pitchs').on('value', (snapshot) => {
        const promises = [];
        Object.keys(snapshot.val()).forEach((key) => {
            const obj = snapshot.val()[key];
            if (obj.size >= type) {
                if (obj.calendar[date] === undefined) {
                    promises.push(resultQuery.push({ pitchID: key }));
                    //await ;
                } else if (obj.calendar[date][time] === undefined) {
                    //await resultQuery.push({ pitchID: key });
                    promises.push(resultQuery.push({ pitchID: key }));
                }
            }
        });

        Promise.all(promises).then(results => {
            // continue processing here
            // results[0] is the result of the first promise in the promises array
            console.log(resultQuery);
            console.log('END');
        })

        //snapshot.forEach((child) => {
        //    promises.push(new Promise(resolve => {
        //        firebase.database().ref('/pitchs/' + child.key + '/size').on('value', (snapshot) => {
        //            if (snapshot.val() >= type) {
        //                firebase.database().ref('/pitchs/' + child.key + '/calendar/' + date).on('value', (snapshot) => {
        //                    if (snapshot.exists()) {
        //                        snapshot.child(time).on('value', (snapshot) => {
        //                            if (!snapshot.exists()) {
        //                                resultQuery.push({ pitchID: child.key });
        //                                resolve({ pitchID: child.key });
        //                            }
        //                        });
        //                    } else {
        //                        console.log('resolve')
        //                        resultQuery.push({ pitchID: child.key })
        //                        resolve({ pitchID: child.key });
        //                    }
        //                })
        //            }
        //        });
        //    }));
        //});
    });
    
}

getListTeam('7n4TThftsbdsvhZq1PFooQpI8D83');

function getListTeam(UID) {

    var resultQuery = [];

    firebase.database().ref('users/'+UID + '/teams').once('value', (snapshot) => {
        const promises = [];
        
        const teamIDArr = snapshot.val().split(',');
        teamIDArr.forEach((teamID) => {
            console.log(teamID)
            promises.push(firebase.database().ref('teams/' + teamID).once('value', (snapshot) => {
                resultQuery.push(snapshot.val());
            }));
        })

        Promise.all(promises).then(results => {
            // continue processing here
            // results[0] is the result of the first promise in the promises array
            console.log(resultQuery);
            //console.log(results[0].val());
            //response.send(resultQuery);
            console.log('END');
        })

    });
}