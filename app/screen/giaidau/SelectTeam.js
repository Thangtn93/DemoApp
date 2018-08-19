import React, { Component } from "react";
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from "react-native";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Util from '../../share/Util';
import ListTeamComponent from '../../components/Team/ListTeam';
import HeaderBack from '../../components/HeaderBack';
import { Actions } from "react-native-router-flux";
import * as todoActions from '../../actions/todoActions';

class SelectTeam extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    toSelectMember = (team) => {
        Actions.chonThanhVien({ teamId: team.ID });
    }

    render() {
        var openTeam = this.props.teamReducer.listTeam.filter((item) => {
            if ((typeof item.rule === 'undefined') || item.rule === 'waitting') {
                return item;
            }
        })

        return (
            <View style={{ flex: 1 }}>
            <HeaderBack headerName="Chọn đội" />
                <ListTeamComponent
                    teams={openTeam}
                    onPress={this.toSelectMember}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({

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

export default connect(mapStateToProps, mapDispatchToProps)(SelectTeam);