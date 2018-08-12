import React from 'react';
import {
    TouchableHighlight,
    Text,
    StyleSheet,
    View,
    Image
} from 'react-native';
import Util from '../../share/Util';

const SimpleItem = (props) => {
    const {
        avatar,
        title
    } = props;

    return (
        <View style={styles.row}>
            <Image style={styles.avatar} source={{ uri: avatar }} />
            <View style={styles.rowText}>
                <Text style={styles.title}>{title}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    rowText: {
        paddingLeft: 10,
        alignSelf: 'center'
    },
    title: {
        fontSize: 16,
    }
})

export default SimpleItem;