import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Text
} from 'react-native';

const InputTitle = props => {
    const {
        title,
        placeholder,
        secureTextEntry,
        autoCorrect,
        autoCapitalize,
        returnKeyType,
        onChangeText,
        value,
    } = props;

    return (
        <View style={styles.inputWrapper}>
            <Text style={styles.title}>{title}</Text>
            <TextInput style={styles.input}
                onChangeText={onChangeText}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                autoCorrect={autoCorrect}
                autoCapitalize={autoCapitalize}
                returnKeyType={returnKeyType}
                multiline={true}
                value={value}
                borderWidth={1}
                borderColor='black'
                borderRadius={20}
                placeholderTextColor='black'
                underlineColorAndroid='transparent' />
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingVertical: 5
    },
    input: {
        flex: 1,
        width: '100%',
        height: 100,
        color: '#000000',
    },
    inputWrapper: {
        flexDirection: 'column',
        marginBottom: 10,
        height: 140,
        marginHorizontal: 20,
    },
});

export default InputTitle;