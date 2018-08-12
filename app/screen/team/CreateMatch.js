import React from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity, TextInput, Picker, Alert, Image, ScrollView, Dimensions, Keyboard } from "react-native";
import { bindActionCreators } from 'redux';
import * as todoActions from '../../actions/todoActions';

import DateTimePicker from 'react-native-modal-datetime-picker';
import ModalPicker from '../../components/ModalPicker/index';
import InputTextIcon from '../../components/InputText/InputTextIcon';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import { Actions } from "react-native-router-flux";
import HeaderBack from '../../components/HeaderBack';

import locationIcon from '../../assets/Icon_vitri.jpg';
import thanhvienIcon from '../../assets/Icon_doibong.jpg';
import InputTextIconVector from "../../components/InputText/InputTextIconVector";
import { LIST_SO_NGUOI, LIST_KHUNG_GIO, LIST_CITY } from '../../share/constant';
import InputTextPicker from "../../components/InputText/InputTextPicker";
import ButtonLoading from "../../components/Buttons/ButtonLoading";
import InputTitle from "../../components/InputText/InputTitle";


const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;


class CreateMatch extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isDateTimePickerVisible: false,
            moreRequest: '',
            visibleHeight: Dimensions.get('window').height
        };
    }

    componentWillMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow.bind(this))
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide.bind(this))
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove()
        this.keyboardDidHideListener.remove()
    }

    keyboardDidShow(e) {
        let newSize = Dimensions.get('window').height - e.endCoordinates.height - 50 - Expo.Constants.statusBarHeight
        this.setState({
            visibleHeight: newSize,
        })
    }

    keyboardDidHide(e) {
        this.setState({
            visibleHeight: Dimensions.get('window').height,
        })
    }

    _showDateTimePicker = () => this.setState({
        isDateTimePickerVisible: true,
    });

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    _handleDatePicked = (date) => {
        this.props.actions.changeFindPitchDate(date);
        this._hideDateTimePicker();
    };

    _onChangeLocation = location => {
        this.props.actions.changeFindPitchLocation(location);
    };

    _onChangeDate = () => this.setState({
        isDateTimePickerVisible: true
    });

    _onChangeDateTo = () => this.setState({
        isDateTimePickerVisible: true
    });

    _onChangeTypePitch = (teamSize) => {
        this.props.actions.changeFindPitchTypePitch(teamSize);
    }

    _onChangeMoreRequest = (moreRequest) => {
        this.setState({ moreRequest: moreRequest });
    }

    _onPressButton = () => {
        if (this.props.isFreeMatch) {
            this.props.actions.createFreeMatch(this.props.pitchReducer, this.props.userData, this.state.moreRequest);
        } else {
            this.props.actions.requestCreateMatch(this.props.pitchReducer, this.props.teamReducer);
        }
    }

    render() {

        return (
            <View style={{ flex: 1 }}>
                <HeaderBack headerName={this.props.isFreeMatch ? "Tạo trận" : "Đặt kèo"} />
                <View style={{ height: this.state.visibleHeight, }}>
                    <ScrollView>
                        <InputTextPicker
                            data={LIST_CITY}
                            onChange={(option) => {
                                this._onChangeLocation(option.label);
                            }}
                            icon='timelapse'
                            size={24}
                            color='black'
                            text={this.props.pitchReducer.location}
                        />

                        <View style={styles.inputWrapper}>
                            <Icon
                                name='calendar'
                                size={24}
                                color='black'
                            />
                            <Text onPress={this._onChangeDate} style={styles.input}>
                                {this.props.pitchReducer.date.getDate() + '/' + (this.props.pitchReducer.date.getMonth() + 1) + '/' + this.props.pitchReducer.date.getFullYear()}
                            </Text>
                        </View>

                        <InputTextPicker
                            data={LIST_KHUNG_GIO}
                            onChange={(option) => {
                                this.props.actions.changeFindPitchTime(option.key);
                            }}
                            icon='timelapse'
                            size={24}
                            color='black'
                            text={LIST_KHUNG_GIO[this.props.pitchReducer.time - 1].label}
                        />

                        <InputTextPicker
                            data={LIST_SO_NGUOI}
                            onChange={(option) => {
                                this._onChangeTypePitch(option.key);
                            }}
                            icon='account-multiple'
                            size={24}
                            color='black'
                            text={this.props.pitchReducer.typePitch + ' người'}
                        />

                        <InputTitle
                            title='Yêu cầu khác'
                            onChangeText={this._onChangeMoreRequest}
                            value={this.state.moreRequest}
                            placeholder='Bạn có yêu cầu gì khác?'
                            returnKeyType='done'
                            autoCapitalize={'none'}
                            autoCorrect={false} />

                        <ButtonLoading
                            style={{ alignItems: 'center' }}
                            text={this.props.isFreeMatch ? "Tạo trận" : "Đặt kèo"}
                            onPress={this._onPressButton.bind(this)}
                            isLoading={false} />


                        <DateTimePicker
                            isVisible={this.state.isDateTimePickerVisible}
                            onConfirm={this._handleDatePicked}
                            onCancel={this._hideDateTimePicker}
                        />
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

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
        userData: state.userData,
        pitchReducer: state.pitchReducer,
        teamReducer: state.teamReducer,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(todoActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateMatch);
