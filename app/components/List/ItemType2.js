import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    View,
    Image
} from 'react-native';
import Util from '../../share/Util';

const ItemType2 = (props) => {
    const {
        matchID,
        avatar,
        title1,
        title2,
        title3,
        _onPress
    } = props;

    return (
        <TouchableOpacity onPress={_onPress.bind(this, matchID)} style={styles.row}>
            <Image style={styles.avatar} source={{ uri: avatar }} />
            <View style={styles.rowText}>
                <Text style={styles.header}>{title1}</Text>
                <Text style={styles.text}>{title2}</Text>
                <Text style={styles.text}>{title3}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    rowText: {
        paddingLeft: 10,
        alignSelf: 'center'
    },
    header: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    text: {
        fontSize: 14,
    }
})

export default ItemType2;