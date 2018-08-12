import React, { Component } from "react";
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from "react-native";
import Util from '../../share/Util';
import { Actions } from "react-native-router-flux";
import LoadingScreen from '../util/LoadingScreen';
import * as todoActions from '../../actions/todoActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import HeaderBack from '../../components/HeaderBack';
import ButtonLoading from "../../components/Buttons/ButtonLoading";

class ListMatch extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.actions.changeCondition({ isLoading: true });
        this.props.actions.searchMatch(this.props.pitchReducer.date.getDate() + '/' + (this.props.pitchReducer.date.getMonth() + 1) + '/' + this.props.pitchReducer.date.getFullYear(), this.props.pitchReducer.time, this.props.pitchReducer.type);
    }

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#CED0CE",
                }}
            />
        );
    };

    _onPressItem = (item) => {
        this.props.actions.changeCondition({ isLoading: true });
        this.props.actions.loadMatchProfile(item);
        // Actions.matchProfileScreen();
        // this.props.actions.selectTeam(item);
        Actions.teamProfileScreen({ isFromSearch: true });
    };

    _onPressHenDoi = (item) => {
        this.props.actions.changeCondition({ isLoading: true });
        this.props.actions.requestMatch(item, this.props.teamReducer);
    };

    render() {
        if (this.props.condition.isLoading) {
            return <LoadingScreen />;
        }
        return (
            <View style={{
                flex: 1
            }}>
                <HeaderBack headerName="Tìm đối thủ" />
                <FlatList
                    data={this.props.pitchReducer.searchResult}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity style={styles.row} onPress={this._onPressItem.bind(this, item)}>
                            <Image source={{ uri: item.avatar }} style={styles.thumbnail} />
                            <View style={styles.itemRight}>
                                <Text style={styles.title}>{item.name}</Text>
                                <Text>{Util.mapToKhuVuc(item.khuvuc) +', '+ item.address}</Text>
                                <Text>{Util.mapToTime(item.time) + ' ngày ' + item.date}</Text>
                                <Text>{'Tỷ lệ kèo: '+item.tilekeo}</Text>
                                <Text>{Util.mapToSan(item.san)}</Text>
                                <Text>{item.teamSize + ' người'}</Text>
                                <Text>{item.moreRequest}</Text>
                                <ButtonLoading 
                                style={{ alignItems: 'flex-start' }}
                                text="Hẹn đội" isLoading={false} onPress={this._onPressHenDoi.bind(this, item)} />
                            </View>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={this.renderSeparator}
                />

            </View>
        )
    }
}

const styles = StyleSheet.create({
    thumbnail: {
        width: 50,
        height: 50
    },
    row: {
        flexDirection: 'row',
        width: '100%',
        margin: 5,
    },
    itemRight: {
        flexDirection: 'column',
        paddingLeft: 10,
        width: Util.size.width - 120,
    },
    title: {
        fontWeight: 'bold'
    },
});

function mapStateToProps(state) {
    return {
        teamReducer: state.teamReducer,
        pitchReducer: state.pitchReducer,
        condition: state.condition
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(todoActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListMatch);