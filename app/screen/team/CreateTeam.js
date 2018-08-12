import React, { Component } from "react";
import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity, Image, Platform, FlatList } from "react-native";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/Ionicons';
import * as todoActions from '../../actions/todoActions';
// import SearchBar from '../../components/SearchBar';
import SearchBar from 'react-native-material-design-searchbar';
import { Actions } from "react-native-router-flux";
import HeaderBack from '../../components/HeaderBack';
import MemberItem from '../../components/List/SimpleItem';
import LoadingScreen from '../util/LoadingScreen';

class CreateTeam extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            list: []
        };
    }

    componentDidMount() {
        if (this.props.userData.following.length > 0) {
            this.props.actions.changeCondition({ isLoading: true });
            this.props.actions.loadFriendsInfor(this.props.userData.following);
        }
    }

    componentWillReceiveProps(newProps) {
        this.setState({ list: newProps.newTeamReducer.friends });
    }

    _onSelect = (item) => {
        this.props.actions.selectMemberForNewTeam(item.UID);
    }

    _onSearch = (text) => {
        const searchText = text.length > 0 ? text.toLowerCase() : '';
        this.setState({
            list: this.filterObjectByValue(this.props.newTeamReducer.friends, searchText)
        })
    }

    filterObjectByValue = (data, searchText) => {
        return data.filter(function (item) {
            return item.fullName.toLowerCase().includes(searchText)
        });

    }

    render() {

        if (this.props.condition.isLoading) {
            return <LoadingScreen />;
        }

        return (
            <View style={{ flex: 1 }}>
                <HeaderBack headerName="Chọn thành viên"
                    renderRight={<TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => Actions.selectAvatarScreen()}>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            marginRight: 10,
                        }}>Next</Text>
                    </TouchableOpacity>}
                />
                <View style={{ flex: 1, marginLeft: 10, marginRight: 10 }}>
                    <SearchBar
                        onSearchChange={(text) => { this._onSearch(text) }}
                        height={40}
                        placeholder={'Search...'}
                        autoCorrect={false}
                        returnKeyType={'search'}
                    />
                    <FlatList
                        data={this.state.list}
                        key={'member'}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={
                            ({ item }) => {
                                return (
                                    <TouchableOpacity
                                        key={item.UID}
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                        onPress={() => {
                                            this._onSelect(item)
                                        }}>
                                        <MemberItem
                                            avatar={item.avatar}
                                            title={item.fullName}
                                        />
                                        {item.isSelected ?
                                            <Icon name="ios-checkmark-circle-outline"
                                                style={styles.iconCheck}
                                            />
                                            :
                                            <Icon name="ios-radio-button-off-outline"
                                                style={styles.iconCheck}
                                            />
                                        }
                                    </TouchableOpacity>

                                )
                            }
                        }
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    iconCheck: {
        color: '#000000',
        fontSize: 30
    },
})

function mapStateToProps(state) {
    return {
        newTeamReducer: state.newTeamReducer,
        userData: state.userData,
        condition: state.condition
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(todoActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTeam);