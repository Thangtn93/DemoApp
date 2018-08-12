import React from 'react';
import {
    TouchableHighlight,
    Text,
    StyleSheet,
    View,
    Image
} from 'react-native';
import Util from '../share/Util';
import profileIcon from '../assets/Icon_thongtindoi.jpg';

const GridItem = (props) => {
    const {
        _onPress,
        index,
        item
    } = props;
    console.log(item)

    return (
        <TouchableHighlight onPress={_onPress.bind(this, index)}>
            <View style={styles.boxContainer}>
                <Text style={styles.boxText}>{item.title}</Text>
                <Image source={item.icon} style={styles.boxIcon} />
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    boxContainer: {
        alignItems: "center",
        justifyContent: "center",
        width: Util.size.width / 2,
        height: Util.size.width / 2,
    },
    boxIcon: {
        position: "relative",
        top: -10,
        width: 50,
        height: 50
    },
    boxText: {
        position: "absolute",
        bottom: 15,
        width: Util.size.width / 2,
        textAlign: "center",
        left: 0,
        backgroundColor: "transparent"
    },
})

export default GridItem;