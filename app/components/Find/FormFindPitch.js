import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
	StyleSheet,
	KeyboardAvoidingView,
	View,
	Platform,
} from 'react-native';

import usernameImg from '../../assets/username.png';
import passwordImg from '../../assets/password.png';
import InputTextIcon from '../InputText/InputTextIcon';

const behavior = (Platform.OS === 'ios') ? 'position' : 'padding';

const FormLogin = props => {
	const {
		todos,
		actions,
		formData,
	} = props;

	const _onChangeEmailLogin = value => {
		actions.changeEmailLogin(value);
	};

	const _onChangePasswordLogin = value => {
		actions.changePasswordLogin(value);
	};

	return (
		<KeyboardAvoidingView behavior={behavior}
			style={styles.container}>
			<InputTextIcon source={usernameImg}
				onChangeText={_onChangeEmailLogin}
				value={formData.emailLogin}
				placeholder='Location'
				autoCapitalize={'none'}
				returnKeyType={'done'}
				autoCorrect={false} />
			<InputTextIcon source={passwordImg}
				onChangeText={_onChangePasswordLogin}
				value={formData.passwordLogin}
				placeholder='From'
				returnKeyType={'done'}
				autoCapitalize={'none'}
				autoCorrect={false} />
			<InputTextIcon source={passwordImg}
				onChangeText={_onChangePasswordLogin}
				value={formData.passwordLogin}
				placeholder='To'
				returnKeyType={'done'}
				autoCapitalize={'none'}
				autoCorrect={false} />
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
	}
});

export default FormLogin;