import React, { Component } from "react";
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from "react-native";
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Actions } from "react-native-router-flux";
import HeaderBack from '../../components/HeaderBack';
import LoadingScreen from '../util/LoadingScreen';
import Card from '../../components/Card';
import CalendarItem from '../../components/List/OrderItem';
import Util from '../../share/Util';
import * as todoActions from '../../actions/todoActions';

class TeamCalendar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            routes: [
                { key: 'first', title: 'Lịch thi đấu' },
                { key: 'second', title: 'Trận đang mở' },
                { key: 'third', title: 'Mời thi đấu' },
            ],
        }
    }

    componentDidMount() {
    }

    toChatScreen = (matchID) => {
        Actions.chatScreen({ matchID: matchID });
    }

    accept = (match) => {
        this.props.actions.acceptMatch(match);
    }

    reject = (match) => {
        this.props.actions.rejectMatch(match.ID, match.teamID2);
    }

    remove = (matchID) => {
        this.props.actions.removeMatch(this.props.teamReducer.ID, matchID);
    }

    cancelMatchApprove = (match) => {
        this.props.actions.cancelMatchApprove(match.ID, match.teamID2);
    }

    toTeamProfile = (teamID) => {
        this.props.actions.changeCondition({ isLoading: true });
        this.props.actions.loadNewTeamInfor(teamID);
        Actions.teamProfileScreen({ isFromCreateNewTeam: true });
    }

    _renderTabBar = props => <TabBar {...props} />;

    renderCalendarMatch = (calendarMatch) => (
        <FlatList
            data={calendarMatch}
            key={'approve'}
            keyExtractor={(item, index) => index.toString()}
            renderItem={
                ({ item }) => {
                    return (
                        <TouchableOpacity onPress={this.toChatScreen.bind(this, item.ID)}>
                            <CalendarItem
                                avatar={item.avatar2}
                                title1={item.name2}
                                title2={item.address}
                                title3={Util.mapToTime(item.time) + ' ngày ' + item.date}
                                reject={this.cancelMatchApprove}
                                dataReject={item}
                                enableAccept={false}
                                enableReject={this.props.rule === 'admin'}
                            />
                        </TouchableOpacity>
                    )
                }
            }
        />
    );

    renderOpenMatch = (openMatch) => (
        <FlatList
            data={openMatch}
            key={'request'}
            keyExtractor={(item, index) => index.toString()}
            renderItem={
                ({ item }) => {
                    return (
                        <CalendarItem
                            avatar={item.avatar}
                            title1={item.name}
                            title2={item.address}
                            title3={Util.mapToTime(item.time) + ' ngày ' + item.date}
                            reject={this.remove}
                            dataReject={item.ID}
                            enableAccept={false}
                            enableReject={this.props.rule === 'admin'}
                        />
                    )
                }
            }
        />
    );

    renderRequestMatch = (requestMatch, myRequestMatch) => (
        <View style={{ flex: 1 }}>
            <Card
                title='Các đội hẹn đấu'
                child={
                    <FlatList
                        data={requestMatch}
                        key={'wait'}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={
                            ({ item }) => {
                                return (
                                    <TouchableOpacity onPress={this.toTeamProfile.bind(this, item.teamID2)}>
                                        <CalendarItem
                                            avatar={item.avatar2}
                                            title1={item.name2}
                                            title2={item.address}
                                            title3={Util.mapToTime(item.time) + ' ngày ' + item.date}
                                            accept={this.accept}
                                            dataAccept={item}
                                            reject={this.reject}
                                            dataReject={item}
                                            enableAccept={this.props.rule === 'admin'}
                                            enableReject={this.props.rule === 'admin'}
                                        />
                                    </TouchableOpacity>
                                )
                            }
                        }
                    />
                }
            />
            <Card
                title='Mời thi đấu của đội'
                child={
                    <FlatList
                        data={myRequestMatch}
                        key={'wait'}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={
                            ({ item }) => {
                                return (
                                    <TouchableOpacity onPress={this.toTeamProfile.bind(this, item.teamID2)}>
                                        <CalendarItem
                                            avatar={item.avatar}
                                            title1={item.name}
                                            title2={item.address}
                                            title3={Util.mapToTime(item.time) + ' ngày ' + item.date}
                                            reject={this.reject}
                                            dataReject={item}
                                            enableAccept={false}
                                            enableReject={this.props.rule === 'admin'}
                                        />
                                    </TouchableOpacity>
                                )
                            }
                        }
                    />
                }
            />
        </View>
    );

    render() {
        var calendarMatch = this.props.teamReducer.matchs.filter(item => {
            if (item.type === 'approve') {
                return item;
            }
        })
        var openMatch = this.props.teamReducer.matchs.filter(item => {
            if (item.type === 'request') {
                return item;
            }
        })
        var requestMatch = this.props.teamReducer.matchs.filter(item => {
            if (item.type === 'waitting' && item.teamID2 !== this.props.teamReducer.ID) {
                return item;
            }
        })
        var myRequestMatch = this.props.teamReducer.matchs.filter(item => {
            if (item.type === 'waitting' && item.teamID2 === this.props.teamReducer.ID) {
                return item;
            }
        })

        return (
            <View style={{ flex: 1 }}>
                <HeaderBack headerName="Lịch thi đấu" />
                <TabView
                    navigationState={this.state}
                    renderScene={SceneMap({
                        first: this.renderCalendarMatch.bind(this, calendarMatch),
                        second: this.renderOpenMatch.bind(this, openMatch),
                        third: this.renderRequestMatch.bind(this, requestMatch, myRequestMatch),
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
    container: {
        backgroundColor: '#D3D3D3',
    },
});

function mapStateToProps(state) {
    return {
        teamReducer: state.teamReducer,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(todoActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamCalendar);