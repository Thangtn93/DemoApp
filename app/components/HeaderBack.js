import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    Platform,
    TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from "react-native-router-flux";

const HeaderBack = props => {
    const {
        headerName,
        renderRight,
        backPress,
        icon
    } = props;

    return (
        <View>
            <View style={styles.statusBar}>

            </View>
            <View style={styles.header}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={backPress !== undefined ?
                            backPress.bind(this)
                            :
                            () => Actions.pop()}
                        style={styles.button}
                    >
                        <Icon name={(icon !== undefined) ? icon : "ios-arrow-back"}
                            style={styles.iconHeader}
                        />
                    </TouchableOpacity>
                    <Text style={styles.title}>
                        {headerName}
                    </Text>
                </View>
                {renderRight}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    statusBar: {
        height: (Platform.OS === 'ios') ? 20 : Expo.Constants.statusBarHeight,
        backgroundColor: '#000',
    },
    header: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        height: 50,
        paddingLeft: 10,
        paddingRight: 10,
        //     shadowOpacity: 0.8,
        //     shadowColor: '#000',
        //     shadowRadius: 0,

        //     borderColor:'#000', // if you need 
        // borderWidth:1,
        // overflow: 'hidden',
        // shadowRadius: 10,
        elevation: 5,
    },
    iconHeader: {
        color: '#000',
        fontSize: 40
    },
    title: {
        color: '#000',
        marginLeft: 10,
        fontSize: 20,
        fontWeight: 'bold',
    },
    button: {
        width: 30,
    },
});

export default HeaderBack;
