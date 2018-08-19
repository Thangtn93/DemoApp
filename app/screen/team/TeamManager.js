import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableHighlight, FlatList } from "react-native";
import { Actions } from "react-native-router-flux";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as todoActions from '../../actions/todoActions';
import HeaderBack from '../../components/HeaderBack';

class TeamManager extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.actions.changeCondition({ isLoading: true });
        this.props.actions.loadTeamData(this.props.teamID, this.props.rule);
    }

    _onPressCell = (index) => {
        if (this.props.rule === 'admin') {
            switch (index) {
                case 0:
                    Actions.teamProfileScreen({ rule: this.props.rule });
                    break;
                case 1:
                    Actions.findMatchScreen();
                    break;
                case 2:
                    Actions.findMatchScreen({ isFindMatch: true });
                    break;
                case 3:
                    Actions.teamCalendarScreen({ rule: this.props.rule });
                    break;
                case 4:
                    Actions.listMemberScreen({ rule: this.props.rule });
                    break;
                case 5:
                    // this.props.actions.deleteTeam(this.props.teamReducer.ID);
                    // Actions.listTeamScreen({ type: "reset" })
                    Actions.chatScreen({ matchID: this.props.teamReducer.ID });
                    break;
                case 6:
                    Actions.listGiaiDau();
                    break;
            }
        } else {
            switch (index) {
                case 0:
                    Actions.teamProfileScreen({ rule: this.props.rule });
                    break;
                case 1:
                    Actions.teamCalendarScreen({ rule: this.props.rule });
                    break;
                case 2:
                    Actions.listMemberScreen({ rule: this.props.rule });
                    break;
                case 3:
                    Actions.chatScreen({ matchID: this.props.teamReducer.ID });
                    break;
            }
        }
    };

    render() {
        var menu = [];
        if (this.props.rule === 'admin') {
            menu = [
                { title: 'Thông tin đội', icon: require('../../assets/Icon_thongtindoi.png') },
                { title: 'Đặt kèo', icon: require('../../assets/Icon_datkeo.png') },
                { title: 'Tìm đối', icon: require('../../assets/Icon_timdoi.png') },
                { title: 'Lịch thi đấu', icon: require('../../assets/Icon_lichthidau.jpg') },
                { title: 'Danh sách thành viên', icon: require('../../assets/Icon_thanhvien.png') },
                { title: 'Chát nhóm', icon: require('../../assets/Icon_chatnhom.png') },
                { title: 'Giải đấu', icon: require('../../assets/icon_giaidau.png') },
            ]
        } else {
            menu = [
                { title: 'Thông tin đội', icon: require('../../assets/Icon_thongtindoi.png') },
                { title: 'Lịch thi đấu', icon: require('../../assets/Icon_lichthidau.jpg') },
                { title: 'Danh sách thành viên', icon: require('../../assets/Icon_thanhvien.png') },
                { title: 'Chát nhóm', icon: require('../../assets/Icon_chatnhom.png') },
            ]
        }
        return (
            <View>
                <HeaderBack headerName="Quản lý đội bóng" />
                <FlatList
                    data={menu}
                    renderItem={({ item, index }) => (
                        <TouchableHighlight onPress={this._onPressCell.bind(this, index)} style={{ flex: 1 }}>
                            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', }}>
                                <Image style={styles.ImageComponentStyle} source={item.icon} />
                                <Text style={styles.ItemTextStyle}>{item.title}</Text>
                            </View>
                        </TouchableHighlight>
                    )}
                    numColumns={2}
                    key={'menu'}
                    keyExtractor={(item, index) => index}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
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
});

function mapStateToProps(state) {
    return {
        teamReducer: state.teamReducer,
        condition: state.condition
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(todoActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamManager);