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

var documents = [{
  friends: 'BpOBtkMh24eaxokYeF5QdSbAdQG3,Kh0lURpCgRXWEtwgm9jll6KbC2i1,Ly5WTjjt0PdtIBoBl1BINExkFgd2',
  shortInfor:
    {
      UID: '7n4TThftsbdsvhZq1PFooQpI8D83',
      avatar: 'https://scontent.fhan2-1.fna.fbcdn.net/v/t1.0-1/c47.0.160.160/p160x160/10354686_10150004552801856_220367501106153455_n.jpg?_nc_cat=0&_nc_eui2=AeEy49-OxPz6tv0jL0jNZWgw5siSoN_BMyc2svVnKtCUfcMExS3RJRNfaO9gR9yNPYdJ4b4l9Q4Wj8qFUPCtKQQmkTvYdwIwre_V6vtDllyOfg&oh=b7b63c86b1e4704bdf0f676ee73385a4&oe=5B958449',
      email: 'demo1@gmail.com',
      fullName: 'Nguyễn Văn A',
      phoneNumber: '0949926248'
    },
  teams: '-LEjAgC2yMSZ7FwJ3gtf'
},
{
  shortInfor:
    {
      UID: 'BpOBtkMh24eaxokYeF5QdSbAdQG3',
      avatar: 'https://scontent.fhan2-1.fna.fbcdn.net/v/t1.0-1/c47.0.160.160/p160x160/10354686_10150004552801856_220367501106153455_n.jpg?_nc_cat=0&_nc_eui2=AeEy49-OxPz6tv0jL0jNZWgw5siSoN_BMyc2svVnKtCUfcMExS3RJRNfaO9gR9yNPYdJ4b4l9Q4Wj8qFUPCtKQQmkTvYdwIwre_V6vtDllyOfg&oh=b7b63c86b1e4704bdf0f676ee73385a4&oe=5B958449',
      email: 'demo5@gmail.com',
      fullName: 'Nguyễn Văn B',
      phoneNumber: '0949926268'
    },
  teams:
    {
      '-LEu9zCFrj6wkfjJT68b': '-LEu9z37mYo_ZUrRkT_q',
      '-LGUa6xXRGhEi-44mmfp': '-LGUa6q2WdogX6FJnqaZ',
      '-LGUazaE2oRF6a-FtPT4': '-LGUazTaSQeHjAadCs9D'
    }
},
{
  shortInfor:
    {
      UID: 'Kh0lURpCgRXWEtwgm9jll6KbC2i1',
      avatar: 'https://scontent.fhan2-1.fna.fbcdn.net/v/t1.0-1/c47.0.160.160/p160x160/10354686_10150004552801856_220367501106153455_n.jpg?_nc_cat=0&_nc_eui2=AeEy49-OxPz6tv0jL0jNZWgw5siSoN_BMyc2svVnKtCUfcMExS3RJRNfaO9gR9yNPYdJ4b4l9Q4Wj8qFUPCtKQQmkTvYdwIwre_V6vtDllyOfg&oh=b7b63c86b1e4704bdf0f676ee73385a4&oe=5B958449',
      email: 'demo7@gmail.com',
      fullName: 'Nguyễn Văn C',
      phoneNumber: '0949926268'
    },
  teams:
    {
      '-LEu9zCVOIa-2HZJ2OMS': '-LEu9z37mYo_ZUrRkT_q',
      '-LGUSD4OurZABz_70T8H': '-LGUSCyErBHRNlNsDDo5',
      '-LGUYOGA0Stogy5u2HFx': '-LGUYO947Qk8buFCsGFf',
      '-LGUazaToUClHtLwBAZG': '-LGUazTaSQeHjAadCs9D'
    }
},
{
  shortInfor:
    {
      UID: 'Ly5WTjjt0PdtIBoBl1BINExkFgd2',
      avatar: 'https://scontent.fhan2-1.fna.fbcdn.net/v/t1.0-1/c47.0.160.160/p160x160/10354686_10150004552801856_220367501106153455_n.jpg?_nc_cat=0&_nc_eui2=AeEy49-OxPz6tv0jL0jNZWgw5siSoN_BMyc2svVnKtCUfcMExS3RJRNfaO9gR9yNPYdJ4b4l9Q4Wj8qFUPCtKQQmkTvYdwIwre_V6vtDllyOfg&oh=b7b63c86b1e4704bdf0f676ee73385a4&oe=5B958449',
      email: 'demo8@gmail.com',
      fullName: 'Nguyễn Văn D',
      phoneNumber: '0949926268'
    },
  teams: { '-LEu9zClzerSs7qcb0nX': '-LEu9z37mYo_ZUrRkT_q' }
},
{
  shortInfor:
    {
      UID: 'VErPlTlGp0QzrppYVf0FHvZGysa2',
      avatar: 'https://scontent.fhan2-1.fna.fbcdn.net/v/t1.0-1/c47.0.160.160/p160x160/10354686_10150004552801856_220367501106153455_n.jpg?_nc_cat=0&_nc_eui2=AeEy49-OxPz6tv0jL0jNZWgw5siSoN_BMyc2svVnKtCUfcMExS3RJRNfaO9gR9yNPYdJ4b4l9Q4Wj8qFUPCtKQQmkTvYdwIwre_V6vtDllyOfg&oh=b7b63c86b1e4704bdf0f676ee73385a4&oe=5B958449',
      email: 'demo4@gmail.com',
      fullName: 'Nguyễn Văn E',
      phoneNumber: '0949926268'
    }
},
{
  shortInfor:
    {
      UID: 'oC3jaj8I4LQhTkMvvjELbL5RPno1',
      avatar: 'https://scontent.fhan2-1.fna.fbcdn.net/v/t1.0-1/c47.0.160.160/p160x160/10354686_10150004552801856_220367501106153455_n.jpg?_nc_cat=0&_nc_eui2=AeEy49-OxPz6tv0jL0jNZWgw5siSoN_BMyc2svVnKtCUfcMExS3RJRNfaO9gR9yNPYdJ4b4l9Q4Wj8qFUPCtKQQmkTvYdwIwre_V6vtDllyOfg&oh=b7b63c86b1e4704bdf0f676ee73385a4&oe=5B958449',
      email: 'demo9@gmail.com',
      fullName: 'Nguyễn Văn A',
      phoneNumber: '0949926268'
    }
},
{
  shortInfor:
    {
      UID: 'smK2DNEWI5NYnbhQvBKLoEUYrj82',
      avatar: 'https://scontent.fhan2-1.fna.fbcdn.net/v/t1.0-1/c47.0.160.160/p160x160/10354686_10150004552801856_220367501106153455_n.jpg?_nc_cat=0&_nc_eui2=AeEy49-OxPz6tv0jL0jNZWgw5siSoN_BMyc2svVnKtCUfcMExS3RJRNfaO9gR9yNPYdJ4b4l9Q4Wj8qFUPCtKQQmkTvYdwIwre_V6vtDllyOfg&oh=b7b63c86b1e4704bdf0f676ee73385a4&oe=5B958449',
      email: 'demo6@gmail.com',
      fullName: 'Nguyễn Văn A',
      phoneNumber: '0949926268'
    }
},
{
  shortInfor:
    {
      UID: 'vgdEvI5pHIUSbWcXs5H3VfaHGx42',
      avatar: 'https://scontent.fhan2-1.fna.fbcdn.net/v/t1.0-1/c47.0.160.160/p160x160/10354686_10150004552801856_220367501106153455_n.jpg?_nc_cat=0&_nc_eui2=AeEy49-OxPz6tv0jL0jNZWgw5siSoN_BMyc2svVnKtCUfcMExS3RJRNfaO9gR9yNPYdJ4b4l9Q4Wj8qFUPCtKQQmkTvYdwIwre_V6vtDllyOfg&oh=b7b63c86b1e4704bdf0f676ee73385a4&oe=5B958449',
      email: 'demo3@gmail.com',
      fullName: 'Nguyễn Văn A',
      phoneNumber: '0949926268'
    }
},
{
  shortInfor:
    {
      UID: 'yydzu9XyuGQ8cvcSiUclCUC2kP13',
      avatar: 'https://scontent.fhan2-1.fna.fbcdn.net/v/t1.0-1/c47.0.160.160/p160x160/10354686_10150004552801856_220367501106153455_n.jpg?_nc_cat=0&_nc_eui2=AeEy49-OxPz6tv0jL0jNZWgw5siSoN_BMyc2svVnKtCUfcMExS3RJRNfaO9gR9yNPYdJ4b4l9Q4Wj8qFUPCtKQQmkTvYdwIwre_V6vtDllyOfg&oh=b7b63c86b1e4704bdf0f676ee73385a4&oe=5B958449',
      email: 'demo2@gmail.com',
      fullName: 'Nguyễn Văn A',
      phoneNumber: '0949926268'
    }
}]

