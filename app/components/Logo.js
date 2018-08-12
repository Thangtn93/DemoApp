import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from "react-native-router-flux";
import Dimensions from 'Dimensions';
import logoImg from '../assets/BongViet.png';

const DEVICE_WIDTH = Dimensions.get('window').width;

const Logo = props => {

  return (
      <View style={styles.container}>
          {/* <Image source={logoImg} style={styles.logo} /> */}
          <Text style={styles.logo}>Bóng Việt</Text>
      </View>
  );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10
    },
    logo: {
        // width: DEVICE_WIDTH - 40,
        color: 'rgb(145,200,78)',
        // color: 'white',
        fontSize: 80,
        fontWeight: 'bold',
    },
});

export default Logo;
