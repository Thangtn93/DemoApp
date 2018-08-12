// const ageArr = [{
//     "id": 1,
//     "age_range": "0 - 10 Years old",
//     "value": 1
//   }, {
//     "id": 2,
//     "age_range": "11 - 20 Years old",
//     "value": 1
//   }, {
//     "id": 3,
//     "age_range": "21 - 30 Years old",
//     "value": 78
//   }]
  
//   const colorArr = [{
//     "id": 1,
//     "color": "#333"
//   }, {
//     "id": 2,
//     "color": "#666"
//   }, {
//     "id": 3,
//     "color": "#999"
//   }]
  
//   const mergedArr = colorArr.map((item,i)=>Object.assign({},item,ageArr[i]));
//   console.log(mergedArr)

  const state = {
      'friends': [],
      'select': []
  }

  const friendsFetch = [{
    'id': 1,
    'name': 'A',
    'avatar': 'https://scontent.fhan2-1.fna.fbcdn.net/v/t1.0-1/c47.0.160.160/p160x160/10354686_10150004552801856_220367501106153455_n.jpg?_nc_cat=0&_nc_eui2=AeEy49-OxPz6tv0jL0jNZWgw5siSoN_BMyc2svVnKtCUfcMExS3RJRNfaO9gR9yNPYdJ4b4l9Q4Wj8qFUPCtKQQmkTvYdwIwre_V6vtDllyOfg&oh=b7b63c86b1e4704bdf0f676ee73385a4&oe=5B958449'
}, {
  'id': 2,
  'name': 'B',
  'avatar': 'https://scontent.fhan2-1.fna.fbcdn.net/v/t1.0-1/c47.0.160.160/p160x160/10354686_10150004552801856_220367501106153455_n.jpg?_nc_cat=0&_nc_eui2=AeEy49-OxPz6tv0jL0jNZWgw5siSoN_BMyc2svVnKtCUfcMExS3RJRNfaO9gR9yNPYdJ4b4l9Q4Wj8qFUPCtKQQmkTvYdwIwre_V6vtDllyOfg&oh=b7b63c86b1e4704bdf0f676ee73385a4&oe=5B958449'
}]

const selectFetch = {'select': []};
const mergeFriendsFetch = Object.assign({}, {'friends': friendsFetch})
console.log(mergeFriendsFetch)

const mergeState = Object.assign({},mergeFriendsFetch,selectFetch);
console.log(mergeState)