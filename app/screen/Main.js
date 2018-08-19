import React, { Component } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, FlatList, Platform } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';
import * as todoActions from '../../app/actions/todoActions';
import firebase from '../config/firebase';

import Util from '../share/Util';

import Drawer from 'react-native-drawer';
import SideBar from '../components/SideBar';
import HeaderBack from '../components/HeaderBack';

class Main extends Component {
    constructor() {
        super();
    }

    async logout() {
        await firebase.auth().signOut();
        await this.props.actions.changeUserData({ UID: '' });
        Actions.loginScreen();
    }

    _onPressCell(index) {
        switch (index) {
            case 0:
                Actions.userProfileScreen();
                break;
            case 1:
                Actions.listTeamScreen();
                break;
            case 2:
                Actions.listPitchScreen();
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

    render() {
        return (
            <Drawer
                ref={(ref) => this._drawer = ref}
                type="overlay"
                content={<SideBar />}
                tapToClose={true}
                openDrawerOffset={0.3} // 20% gap on the right side of drawer
                panCloseMask={0.2}
            >
                <View style={styles.container}>
                    <HeaderBack
                        headerName='Bóng Việt'
                        backPress={() => { this._drawer.open() }}
                        icon="ios-menu"
                        renderRight={
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    onPress={() => Actions.searchResultScreen()}
                                    style={styles.button}
                                >
                                    <Icon name="ios-search"
                                        style={styles.iconHeader}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    onPress={() => this.logout()}
                                    style={styles.button}
                                >
                                    <Icon name="ios-log-out"
                                        style={styles.iconHeader}
                                    />
                                </TouchableOpacity>
                            </View>
                        }
                    />
                    
                    <FlatList
                        style={{paddingVertical: 50}}
                        data={[
                            { title: 'Thông tin cá nhân', icon: require('../assets/Icon_thongtincanhan.jpg') },
                            { title: 'Quản lý đội', icon: require('../assets/Icon_doibong.jpg') },
                            { title: 'Tìm sân', icon: require('../assets/Icon_timsan.png') },
                            { title: 'Tạo trận', icon: require('../assets/Icon_taotran.jpg') },
                        ]}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity onPress={this._onPressCell.bind(this, index)} style={{ flex: 1 }}>
                                <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', }}>
                                    <Image style={styles.ImageComponentStyle} source={item.icon} />
                                    <Text style={styles.ItemTextStyle}>{item.title}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                        numColumns={2}
                        key={'menu'}
                        keyExtractor={(item, index) => index}
                        ItemSeparatorComponent={this.renderSeparator}
                    />
                    
                </View>
            </Drawer>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: (Platform.OS === 'ios') ? 20 : Expo.Constants.statusBarHeight,
        flexDirection: 'row',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    iconHeader: {
        color: '#000',
        fontSize: 40
    },
    title: {
        color: '#ffffff',
        marginLeft: 10,
        fontSize: 20,
        fontWeight: 'bold',
    },
    button: {
        marginRight: 10,
    },

    ImageComponentStyle: {
        width: 100,
        height: 100
    },
    ItemTextStyle: {
        color: '#000',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 5
    },
    container: {
        flex: 1,
    },
});

function mapStateToProps(state) {
    return {
        condition: state.condition
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(todoActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);