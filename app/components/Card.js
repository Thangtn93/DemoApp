import React from 'react';
import {
    Text,
    StyleSheet,
    View
} from 'react-native';

const Card = (props) => {
    const {
        child,
        title
    } = props;

    return (
        <View style={styles.card}>
            <Text style={styles.title}>{title}</Text>
            <View style={{ marginLeft: 10, marginRight: 10 }}>
                {child}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        marginBottom: 10,
    },
    title: {
        fontSize: 16,
        marginBottom: 10,
        marginTop: 10,
        marginLeft: 10,
        fontWeight: 'bold',
    }
})

export default Card;