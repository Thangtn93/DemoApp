import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    View,
    Image
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const SimpleItem2 = (props) => {
    const {
        avatar,
        title,
        UID,
        accept,
        reject,
        isButton
    } = props;

    return (
        <View style={styles.row}>
            <View style={styles.left}>
                <Image style={styles.avatar} source={{ uri: avatar }} />
                <View style={styles.rowText}>
                    <Text style={styles.title}>{title}</Text>
                </View>
            </View>
            {isButton ?
                <View style={styles.right}>
                    <TouchableOpacity onPress={accept.bind(this, UID)} style={styles.button}>
                        <Icon name="ios-checkmark"
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={reject.bind(this, UID)} style={styles.button}>
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
    },
    left: {
        flexDirection: 'row',
    },
    right: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        width: 30,
        height: 40,
    },
    icon: {
        color: '#000',
        fontSize: 40
    },
})

export default SimpleItem2;