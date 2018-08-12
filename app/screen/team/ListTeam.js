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

class ListTeam extends Component {

    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            routes: [
                { key: 'first', title: 'Đội của bạn' },
                { key: 'second', title: 'Tất cả các đội' },
            ],
        }
    }

    componentDidMount() {
        this.props.actions.getListTeam(this.props.userData.teams);
    }

    componentWillUnmount() {
        this.props.actions.clearSelectTeam();
    }

    _onPressItem = (item) => {
        Actions.teamManagerScreen({ teamID: item.ID, rule: item.rule });
    };

    toTeamDetail = (item) => {
        const { actions } = this.props;
        actions.selectTeam(item);
        Actions.teamProfileScreen({ isFromSearch: true });
    }

    _renderTabBar = props => <TabBar {...props} />;

    renderYourTeam = (teams) => (
        <ListTeamComponent
            teams={teams}
            onPress={this._onPressItem}
        />
    )

    renderAllTeam = (teams) => (
        <ListTeamComponent
            teams={teams}
            onPress={this.toTeamDetail}
        />
    )

    render() {
        if (this.props.condition.isLoading) {
            return <LoadingScreen />;
        }
        var yourTeam = this.props.teamReducer.listTeam.filter((item) => {
            if (typeof item.rule !== 'undefined' && item.rule !== 'waitting') {
                return item;
            }
        });
        var openTeam = this.props.teamReducer.listTeam.filter((item) => {
            if ((typeof item.rule === 'undefined') || item.rule === 'waitting') {
                return item;
            }
        })
        return (
            <View style={{ flex: 1 }}>
                <HeaderBack headerName="Danh sách đội"
                    renderRight={
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => Actions.createTeamScreen()}
                        >
                            <Text style={{
                                fontSize: 20,
                                fontWeight: 'bold',
                                marginRight: 10,
                            }}>Tạo đội</Text>
                        </TouchableOpacity>
                    } />
                <TabView
                    navigationState={this.state}
                    renderScene={SceneMap({
                        first: this.renderYourTeam.bind(this, yourTeam),
                        second: this.renderAllTeam.bind(this, openTeam),
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

export default connect(mapStateToProps, mapDispatchToProps)(ListTeam);