import React from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Image,
    Text
} from 'react-native';
import spinner from '../../assets/loading.gif';

const ButtonLoading = props => {
    const {
        onPress,
        isLoading,
        text,
        style
    } = props;

    return (
        <View style={style}>
            <TouchableOpacity style={styles.button}
                onPress={onPress.bind(this)}
                activeOpacity={0.7} >
                {isLoading ?
                    <Image source={spinner} style={styles.image} />
                    :
                    <Text style={styles.text}>{text}</Text>
                }
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgb(145,200,78)',
        height: 40,
        borderRadius: 20,
        paddingHorizontal: 30
    },
    text: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    image: {
        width: 24,
        height: 24,
    },
});

export default ButtonLoading;