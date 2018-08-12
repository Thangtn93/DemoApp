import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
  TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from "react-native-router-flux";

const SearchBar = props => {
  const {
    value,
    _onChangeText,
    _onSubmitEditing,
    renderRight,
    backPress,
  } = props;

  return (
    <View>
      <View style={styles.statusBar}>

      </View>
      <View style={styles.header}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={backPress !== undefined ?
              backPress.bind(this)
              :
              () => Actions.pop()}
            style={styles.button}
          >
            <Icon name="ios-arrow-back"
              style={styles.iconHeader}
            />
          </TouchableOpacity>
          <TextInput
            style={{ height: 40, width: '80%', fontSize: 16 }}
            value={value}
            underlineColorAndroid='transparent'
            autoCorrect={false}
            maxLength={200}
            placeholder='Tìm kiếm'
            placeholderTextColor='gray'
            underlineColorAndroid='transparent'
            returnKeyType='search'
            onChangeText={_onChangeText}
            onSubmitEditing={_onSubmitEditing}
          />
        </View>
        {renderRight}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  statusBar: {
    height: (Platform.OS === 'ios') ? 20 : Expo.Constants.statusBarHeight,
    backgroundColor: '#000',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    height: 50,
    elevation: 5,
    borderBottomWidth: 0,
    borderColor: 'rgba(0,0,0,0.3)',
  },
  iconHeader: {
    color: '#000',
    fontSize: 40
  },
  title: {
    color: '#000',
    marginLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    marginLeft: 10,
    width: 30,
  },
});

export default SearchBar;