const text = 'E';

firebase.database().ref('users').once('value', (snapshot) => {
  var userArr = Object.values(snapshot.val());
  // var userData = userArr.filter((item) => {
  //   console.log({uid: item.shortInfor.UID, name: item.shortInfor.fullName})
  //   return {uid: item.shortInfor.UID, name: item.shortInfor.fullName}
  // })
  // console.log(userData);

  var mapper = function (item) {
    return {
      id: item.shortInfor.UID,
      name: item.shortInfor.fullName
    }
  }

  var idx = lunr(function () {
    this.field('id');
    this.field('name');

    for (var key in userArr){
      this.add({
        id: key,
        name: userArr[key].shortInfor.fullName
      }, this);
    }
    // userArr.forEach(function (doc) {
    //   this.add(mapper(doc))
    //   // console.log(doc);
    // }, this)
  })

  // for (var key in userArr){
  //   idx.add({
  //     id: key,
  //     name: userArr[key].shortInfor.fullName
  //   });
  // }

  console.log(userArr[idx.search(text)[0].ref]);

//   return new Promise(function (resolve, reject) {
//     var listUsers = [];
//     var users = idx.search(text);
//     users.forEach((item) => {
//       firebase.database().ref('users/' + item.ref).once('value').then((snapshot) => {
//         console.log(snapshot.val());
//         listUsers.push(snapshot.val());
//       });
//     })
//     resolve(listUsers);
//   });
// }).then((listUsers) => {
//   listUsers.forEach((item) => {
//     // console.log(item.val());
//   })
})

