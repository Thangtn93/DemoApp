import React, { Component } from "react";
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, TouchableHighlight } from "react-native";
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as todoActions from '../../actions/todoActions';

import { Actions } from "react-native-router-flux";
import ListTeamComponent from '../../components/Team/ListTeam';
import HeaderBack from '../../components/HeaderBack';
import LoadingScreen from '../util/LoadingScreen';
import Util from '../../share/Util';

class ListGiaiDau extends Component {

    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            routes: [
                { key: 'first', title: 'Giải tham dự' },
                { key: 'second', title: 'Tất cả các giải' },
            ],
        }
    }

    componentDidMount() {
        this.props.actions.getAllLeague();
    }

    componentWillUnmount() {
        // this.props.actions.clearSelectTeam();
    }

    _onPressItem = (item) => {
        // Actions.teamManagerScreen({ teamID: item.ID, rule: item.rule });
    };

    handleJoinLeague(item) {
        Actions.chonTeam({ leagueId: item.ID });
    }

    _renderTabBar = props => <TabBar {...props} />;

    renderGiaiDauCuaBan = () => (
        <View />
    )

    renderAllGiaiDau = (allGiaiDau) => (
        <FlatList
            data={allGiaiDau}
            key={'allGiaiDau'}
            keyExtractor={(item, index) => index.toString()}
            renderItem={
                ({ item }) => {
                    return (
                        <TouchableOpacity
                        // onPress={this.toChatScreen.bind(this, item.ID)}
                        >
                            {/* <GiaiDauItem
                                avatar={item.avatar}
                                title1={item.tengiaidau}
                                title2={item.donvitochuc}
                                title3={'ngày tháng'}
                            /> */}
                            <View style={styles.row}>
                                <Image style={styles.avatar} source={{ uri: item.avatar }} />
                                <View style={styles.rowText} key='right'>
                                    <Text style={styles.title}>{item.tengiaidau}</Text>
                                    <Text style={styles.text}>{item.donvitochuc}</Text>
                                    <Text style={styles.text}>{item.donvitochuc}</Text>
                                    <TouchableHighlight
                                        style={styles.button}
                                        name="Join"
                                        underlayColor={styles.button.backgroundColor}
                                        onPress={this.handleJoinLeague.bind(this, item)}
                                    >
                                        <Text style={styles.buttonText}>Tham gia</Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                }
            }
        />
    )



    render() {
        if (this.props.condition.isLoading) {
            return <LoadingScreen />;
        }

        var allGiaiDau = this.props.userData.allGiaiDau;
        return (
            <View style={{ flex: 1 }}>
                <HeaderBack headerName="Danh sách giải đấu"
                    renderRight={
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => Actions.taoGiaiDau()}
                        >
                            <Text style={{
                                fontSize: 20,
                                fontWeight: 'bold',
                                marginRight: 10,
                            }}>Tạo giải</Text>
                        </TouchableOpacity>
                    } />
                <TabView
                    navigationState={this.state}
                    renderScene={SceneMap({
                        first: this.renderGiaiDauCuaBan,
                        second: this.renderAllGiaiDau.bind(this, allGiaiDau),
                    })}
                    onIndexChange={index => this.setState({ index })}
                    renderTabBar={this._renderTabBar}
                    initialLayout={{ width: Util.size.width, height: Util.size.height }}
                />
            </View>
        )
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
    text: {
        fontSize: 14,
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
        teamReducer: state.teamReducer,
        condition: state.condition
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(todoActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListGiaiDau);