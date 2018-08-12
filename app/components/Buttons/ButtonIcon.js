import React from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ButtonIcon = props => {
    const {
        onPress,
        icon,
        size,
        color
    } = props;

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={onPress.bind(this)}
        >
            <Icon name={icon}
                size={size}
                color={color}
            />
        </TouchableOpacity>
    );
};

export default ButtonIcon;