import React, { Component } from 'react';
import {
  View, Dimensions, Keyboard, ScrollView, TouchableOpacity, Text, StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as todoActions from '../actions/todoActions';
import Main from '../screen/Main';
import Logo from '../components/Logo';
// import FacebookLogin from '../components/LoginSignup/FacebookLogin';
import GoogleLogin from '../components/LoginSignup/GoogleLogin';
import InputTextIconVector from '../components/InputText/InputTextIconVector';
import ButtonLoading from '../components/Buttons/ButtonLoading';
import { Actions } from 'react-native-router-flux';

class LoginScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visibleHeight: Dimensions.get('window').height
    }
  }

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow.bind(this))
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide.bind(this))
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }

  keyboardDidShow(e) {
    let newSize = Dimensions.get('window').height - e.endCoordinates.height - Expo.Constants.statusBarHeight
    this.setState({
      visibleHeight: newSize,
    })
  }

  keyboardDidHide(e) {
    this.setState({
      visibleHeight: Dimensions.get('window').height,
    })
  }

  _onChangeEmail = value => {
    this.props.actions.changeEmail(value);
  };

  _onChangePassword = value => {
    this.props.actions.changePassword(value);
  };

  render() {
    if (this.props.userData.UID) {
      return (
        <Main />
      );
    }

    const { formData } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: this.state.visibleHeight }}>
          <ScrollView>
            <Logo />
            <GoogleLogin {...this.props} />

            <InputTextIconVector source='email-outline'
              onChangeText={this._onChangeEmail}
              value={formData.email}
              placeholder='Email'
              autoCapitalize={'none'}
              returnKeyType={'done'}
              autoCorrect={false} />
            <InputTextIconVector source='key'
              onChangeText={this._onChangePassword}
              value={formData.password}
              secureTextEntry={true}
              placeholder='Password'
              returnKeyType={'done'}
              autoCapitalize={'none'}
              autoCorrect={false} />

            <ButtonLoading
              style={{ alignItems: 'center', marginVertical: 10 }}
              text='Đăng nhập'
              onPress={() => {
                this.props.actions.startLogin(formData.email, formData.password);
              }}
              isLoading={this.props.condition.isLoading}
            />

            <View style={{ alignItems: 'center' }}>
              <TouchableOpacity onPress={() => { Actions.signupScreen(); }}
                style={{ marginBottom: 10 }}
              >
                <Text style={styles.text}>Tạo tài khoản</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Actions.recoverPasswordScreen()}
                style={{ marginBottom: 10 }}>
                <Text style={styles.text}>Quên mật khẩu</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  text: {
    color: 'rgb(145,200,78)',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});

function mapStateToProps(state) {
  return {
    userData: state.userData,
    formData: state.formData,
    condition: state.condition
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(todoActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
