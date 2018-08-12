import React from 'react';
import { PixelRatio } from 'react-native';
import Dimensions from 'Dimensions';

const Util = {
  ratio: PixelRatio.get(),
  pixel: 1 / PixelRatio.get(),
  size: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  post(url, data, callback) {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

    fetch(url, fetchOptions)
      .then((response) => {
        return response.json()
      })
      .then((responseData) => {
        callback(responseData);
      });
  },
  key: 'BDKHFSDKJFHSDKFHWEFH-REACT-NATIVE',

  mapToTime(time) {
    switch (time) {
      case 1:
        return '5h30 - 7h00';
        break;
      case 2:
        return '7h00 - 8h30';
        break;
      case 3:
        return '8h30 - 10h00';
        break;
      case 4:
        return '10h00 - 11h30';
        break;
      case 5:
        return '11h30 - 13h00';
        break;
      case 6:
        return '13h00 - 14h30';
        break;
      case 7:
        return '14h30 - 16h00';
        break;
      case 8:
        return '16h00 - 17h30';
        break;
      case 9:
        return '17h30 - 19h00';
        break;
      case 10:
        return '19h00 - 20h30';
        break;
      case 11:
        return '20h30 - 22h00';
        break;
    }
  },

  mapToKhuVuc(khuvuc) {
    switch (khuvuc) {
      case 1:
        return 'Ba Đình';
        break;
      case 2:
        return 'Bắc Từ Liêm';
        break;
      case 3:
        return 'Cầu Giấy';
        break;
      case 4:
        return 'Đống Đa';
        break;
      case 5:
        return 'Gia Lâm';
        break;
      case 6:
        return 'Hà Đông';
        break;
      case 7:
        return 'Hai Bà Trưng';
        break;
      case 8:
        return 'Hoàn Kiếm';
        break;
      case 9:
        return 'Hoàng Mai';
        break;
      case 10:
        return 'Long Biên';
        break;
      case 11:
        return 'Nam Từ Liêm';
        break;
      case 12:
        return 'Tây Hồ';
        break;
      case 13:
        return 'Thanh Xuân';
        break;
    }
  },

  mapToSan(san) {
    switch (san) {
      case 1:
        return 'Sân nhà';
        break;
      case 2:
        return 'Sân khách';
        break;
      case 3:
        return 'Sân nhà/khách đều được';
        break;
    }
  }
};


// import {StyleSheet, Platform} from 'react-native';

// export function create(styles: Object): {[name: string]: number} {
//   const platformStyles = {};
//   Object.keys(styles).forEach((name) => {
//     let {ios, android, ...style} = {...styles[name]};
//     if (ios && Platform.OS === 'ios') {
//       style = {...style, ...ios};
//     }
//     if (android && Platform.OS === 'android') {
//       style = {...style, ...android};
//     }
//     platformStyles[name] = style;
//   });
//   return StyleSheet.create(platformStyles);
// }

export default Util;

export function validateEmail(email) {
  const _email = email;
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(_email).toLowerCase());
}

export function validatePhoneNumber(phoneNumber) {
  var check = phoneNumber.match(/\d/g);
  if (check === null || check === undefined) {
    return false;
  }
  if (check.length === 11 || check.length === 12) {
    return true;
  }
  return false;
}

export function mapToTime(time) {
  switch (time) {
    case 1:
      return '5h30 - 7h00';
      break;
    case 2:
      return '7h00 - 8h30';
      break;
    case 3:
      return '8h30 - 10h00';
      break;
    case 4:
      return '10h00 - 11h30';
      break;
    case 5:
      return '11h30 - 13h00';
      break;
    case 6:
      return '13h00 - 14h30';
      break;
    case 7:
      return '14h30 - 16h00';
      break;
    case 8:
      return '16h00 - 17h30';
      break;
    case 9:
      return '17h30 - 19h00';
      break;
    case 10:
      return '19h00 - 20h30';
      break;
    case 11:
      return '20h30 - 22h00';
      break;
  }
}