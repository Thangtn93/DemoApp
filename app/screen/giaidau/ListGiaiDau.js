import React, { Component } from "react";
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from "react-native";
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as todoActions from '../../actions/todoActions';

import { Actions } from "react-native-router-flux";
import ListTeamComponent from '../../components/Team/ListTeam';
import HeaderBack from '../../components/HeaderBack';
import LoadingScreen from '../util/LoadingScreen';
import Util from '../../share/Util';
import GiaiDauItem from '../../components/List/OrderItem';

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
                            <GiaiDauItem
                                avatar={item.avatar}
                                title1={item.tengiaidau}
                                title2={item.donvitochuc}
                                title3={'ngày tháng'}
                            />
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