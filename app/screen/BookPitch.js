import React from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity, TextInput, Picker, Alert, Image } from "react-native";
import Dimensions from 'Dimensions';
import PropTypes from 'prop-types';

import DateTimePicker from 'react-native-modal-datetime-picker';
// import Picker from 'react-native-picker-js';
import ModalPicker from '../components/ModalPicker/index';
import InputTextIcon from '../components/InputText/InputTextIcon';
import Container from '../components/Container';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { Actions } from "react-native-router-flux";

import HeaderBack from '../components/HeaderBack';

import locationIcon from '../assets/Icon_vitri.jpg';
import thanhvienIcon from '../assets/Icon_doibong.jpg';
import ButtonLoading from "../components/Buttons/ButtonLoading";


const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;


class BookPitch extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isDateTimePickerVisible: false,
            time: 0
        };
    }

    _showDateTimePicker = () => this.setState({
        isDateTimePickerVisible: true,
    });

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    _handleDatePicked = (date) => {
        // this.state.dateFrom = date;
        console.log('A date has been picked: ', date);
        // if (this.state.isFrom) {
        // actions.changeFindPitchDateFrom(date);
        this.props.dispatch({ type: "CHANGE_FIND_PITCH_DATE", date });
        // } else {
        //     this.props.dispatch({ type: "CHANGE_FIND_PITCH_DATE_TO", date });
        // }
        this._hideDateTimePicker();
    };

    _onChangeLocation = value => {
        // actions.changeEmailLogin(value);
    };

    _onChangeDate = () => this.setState({
        isDateTimePickerVisible: true
    });

    _onChangeDateTo = () => this.setState({
        isDateTimePickerVisible: true
    });

    _onChangeTypePitch = (typePitch) => {
        this.props.dispatch({ type: "CHANGE_FIND_PITCH_TYPE_PITCH", typePitch });
    }


    render() {
        const data = [
            // { key: index++, section: true, label: 'Fruits' },
            { key: 1, label: '5h30 - 7h00' }, // 1
            { key: 2, label: '7h00 - 8h30' },
            { key: 3, label: '8h30 - 10h00' },
            { key: 4, label: '10h00 - 11h30' },
            { key: 5, label: '11h30 - 13h00' },
            // { key: index++, section: true, label: 'Vegetables' },
            { key: 6, label: '13h00 - 14h30' },
            { key: 7, label: '14h30 - 16h00' },
            { key: 8, label: '16h00 - 17h30' }, // 8
            { key: 9, label: '17h30 - 19h00' }, // 9
            { key: 10, label: '19h00 - 20h30' },
            { key: 11, label: '20h30 - 22h00' }
        ];

        return (
            <View style={{ flex: 1 }}>
                <HeaderBack headerName="Tìm sân" />
                <View style={styles.container}>
                    <InputTextIcon
                        value={this.props.pitchReducer.location}
                        source={locationIcon}
                        onChangeText={this._onChangeLocation}
                        placeholder="Location" />

                    <View style={styles.inputWrapper}>
                        <Image source={locationIcon}
                            style={styles.inlineImg} />
                        <Text onPress={this._onChangeDate} style={styles.input}>
                            {this.props.pitchReducer.date.getDate() + '/' + (this.props.pitchReducer.date.getMonth() + 1) + '/' + this.props.pitchReducer.date.getFullYear()}
                        </Text>
                    </View>

                    <ModalPicker
                        data={data}
                        // initValue="Select something yummy!"
                        onChange={(option) => {
                            this.setState({ time: option.key })
                            const time = this.state.time;
                            this.props.dispatch({ type: "CHANGE_FIND_PITCH_TIME", time });
                        }}>

                        <View style={styles.inputWrapper}>
                            <Image source={locationIcon}
                                style={styles.inlineImg} />
                            <Text style={styles.input}>{data[this.state.time].label}</Text>
                        </View>
                    </ModalPicker>

                    <View style={styles.inputWrapper}>
                        <Image source={thanhvienIcon}
                            style={styles.inlineImg} />
                        <TextInput style={styles.input}
                            onChangeText={this._onChangeTypePitch}
                            placeholder={this.props.pitchReducer.typePitch + ' người'}
                            autoCapitalize={"sentences"}
                            value={this.props.pitchReducer.typePitch}
                            placeholderTextColor='black'
                            underlineColorAndroid='transparent' />
                    </View>

                    <ButtonLoading
                        style={{ alignItems: 'center' }}
                        text='Search'
                        onPress={() => Actions.listPitchScreen()}
                        isLoading={false}
                    />

                    <DateTimePicker
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={this._handleDatePicked}
                        onCancel={this._hideDateTimePicker}
                    />

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    input: {
        textAlignVertical: 'center',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        width: DEVICE_WIDTH - 40,
        height: 40,
        marginHorizontal: 20,
        borderColor: 'black',
        borderWidth: 1,
        paddingLeft: 45,
        color: '#000',
    },
    inputWrapper: {
        flex: 0,
        marginBottom: 10,
    },
    inlineImg: {
        position: 'absolute',
        zIndex: 99,
        width: 22,
        height: 22,
        left: 35,
        top: 9,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E7BCAA',
        width: 100,
        height: 40,
        borderRadius: 20,
        zIndex: 100,
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        letterSpacing: 1,
        backgroundColor: 'transparent',
    },
});

function mapStateToProps(state) {
    return {
        pitchReducer: state.pitchReducer
    }
}

export default connect(mapStateToProps)(BookPitch);
