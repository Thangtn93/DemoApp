import React, { Component } from "react";
import { StyleSheet, View, Text, ScrollView, Image, TouchableHighlight, FlatList } from "react-native";
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import HeaderBack from '../../components/HeaderBack';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from "react-native-router-flux";
import * as todoActions from '../../actions/todoActions';
import Card from '../../components/Card';
import LoadingScreen from '../util/LoadingScreen';
import Util from '../../share/Util';
import Icon from 'react-native-vector-icons/MaterialIcons';

class FreeMatch extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            routes: [
                { key: 'first', title: 'Trận bạn tạo' },
                { key: 'second', title: 'Trận bạn tham gia' },
                { key: 'third', title: 'Trận đang mở' },
            ],
        }
    }

    componentDidMount() {
        this.props.actions.loadFreeMatchData();
    }

    componentWillUnmount() {
        this.props.actions.clearFreeMatchData();
    }

    toChatScreen(matchID) {
        Actions.chatScreen({ matchID: matchID });
    }

    handleDeleteMatch(item) {
        this.props.actions.deleteFreeMatch(item);
    }

    handleLeaveMatch(item) {
        this.props.actions.leaveFreeMatch(item, this.props.userData.shortInfor.UID);
    }

    handleJoinMatch(item) {
        this.props.actions.joinFreeMatch(item, this.props.userData.shortInfor.UID);
    }

    renderYourMatch = (adminMatch) => (
        <FlatList
            data={adminMatch}
            key={'admin'}
            keyExtractor={(item, index) => index.toString()}
            renderItem={
                ({ item }) => {
                    var content = [
                        { icon: 'group', text: Object.keys(item.member).length + ' người / ' + item.teamSize + ' người' },
                        { icon: 'today', text: Util.mapToTime(item.time) + ' ngày ' + item.date },
                        { icon: 'location-on', text: item.address },]
                    return (
                        <TouchableHighlight onPress={this.toChatScreen.bind(this, item.ID)}>
                            <View style={styles.row}>
                                <Image style={styles.avatar} source={{ uri: item.avatar }} />
                                <View style={styles.rowText} key='right'>
                                    <Text style={styles.title}>{item.name}</Text>
                                    {content.map((elem, index) => {
                                        return (
                                            <View style={styles.textContainer} key={index.toString()}>
                                                <Icon size={14} name={elem.icon}></Icon>
                                                <Text style={{ marginLeft: 5 }}>{elem.text}</Text>
                                            </View>
                                        );
                                    })}
                                    <TouchableHighlight
                                        style={styles.button}
                                        name="Join"
                                        underlayColor={styles.button.backgroundColor}
                                        onPress={this.handleDeleteMatch.bind(this, item)}
                                    >
                                        <Text style={styles.buttonText}>Hủy trận</Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </TouchableHighlight>
                    )
                }
            }
        />
    );

    renderMatchOfYou = (yourMatch) => (
        <FlatList
            data={yourMatch}
            key={'join'}
            keyExtractor={(item, index) => index.toString()}
            renderItem={
                ({ item }) => {
                    var content = [
                        { icon: 'group', text: Object.keys(item.member).length + ' người / ' + item.teamSize + ' người' },
                        { icon: 'today', text: Util.mapToTime(item.time) + ' ngày ' + item.date },
                        { icon: 'location-on', text: item.address },]
                    return (
                        <TouchableHighlight onPress={this.toChatScreen.bind(this, item.ID)}>
                            <View style={styles.row}>
                                <Image style={styles.avatar} source={{ uri: item.avatar }} />
                                <View style={styles.rowText} key='right'>
                                    <Text style={styles.title}>{item.name}</Text>
                                    {content.map((elem, index) => {
                                        return (
                                            <View style={styles.textContainer} key={index.toString()}>
                                                <Icon size={14} name={elem.icon}></Icon>
                                                <Text style={{ marginLeft: 5 }}>{elem.text}</Text>
                                            </View>
                                        );
                                    })}
                                    <TouchableHighlight
                                        style={styles.button}
                                        name="Join"
                                        underlayColor={styles.button.backgroundColor}
                                        onPress={this.handleLeaveMatch.bind(this, item)}
                                    >
                                        <Text style={styles.buttonText}>Rời trận</Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </TouchableHighlight>
                    )
                }
            }
        />
    );

    renderOpenMatch = (openMatch) => (
        <FlatList
            data={openMatch}
            key={'open'}
            keyExtractor={(item, index) => index.toString()}
            renderItem={
                ({ item }) => {
                    var content = [
                        { icon: 'group', text: Object.keys(item.member).length + ' người / ' + item.teamSize + ' người' },
                        { icon: 'today', text: Util.mapToTime(item.time) + ' ngày ' + item.date },
                        { icon: 'location-on', text: item.address },]
                    return (
                        <View style={styles.row}>
                            <Image style={styles.avatar} source={{ uri: item.avatar }} />
                            <View style={styles.rowText} key='right'>
                                <Text style={styles.title}>{item.name}</Text>
                                {content.map((elem, index) => {
                                    return (
                                        <View style={styles.textContainer} key={index.toString()}>
                                            <Icon size={14} name={elem.icon}></Icon>
                                            <Text style={{ marginLeft: 5 }}>{elem.text}</Text>
                                        </View>
                                    );
                                })}
                                <TouchableHighlight
                                    style={styles.button}
                                    name="Join"
                                    underlayColor={styles.button.backgroundColor}
                                    onPress={this.handleJoinMatch.bind(this, item)}
                                >
                                    <Text style={styles.buttonText}>Tham gia</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    )
                }
            }
        />
    );

    _renderTabBar = props => <TabBar {...props} style={styles.header} />;

    render() {
        if (this.props.condition.isLoading) {
            return <LoadingScreen />;
        }

        var adminMatch = this.props.userData.freeMatchs.filter(item => {
            if (Object.keys(this.props.userData.freeMatch).indexOf(item.ID) > -1 && this.props.userData.freeMatch[item.ID] === 'admin') {
                return item;
            }
        })
        var yourMatch = this.props.userData.freeMatchs.filter(item => {
            if (Object.keys(this.props.userData.freeMatch).indexOf(item.ID) > -1 && this.props.userData.freeMatch[item.ID] !== 'admin') {
                return item;
            }
        })
        var openMatch = this.props.userData.freeMatchs.filter(item => {
            if (Object.keys(this.props.userData.freeMatch).indexOf(item.ID) < 0) {
                return item;
            }
        })

        return (
            <View style={{ flex: 1 }}>
                <HeaderBack headerName="Trận đấu tự do"
                    renderRight={
                        <TouchableHighlight
                            activeOpacity={0.7}
                            onPress={() => Actions.createMatchScreen({ isFreeMatch: true })}
                        >
                            <Text style={{
                                fontSize: 20,
                                fontWeight: 'bold',
                                marginRight: 10,
                            }}>Tạo trận</Text>
                        </TouchableHighlight>
                    } />
                <TabView
                    navigationState={this.state}
                    renderScene={SceneMap({
                        first: this.renderYourMatch.bind(this, adminMatch),
                        second: this.renderMatchOfYou.bind(this, yourMatch),
                        third: this.renderOpenMatch.bind(this, openMatch),
                    })}
                    onIndexChange={index => this.setState({ index })}
                    renderTabBar={this._renderTabBar}
                    initialLayout={{ width: Util.size.width, height: Util.size.height }}
                />
            </View>
        );
    }
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
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },

    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    icon: {
        color: '#000',
        fontSize: 10
    },

    button: {
        width: 200,
        height: 30,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3B5998',
        marginBottom: 5,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

function mapStateToProps(state) {
    return {
        userData: state.userData,
        condition: state.condition
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(todoActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FreeMatch);