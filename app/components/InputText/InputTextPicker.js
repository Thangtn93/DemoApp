import React, { Component } from 'react';
import {
    StyleSheet, View, Text
} from 'react-native';
import ModalPicker from '../../components/ModalPicker/index';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const InputTextPicker = props => {
    const {
        data,
        onChange,
        icon,
        size,
        color,
        text,
    } = props;

    return (
        <ModalPicker
            style={{ width: '100%', marginBottom: 10 }}
            data={data}
            onChange={onChange.bind(this)}>
            <View style={styles.inputWrapper}>
                <Icon
                    name={icon}
                    size={size}
                    color={color}
                />
                <Text style={styles.input}>{text}</Text>
            </View>
        </ModalPicker>
    );
}

const styles = StyleSheet.create({
    input: {
        flex: 1,
        height: 40,
        color: '#000000',
        paddingLeft: 10,
        textAlignVertical: 'center'
    },
    inputWrapper: {
        alignItems: 'center',
        flexDirection: 'row',
        height: 40,
        marginHorizontal: 20,
        borderBottomColor: '#000',
        borderBottomWidth: 1,
    },
});

export default InputTextPicker;