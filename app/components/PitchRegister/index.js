import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
	StyleSheet,
	KeyboardAvoidingView,
	View,
	Platform,
} from 'react-native';

import InputTextIcon from '../InputText/InputTextIcon';

import usernameImg from '../../assets/username.png';
import passwordImg from '../../assets/password.png';

const behavior = (Platform.OS === 'ios') ? 'position' : 'padding';

const FormSignup = props => {
	const {
		todos,
		actions,
		formData,
	} = props;

	const _onChangeEmailSignup = value => {
		actions.changeEmailSignup(value);
	};

	const _onChangePasswordSignup = value => {
		actions.changePasswordSignup(value);
	};

	return (
		<KeyboardAvoidingView behavior={behavior}
			style={styles.container}>
			<InputTextIcon source={usernameImg}
				onChangeText={_onChangeEmailSignup}
				value={formData.emailSignup}
				placeholder='Email'
				autoCapitalize={'none'}
				returnKeyType={'done'}
				autoCorrect={false} />
			<InputTextIcon source={passwordImg}
				onChangeText={_onChangePasswordSignup}
				value={formData.passwordSignup}
				secureTextEntry={true}
				placeholder='Password'
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

export default FormSignup;
