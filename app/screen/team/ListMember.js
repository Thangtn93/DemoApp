import React, { Component } from "react";
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from "react-native";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Util from '../../share/Util';
import HeaderBack from '../../components/HeaderBack';
import Card from '../../components/Card';
import MemberItem from '../../components/List/SimpleItem';
import RequestItem from '../../components/List/SimpleItem2';
import { Actions } from "react-native-router-flux";
import * as todoActions from '../../actions/todoActions';

class ListMember extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    acceptMember = (userData) => {
        this.props.actions.acceptMember(userData, this.props.teamReducer);
    }

    rejectMember = (userData) => {
        this.props.actions.rejectMember(userData, this.props.teamReducer);
    }

    toUserDetail = (user) => {
        this.props.actions.selectUser(user);
        Actions.userProfileScreen({ isFromSearch: true });
    }

    render() {
        const { teamReducer } = this.props;
        return (
            <View style={styles.container}>
                <HeaderBack headerName="Danh sách thành viên" />
                <Card
                    title='Yêu cầu tham gia nhóm'
                    child={
                        <FlatList
                            data={teamReducer.requestJoinTeam}
                            key={'request'}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={
                                ({ item }) => {
                                    return (
                                        <TouchableOpacity onPress={this.toUserDetail.bind(this, item)}>
                                            <RequestItem
                                                avatar={item.shortInfor.avatar}
                                                title={item.shortInfor.fullName}
                                                UID={item}
                                                accept={this.acceptMember}
                                                reject={this.rejectMember}
                                                isButton={this.props.rule === 'admin'}
                                            />
                                        </TouchableOpacity>
                                    )
                                }
                            }
                        />
                    }
                />
                <Card
                    title='Nhóm trưởng'
                    child={
                        <FlatList
                            data={teamReducer.admin}
                            key={'admin'}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={
                                ({ item }) => {
                                    return (
                                        <MemberItem
                                            avatar={item.avatar}
                                            title={item.fullName}
                                        />
                                    )
                                }
                            }
                        />
                    }
                />
                <Card
                    title='Thành viên'
                    child={
                        <FlatList
                            data={teamReducer.member}
                            key={'member'}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={
                                ({ item }) => {
                                    return (
                                        <MemberItem
                                            avatar={item.avatar}
                                            title={item.fullName}
                                        />
                                    )
                                }
                            }
                        />
                    }
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

export default connect(mapStateToProps, mapDispatchToProps)(ListMember);