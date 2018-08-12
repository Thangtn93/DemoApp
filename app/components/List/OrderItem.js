import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    View,
    Image
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const OrderItem = (props) => {
    const {
        avatar,
        title1,
        title2,
        title3,
        accept,
        dataAccept,
        reject,
        dataReject,
        enableAccept,
        enableReject
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
            <View style={styles.right}>
                {enableAccept ?
                    <TouchableOpacity onPress={accept.bind(this, dataAccept)} style={styles.button}>
                        <Icon name="ios-checkmark"
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                    :
                    <View />
                }
                {enableReject ?
                    <TouchableOpacity onPress={reject.bind(this, dataReject)} style={styles.button}>
                        <Icon name="ios-close"
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                    :
                    <View />
                }
            </View>
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
        height: 60,
        width: 30,
    },
    icon: {
        color: '#000',
        fontSize: 40
    },
})

export default OrderItem;