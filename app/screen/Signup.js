import React, { Component } from 'react';
import {
	View, Dimensions, Keyboard, ScrollView, TouchableOpacity, Text, StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import Main from '../screen/Main';
import { bindActionCreators } from 'redux';
import * as todoActions from '../actions/todoActions';
import Logo from '../components/Logo';
import InputTextIconVector from '../components/InputText/InputTextIconVector';
import ButtonLoading from '../components/Buttons/ButtonLoading';
import { Actions } from 'react-native-router-flux';

class SigupScreen extends Component {

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

	_onChangeName = value => {
		this.props.actions.changeName(value);
	};

	_onChangeEmail = value => {
		this.props.actions.changeEmail(value);
	};

	_onChangePhoneNumber = value => {
		this.props.actions.changePhoneNumber('+84' + value.substring(3));
	};

	_onChangePassword = value => {
		this.props.actions.changePassword(value);
	};

	_onChangeRePassword = value => {
		this.props.actions.changeRePassword(value);
	};

	render() {
		if (this.props.userData.UID) {
			return <Main />;
		}

		const { formData } = this.props;
		return (
			<View style={{ flex: 1 }}>
				<View style={{ height: this.state.visibleHeight }}>
					<ScrollView>
						<Logo />

						<InputTextIconVector source='account'
							onChangeText={this._onChangeName}
							value={formData.name}
							placeholder='Name'
							autoCapitalize={'none'}
							returnKeyType={'done'}
							autoCorrect={false} />
						<InputTextIconVector source='email-outline'
							onChangeText={this._onChangeEmail}
							value={formData.email}
							placeholder='Email'
							returnKeyType={'done'}
							autoCapitalize={'none'}
							autoCorrect={false} />
						<InputTextIconVector source='phone'
							onChangeText={this._onChangePhoneNumber}
							value={formData.phoneNumber}
							placeholder='+84'
							returnKeyType={'done'}
							autoCapitalize={'none'}
							autoCorrect={false} />
						<InputTextIconVector source='key'
							onChangeText={this._onChangePassword}
							value={formData.password}
							secureTextEntry={true}
							placeholder='Password'
							returnKeyType={'done'}
							autoCapitalize={'none'}
							autoCorrect={false} />
						<InputTextIconVector source='key'
							onChangeText={this._onChangeRePassword}
							value={formData.rePassword}
							secureTextEntry={true}
							placeholder='Password'
							returnKeyType={'done'}
							autoCapitalize={'none'}
							autoCorrect={false} />

						<ButtonLoading
							style={{ alignItems: 'center', marginVertical: 10 }}
							text='Đăng ký'
							onPress={() => {
								this.props.actions.startSignup(formData);
							}}
							isLoading={this.props.condition.isLoading}
						/>

						<View style={{ alignItems: 'center' }}>
							<TouchableOpacity onPress={() => { Actions.pop(); }}
								style={{ marginBottom: 10 }}
							>
								<Text style={styles.text}>Tôi đã có tài khoản</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(SigupScreen);
