import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const InputTextIconVector = props => {
    const {
        source,
        placeholder,
        secureTextEntry,
        autoCorrect,
        autoCapitalize,
        returnKeyType,
        onChangeText,
        value,
        keyboardType
    } = props;

    return (
        <View style={styles.inputWrapper}>
            <Icon
                name={source}
                size={24}
                color='black'
            />
            <TextInput style={styles.input}
                onChangeText={onChangeText}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                autoCorrect={autoCorrect}
                autoCapitalize={autoCapitalize}
                returnKeyType={returnKeyType}
                value={value}
                keyboardType={keyboardType}
                borderWidth={0}
                borderColor='transparent'
                placeholderTextColor='black'
                underlineColorAndroid='transparent' />
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        flex: 1,
        height: 40,
        color: '#000000',
        paddingLeft: 10
    },
    inputWrapper: {
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 10,
        height: 40,
        marginHorizontal: 20,
        borderBottomColor: '#000',
        borderBottomWidth: 1,
    },
});

export default InputTextIconVector;