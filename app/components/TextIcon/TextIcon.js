import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const TextIcon = props => {
    const {
        icon,
        text,
        size
    } = props;

    return (
        <View style={styles.textContainer}>
            <Icon size={(typeof size === 'undefined') ? 14 : size} name={icon}></Icon>
            <Text style={{ marginLeft: 5 }}>{text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
});

export default TextIcon;