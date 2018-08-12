import React from "react";
import {
    StyleSheet, View, Text, Button, TouchableOpacity, TextInput, Picker, Alert, Image, Platform, KeyboardAvoidingView, ScrollView,
    Dimensions, Keyboard
} from "react-native";
import { bindActionCreators } from 'redux';
import * as todoActions from '../../actions/todoActions';
import { LIST_SO_NGUOI } from '../../share/constant';

import DateTimePicker from 'react-native-modal-datetime-picker';
import ModalPicker from '../../components/ModalPicker/index';
import InputTextIcon from '../../components/InputText/InputTextIcon';
import Container from '../../components/Container';
import { connect } from 'react-redux';
import { Actions } from "react-native-router-flux";
import HeaderBack from '../../components/HeaderBack';
import ButtonLoading from '../../components/Buttons/ButtonLoading';

import locationIcon from '../../assets/Icon_vitri.jpg';
import thanhvienIcon from '../../assets/Icon_doibong.jpg';
import InputTextIconVector from "../../components/InputText/InputTextIconVector";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import InputTitle from "../../components/InputText/InputTitle";
import InputTextPicker from "../../components/InputText/InputTextPicker";

class FindMatch extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isDateTimePickerVisible: false,
            tilekeo: '',
            san: 1,
            khuvuc: 1,
            moreRequest: '',
            listCity: [
                { key: 1, label: 'Hà Nội' }, // 1
            ],
            listkhuvuc: [
                { key: 1, label: 'Ba Đình' },
                { key: 2, label: 'Bắc Từ Liêm' },
                { key: 3, label: 'Cầu Giấy' },
                { key: 4, label: 'Đống Đa' },
                { key: 5, label: 'Gia Lâm' },
                { key: 6, label: 'Hà Đông' },
                { key: 7, label: 'Hai Bà Trưng' },
                { key: 8, label: 'Hoàn Kiếm' },
                { key: 9, label: 'Hoàng Mai' },
                { key: 10, label: 'Long Biên' },
                { key: 11, label: 'Nam Từ Liêm' },
                { key: 12, label: 'Tây Hồ' },
                { key: 13, label: 'Thanh Xuân' },
            ],
            listSan: [
                { key: 1, label: 'Sân nhà' }, // 1
                { key: 2, label: 'Sân khách' }, // 1
                { key: 3, label: 'Sân nhà/khách đều được' }, // 1
            ],
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

    _onChangeTilekeo = (tilekeo) => {
        this.setState({ tilekeo: tilekeo });
    }

    _onChangeKhuVuc = (khuvuc) => {
        this.setState({ khuvuc: khuvuc });
    }

    _onChangeLoaiSan = (loaiSan) => {
        this.setState({ san: loaiSan });
    }

    _onChangeMoreRequest = (moreRequest) => {
        this.setState({ moreRequest: moreRequest });
    }

    _onPressButton = () => {
        if (this.props.isFindMatch) {
            Actions.listMatchScreen();
        } else {
            this.props.actions.requestCreateMatch(this.state.khuvuc, this.state.san, this.state.tilekeo, this.props.pitchReducer, this.props.teamReducer, this.state.moreRequest);
        }
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
                <HeaderBack headerName={this.props.isFindMatch ? "Tìm đối" : "Đặt kèo"} />
                <View style={{ height: this.state.visibleHeight, }}>
                    <ScrollView>
                        <ModalPicker
                            style={{ width: '100%' }}
                            data={this.state.listCity}
                            onChange={(option) => {
                                this._onChangeLocation(option.label);
                            }}>

                            <View style={styles.inputWrapper}>
                                <Icon
                                    name='map-marker'
                                    size={24}
                                    color='black'
                                />
                                <Text style={styles.input}>{this.props.pitchReducer.location}</Text>
                            </View>
                        </ModalPicker>

                        <ModalPicker
                            style={{ width: '100%' }}
                            data={this.state.listkhuvuc}
                            onChange={(option) => {
                                this._onChangeKhuVuc(option.key);
                            }}>

                            <View style={styles.inputWrapper}>
                                <Icon
                                    name='map-marker'
                                    size={24}
                                    color='black'
                                />
                                <Text style={styles.input}>{this.state.listkhuvuc[this.state.khuvuc - 1].label}</Text>
                            </View>
                        </ModalPicker>

                        <ModalPicker
                            style={{ width: '100%' }}
                            data={this.state.listSan}
                            onChange={(option) => {
                                this._onChangeLoaiSan(option.key);
                            }}>

                            <View style={styles.inputWrapper}>
                                <Icon
                                    name='soccer-field'
                                    size={24}
                                    color='black'
                                />
                                <Text style={styles.input}>{this.state.listSan[this.state.san - 1].label}</Text>
                            </View>
                        </ModalPicker>

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

                        <ModalPicker
                            style={{ width: '100%' }}
                            data={data}
                            onChange={(option) => {
                                this.props.actions.changeFindPitchTime(option.key);
                            }}>

                            <View style={styles.inputWrapper}>
                                <Icon
                                    name='timelapse'
                                    size={24}
                                    color='black'
                                />
                                <Text style={styles.input}>{data[this.props.pitchReducer.time - 1].label}</Text>
                            </View>
                        </ModalPicker>

                        <View style={styles.inputWrapper}>
                            <Icon
                                name='scale-balance'
                                size={24}
                                color='black'
                            />
                            <TextInput style={styles.input}
                                onChangeText={this._onChangeTilekeo}
                                placeholder='Tỷ lệ kèo'
                                autoCapitalize={"sentences"}
                                value={this.state.tilekeo}
                                placeholderTextColor='black'
                                underlineColorAndroid='transparent' />
                        </View>

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

                        {this.props.isFindMatch ?
                            <View />
                            :
                            <InputTitle title='Yêu cầu khác'
                                onChangeText={this._onChangeMoreRequest}
                                value={this.state.moreRequest}
                                placeholder='Bạn có yêu cầu gì khác?'
                                returnKeyType='done'
                                autoCapitalize={'none'}
                                autoCorrect={false} />
                        }

                        <ButtonLoading
                            style={{ alignItems: 'center' }}
                            text={this.props.isFindMatch ? "Tìm đối" : "Đặt kèo"}
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
    container: {
        flex: 1,
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
        pitchReducer: state.pitchReducer,
        teamReducer: state.teamReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(todoActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FindMatch);
