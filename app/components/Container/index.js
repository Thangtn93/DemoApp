import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as todoActions from '../../actions/todoActions';
import {
	StyleSheet,
	View,
	Platform
} from 'react-native';

class Container extends Component {
	render() {
		const {
			children,
			actions,
			formData,
			userData,
			condition,
		} = this.props;

		const renderChildren = Array.isArray(children) ?
			children.map((child, key) => React.cloneElement(child, {
				key,
				actions,
				formData,
				userData,
				condition,
			}))
			:
			React.cloneElement(children, {
				actions,
				formData,
				userData,
				condition,
			});

		return (
			<View style={[this.props.style, styles.view]}>
				{renderChildren}
			</View>
		);
	}
}

const statusbarTop = (Platform.OS === 'ios') ? 20 : 0;

const styles = StyleSheet.create({
	picture: {
		flex: 1,
		width: null,
		height: null,
		top: statusbarTop,
	},
	view: {
		flex: 1,
		backgroundColor: 'rgb(145,200,78)',
		top: statusbarTop,
	}
});

function mapStateToProps(state) {
	return {
		formData: state.formData,
		userData: state.userData,
		condition: state.condition,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(todoActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
