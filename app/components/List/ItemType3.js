import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    View,
    Image
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Util from '../../share/Util';

const ItemType3 = (props) => {
    const {
        matchID,
        avatar,
        title1,
        title2,
        title3,
        accept,
        reject,
        isButton,
    } = props;

    return (
        <View style={styles.row}>
            <View style={styles.left}>
                <Image style={styles.avatar} source={{ uri: avatar }} />
                <View style={styles.rowText}>
                    <Text style={styles.header}>{title1}</Text>
                    <Text style={styles.text}>{title2}</Text>
                    <Text style={styles.text}>{title3}</Text>
                </View>
            </View>
            {isButton ?
                <View style={styles.right}>
                    <TouchableOpacity onPress={accept.bind(this, matchID)} style={styles.button}>
                        <Icon name="ios-checkmark"
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={reject.bind(this, matchID)} style={styles.button}>
                        <Icon name="ios-close"
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                </View>
                :
                <View />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    left: {
        flexDirection: 'row',
    },
    right: {
        flexDirection: 'row',
        alignItems: 'center',
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
    },
    button: {
        marginRight: 10,
    },
    icon: {
        color: '#000',
        fontSize: 40
    },
})

export default ItemType3;