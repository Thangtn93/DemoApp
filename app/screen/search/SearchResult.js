import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, FlatList, ActivityIndicator, Text, TouchableOpacity, Animated, TextInput } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SearchBar from '../../components/SearchBar';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as todoActions from '../../actions/todoActions';
import { Actions } from "react-native-router-flux";

import UserItem from '../../components/List/SimpleItem';
import TeamItem from '../../components/List/ItemType2';
import LoadingScreen from '../util/LoadingScreen';

class SearchResult extends Component {

    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            routes: [
                { key: 'first', title: 'User', icon: 'account' },
                { key: 'second', title: 'Team', icon: 'account-multiple' },
            ],
            searchText: ''
        }
    }

    componentDidMount() {

    }

    toTeamDetail = (item) => {
        this.props.actions.selectTeam(item);
        Actions.teamProfileScreen({ isFromSearch: true });
    }

    toUserDetail = (item) => {
        this.props.actions.selectUser(item);
        Actions.userProfileScreen({ isFromSearch: true });
    }

    renderListUser = () => (
        <FlatList
            data={this.props.searchReducer.users}
            key={'user'}
            keyExtractor={(item, index) => index.toString()}
            renderItem={
                ({ item }) => {
                    return (
                        <TouchableOpacity onPress={this.toUserDetail.bind(this, item)}>
                            <UserItem
                                avatar={item.shortInfor.avatar}
                                title={item.shortInfor.fullName}
                            />
                        </TouchableOpacity>
                    )
                }
            }
        />
    );

    renderListTeam = () => (
        <FlatList
            data={this.props.searchReducer.teams}
            key={'team'}
            keyExtractor={(item, index) => index.toString()}
            renderItem={
                ({ item }) => {
                    return (
                        <TeamItem
                            matchID={item}
                            avatar={item.avatar}
                            title1={item.name}
                            title2={item.address}
                            title3={item.date}
                            _onPress={this.toTeamDetail}
                        />
                    )
                }
            }
        />
    );

    _renderIcon = ({ route }) => (
        <Icon name={route.icon} size={24} color="red" />
    );

    _renderTabBar = props => {
        // const inputRange = props.navigationState.routes.map((x, i) => i);

        // return (
        //     <View style={styles.tabBar}>
        //         {props.navigationState.routes.map((route, i) => {
        //             // tab đó active thì true, còn lại là false
        //             const isTabSelect = props.position.interpolate({
        //                 inputRange,
        //                 outputRange: inputRange.map(
        //                     inputIndex => (inputIndex === i)
        //                 ),
        //             });
        //             console.log(isTabSelect)
        //             return (
        //                 <TouchableOpacity
        //                     key={i.toString()}
        //                     style={styles.tabItem}
        //                     onPress={() => this.setState({ index: i })}>
        //                     {isTabSelect === 1 ?
        //                         <Icon name={(i == 0) ? 'account' : 'account-multiple'}
        //                             style={{ fontSize: 30, color: 'red' }} />
        //                         :
        //                         <Icon name={(i == 0) ? 'account' : 'account-multiple'}
        //                             style={{ fontSize: 30, color: 'black' }} />}
        //                     {isTabSelect ?
        //                         <Text style={{ color: 'red' }}>{route.title}</Text>
        //                         :
        //                         <Text style={{ color: 'black' }}>{route.title}</Text>}
        //                 </TouchableOpacity>
        //             );
        //         })}
        //     </View>
        // );
        // return <TabBar {...props} style={styles.header} 
        // renderIcon={this._renderIcon}/>;

        const inputRange = props.navigationState.routes.map((x, i) => i);

        return (
            <View style={styles.tabBar}>
                {props.navigationState.routes.map((route, i) => {
                    const color = props.position.interpolate({
                        inputRange,
                        outputRange: inputRange.map(
                            inputIndex => (inputIndex === i ? '#D6356C' : '#222')
                        ),
                    });
                    return (
                        <TouchableOpacity
                        key={i.toString()}
                            style={styles.tabItem}
                            onPress={() => this.setState({ index: i })}>
                            <Icon name={route.icon} size={24} style={{ color: 'black' }} />
                            <Animated.Text style={{ color }}>{route.title}</Animated.Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    };

    _onChangeText = (text) => {
        this.setState({ searchText: text })
    }

    _onSubmitEditing = () => {
        this.props.actions.changeCondition({ isLoading: true });
        this.props.actions.search(this.state.searchText);
    }

    render() {
        if (this.props.condition.isLoading) {
            return <LoadingScreen />;
        }

        return (
            <View style={{ flex: 1 }}>
                <SearchBar
                    value={this.state.searchText}
                    _onChangeText={this._onChangeText}
                    _onSubmitEditing={this._onSubmitEditing} />
                <TabView
                    navigationState={this.state}
                    renderScene={SceneMap({
                        first: this.renderListUser,
                        second: this.renderListTeam,
                    })}
                    onIndexChange={index => this.setState({ index })}
                    renderTabBar={this._renderTabBar}
                    initialLayout={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tabBar: {
        flexDirection: 'row',
    },
    tabItem: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
})

function mapStateToProps(state) {
    return {
        searchReducer: state.searchReducer,
        condition: state.condition
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(todoActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);