// const text = 'E';
// var users = [];
// var teams = [];
// const promises = [];



// firebase.database().ref('users').once('value', (snapshot) => {
//   var userArr = Object.values(snapshot.val());
//   // var userData = userArr.filter((item) => {
//   //   console.log({uid: item.shortInfor.UID, name: item.shortInfor.fullName})
//   //   return {uid: item.shortInfor.UID, name: item.shortInfor.fullName}
//   // })
//   // console.log(userData);

//   var mapper = function (item) {
//     return {
//       id: item.shortInfor.UID,
//       name: item.shortInfor.fullName
//     }
//   }

//   var idx = lunr(function () {
//     this.ref('id')
//     this.field('name')

//     userArr.forEach(function (doc) {
//       this.add(mapper(doc))
//       // console.log(doc);
//     }, this)
//   })

//   users = idx.search(text);

//   firebase.database().ref('teams').once('value', (snapshot) => {
//     var teamArr = Object.values(snapshot.val());

//     var mapper = function (item) {
//       return {
//         id: item.ID,
//         name: item.name
//       }
//     }

//     var idx = lunr(function () {
//       this.ref('id')
//       this.field('name')

//       teamArr.forEach(function (doc) {
//         this.add(mapper(doc))
//         // console.log(doc);
//       }, this)
//     })

//     console.log({users: users, teams: idx.search(text)});
//   })
// })



// Promise.all(promises).then(results => {
//   console.log(results);
// })

// var mapper = function (item) {
//   return {
//     id: item.shortInfor.UID,
//     name: item.shortInfor.fullName
//   }
// }

// var idx = lunr(function () {
//   this.ref('id')
//   this.field('name')

//   documents.forEach(function (doc) {
//     this.add(mapper(doc))
//     // console.log(doc);
//   }, this)
// })

// console.log(idx.search("E"))
