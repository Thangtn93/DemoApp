// upload ảnh lên firebase
//import RNFetchBlob from 'react-native-fetch-blob';
var RNFetchBlob = require('react-native-fetch-blob');

const image = 'C:\Users\nguyenthedan\Pictures\6C54B99.PNG';

const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob


let uploadBlob = null
const imageRef = firebase.storage().ref('posts').child("test.jpg")
let mime = 'image/jpg'
fs.readFile(image, 'base64')
    .then((data) => {
        return Blob.build(data, { type: `${mime};BASE64` })
    })
    .then((blob) => {
        uploadBlob = blob
        return imageRef.put(blob, { contentType: mime })
    })
    .then(() => {
        uploadBlob.close()
        return imageRef.getDownloadURL()
    })
    .then((url) => {
        // URL of the image uploaded on Firebase storage
        console.log(url);

    })
    .catch((error) => {
        console.log(error);

    })