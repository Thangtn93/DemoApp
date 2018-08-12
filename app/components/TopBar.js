import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform
} from 'react-native';
import iconSrc from '../assets/open_menu.png';

const TopBar = props => {
  const {
    onPress,
    iconType
  } = props;

  _renderIcon = () => {
    switch (iconType) {
      case 'OK':
        return <Image source={iconSrc} style={styles.icon} />
      default:

    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        My Todo
      </Text>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        style={styles.button}
      >
        {this._renderIcon()}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: (Platform.OS === 'ios') ? 0 : Expo.Constants.statusBarHeight,
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  title: {
    color: 'black',
    marginLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    marginRight: 10,
  },
  icon: {
    width: 30,
    height: 30,
  }
});

export default TopBar;
