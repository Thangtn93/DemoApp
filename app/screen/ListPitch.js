import React, { Component } from "react";
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from "react-native";
import ModalPicker from '../components/ModalPicker/index';
import StarRating from '../components/StarRating/star-rating';
import Util from '../share/Util';
import { Actions } from "react-native-router-flux";
import LoadingScreen from './util/LoadingScreen';
import * as todoActions from '../actions/todoActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import HeaderBack from '../components/HeaderBack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LIST_KHU_VUC } from '../share/constant';
import InputTextPicker from "../components/InputText/InputTextPicker";

class ListPitch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            khuvuc: 'Ba Đình',
        };
    }

    componentDidMount() {
        this.props.actions.changeCondition({ isLoading: true });
        // this.props.actions.searchPitchForBooking(this.props.pitchReducer.date.getMonth() + 1, this.props.pitchReducer.date.getDate(), this.props.pitchReducer.time, this.props.pitchReducer.type);
        this.props.actions.loadAllPitch();
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

    _onPressItem = (pitchID) => {
        Actions.bookDetailScreen({ pitchID: pitchID });
    };

    _onChangeKhuVuc = (khuvuc) => {
        this.setState({ khuvuc: khuvuc });
    }

    render() {
        if (this.props.condition.isLoading) {
            return <LoadingScreen />;
        }

        return (
            <View style={{
                flex: 1
            }}>
                <HeaderBack headerName="Danh sách sân bóng" />
                <InputTextPicker
                    data={LIST_KHU_VUC}
                    onChange={(option) => {
                        this._onChangeKhuVuc(option.label);
                    }}
                    icon='map-marker'
                    size={24}
                    color='black'
                    text={this.state.khuvuc}
                />
                <FlatList
                    data={this.props.pitchReducer.searchResult.filter((item) => {
                        if (item.khuvuc === this.state.khuvuc) {
                            return item;
                        }
                    })}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity style={styles.row} onPress={this._onPressItem.bind(this, item.pitchID)}>
                            <Image source={{ uri: item.avatar }} style={styles.thumbnail} />
                            <View style={styles.itemRight}>
                                <Text style={styles.title}>{item.name}</Text>
                                <StarRating ratingObj={item.rating} />
                                <Text>{item.address}</Text>
                                <Text>{item.phoneNumber}</Text>
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
        width: 100,
        height: 100
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
    price: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        fontWeight: 'bold',
        fontSize: 16,
    },
    rating: {
        flexDirection: 'row',
    },
    input: {
        flex: 1,
        height: 40,
        color: '#000000',
        paddingLeft: 10,
        textAlignVertical: 'center'
    },
    inputWrapper: {
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 10,
        height: 40,
        marginHorizontal: 20,
        borderBottomColor: '#000',
        borderBottomWidth: 1,
    },
});

function mapStateToProps(state) {
    return {
        pitchReducer: state.pitchReducer,
        condition: state.condition
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(todoActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPitch);