// @flow
import React from 'react';
import {
	StyleSheet,
	View,
	Image,
	Text,
	Component
} from 'react-native';

// type Props = {
// 	ratingObj : {
// 		ratings: number;
// 		views: number;
// 	}
// };

export default class StarRating extends React.Component {
	render() {
		// Recieve the ratings object from the props
		let ratingObj = this.props.ratingObj;

		// This array will contain our star tags. We will include this
		// array between the view tag.
		let stars = [];
		// Loop 5 times
		for (var i = 1; i <= 5; i++) {
			// set the path to filled stars
			let path = require('./star-filled.png');
			// If ratings is lower, set the path to unfilled stars
			if (i > ratingObj.score) {
				path = require('./star-unfilled.png');
			}

			stars.push((<Image key={i.toString()} style={styles.image} source={path} />));
		}

		return (
			<View style={ styles.container }>
				{ stars }
				<Text style={styles.text}>({ratingObj.count})</Text>
				
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		// backgroundColor: '#FF00FF',
		flexDirection: 'row',
	},
	image: {
		width: 10,
		height: 10
	},
	text: {
		fontSize: 10,
		marginLeft: 5,
		marginRight: 5
	}
});