import React from "react";
import { Text, View, StyleSheet, Platform, FlatList, TouchableOpacity, Image } from "react-native";
import { Actions } from 'react-native-router-flux';
import Logo from "./Logo";

export default class SideBar extends React.Component {

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#CED0CE",
                }}
            />
        );
    };

    _onPressCell(index) {
        switch (index) {
            case 0:
                Actions.userProfileScreen();
                break;
            case 1:
                Actions.listTeamScreen();
                break;
            case 2:
                Actions.bookPitchScreen();
                break;
            case 3:
                Actions.freeMatchScreen();
                break;
            case 4:
                Actions.createMatchScreen({ isFreeMatch: true });
                break;
            case 5:
                Actions.searchScreen();
                break;
        }
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff', }}>
                <View style={styles.statusBar} />
                <FlatList
                    data={[
                        { title: 'Thông tin cá nhân', icon: require('../assets/Icon_thongtincanhan.jpg') },
                        { title: 'Quản lý đội', icon: require('../assets/Icon_doibong.jpg') },
                        { title: 'Tìm sân', icon: require('../assets/Icon_timsan.png') },
                        { title: 'Tạo trận', icon: require('../assets/Icon_taotran.jpg') },
                    ]}
                    renderItem={
                        ({ item, index }) => {
                            return (
                                <TouchableOpacity onPress={this._onPressCell.bind(this, index)}>
                                    <View style={styles.row}>
                                        <Image style={styles.avatar} source={item.icon} />
                                        <View style={styles.rowText}>
                                            <Text style={styles.title}>{item.title}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                        }
                    }
                    key={'menu'}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={this.renderSeparator}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    statusBar: {
        height: (Platform.OS === 'ios') ? 20 : Expo.Constants.statusBarHeight,
        backgroundColor: '#000',
    },

    row: {
        flexDirection: 'row',
    },
    avatar: {
        width: 40,
        height: 40,
    },
    rowText: {
        paddingLeft: 10,
        alignSelf: 'center'
    },
    title: {
        fontSize: 16,
    }
})