import React from "react";
import {
    StyleSheet, View, Text, Button, TouchableOpacity, TextInput, Picker, Alert, Image, Platform, KeyboardAvoidingView, ScrollView,
    Dimensions, Keyboard
} from "react-native";
import { bindActionCreators } from 'redux';
import * as todoActions from '../../actions/todoActions';

import DateTimePicker from 'react-native-modal-datetime-picker';
import { connect } from 'react-redux';
import { Actions } from "react-native-router-flux";
import HeaderBack from '../../components/HeaderBack';
import ButtonLoading from '../../components/Buttons/ButtonLoading';

import locationIcon from '../../assets/Icon_vitri.jpg';
import thanhvienIcon from '../../assets/Icon_doibong.jpg';
import InputTextIconVector from "../../components/InputText/InputTextIconVector";
import TextIcon from "../../components/TextIcon/TextIcon";

class TaoGiaiDau extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tengiaidau: '',
            donvitochuc: '',
            sodoithamgia: '',
            sobangdau: '',
            playoff: '',
            sodoiuutien: '',
            isDateTimePickerVisible: false,
            isDateFrom: false,
            dateFrom: '',
            dateTo: '',
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
        if (this.state.isDateFrom) {
            this.setState({ dateFrom: date })
        } else {
            this.setState({ dateTo: date })
        }
        this._hideDateTimePicker();
    };

    _onChangeTenGiaiDau = value => {
        this.setState({ tengiaidau: value });
    };

    _onChangeDonViToChuc = value => {
        this.setState({ donvitochuc: value });
    };

    _onChangeSoDoiThamGia = value => {
        if (Number.isNaN(Number.parseInt(value))) {
            Alert.alert('', 'Phải nhập số');
        } else {
            this.setState({ sodoithamgia: value });
        }
    };

    _onChangeSoBangDau = value => {
        if (Number.isNaN(Number.parseInt(value))) {
            Alert.alert('', 'Phải nhập số');
        } else {
            this.setState({ sobangdau: value });
        }
    };

    _onChangePlayoff = value => {
        if (Number.isNaN(Number.parseInt(value))) {
            Alert.alert('', 'Phải nhập số');
        } else {
            this.setState({ playoff: value });
        }
    };

    _onChangeSoDoiUuTien = value => {
        if (Number.isNaN(Number.parseInt(value))) {
            Alert.alert('', 'Phải nhập số');
        } else {
            this.setState({ sodoiuutien: value });
        }
    };

    _onChangeDateFrom = () => this.setState({
        isDateFrom: true,
        isDateTimePickerVisible: true
    });

    _onChangeDateTo = () => this.setState({
        isDateFrom: false,
        isDateTimePickerVisible: true
    });

    _onPressButton = () => {
        if (
            this.state.tengiaidau === '' ||
            this.state.donvitochuc === '' ||
            this.state.sodoithamgia === '' ||
            this.state.sobangdau === '' ||
            this.state.playoff === '' ||
            this.state.sodoiuutien === '' ||
            this.state.dateFrom === '' ||
            this.state.dateTo === ''
        ) {
            Alert.alert('', 'Phải nhập tất cả các trường');
        } else if (this.state.sodoithamgia / 2 < this.state.sobangdau) {
            Alert.alert('', 'Số đội tham gia và số bảng đấu không phù hợp');
        } else {
            var sodoithua = this.state.sodoithamgia % this.state.sobangdau;
            var soDoiTren1Bang = (this.state.sodoithamgia - sodoithua) / this.state.sobangdau;
            var soDoiVaoVongSau = soDoiTren1Bang * this.state.playoff + this.state.sodoiuutien;
            if(soDoiVaoVongSau % 4 === 0){
                this.props.actions.taoGiaiDau(
                    this.state.tengiaidau,
                    this.state.donvitochuc,
                    this.state.sodoithamgia,
                    this.state.sobangdau,
                    this.state.playoff,
                    this.state.sodoiuutien,
                    this.state.dateFrom.getTime(),
                    this.state.dateTo.getTime()
                );
            } else {
                Alert.alert('', 'Các tham số nhập vào chưa phù hợp để tạo giải');
            }
        }
        
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <HeaderBack headerName='Tạo giải đấu' />
                <View style={{ height: this.state.visibleHeight, }}>
                    <ScrollView>
                        <InputTextIconVector source='account'
                            onChangeText={this._onChangeTenGiaiDau}
                            value={this.state.tengiaidau}
                            placeholder='Tên giải đấu'
                            autoCapitalize={'none'}
                            returnKeyType={'done'}
                            autoCorrect={false} />

                        <InputTextIconVector source='account'
                            onChangeText={this._onChangeDonViToChuc}
                            value={this.state.donvitochuc}
                            placeholder='Đơn vị tổ chức'
                            autoCapitalize={'none'}
                            returnKeyType={'done'}
                            autoCorrect={false} />

                        <InputTextIconVector source='account'
                            onChangeText={this._onChangeSoDoiThamGia}
                            value={this.state.sodoithamgia}
                            placeholder='Số đội tham gia'
                            autoCapitalize={'none'}
                            returnKeyType={'done'}
                            keyboardType='numeric'
                            autoCorrect={false} />

                        <InputTextIconVector source='account'
                            onChangeText={this._onChangeSoBangDau}
                            value={this.state.sobangdau}
                            placeholder='Số bảng đấu'
                            autoCapitalize={'none'}
                            returnKeyType={'done'}
                            keyboardType='numeric'
                            autoCorrect={false} />

                        <InputTextIconVector source='account'
                            onChangeText={this._onChangePlayoff}
                            value={this.state.playoff}
                            placeholder='Playoff'
                            autoCapitalize={'none'}
                            returnKeyType={'done'}
                            keyboardType='numeric'
                            autoCorrect={false} />

                        <InputTextIconVector source='account'
                            onChangeText={this._onChangeSoDoiUuTien}
                            value={this.state.sodoiuutien}
                            placeholder='Số đội ưu tiên'
                            autoCapitalize={'none'}
                            returnKeyType={'done'}
                            keyboardType='numeric'
                            autoCorrect={false} />

                        <TouchableOpacity onPress={this._onChangeDateFrom} style={styles.inputWrapper} >
                            <TextIcon icon='calendar'
                                size={24}
                                text={this.state.dateFrom === '' ?
                                    'Thời gian bắt đầu đăng ký'
                                    :
                                    this.state.dateFrom.getDate() + '/' + (this.state.dateFrom.getMonth() + 1) + '/' + this.state.dateFrom.getFullYear()} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={this._onChangeDateTo} style={styles.inputWrapper} >
                            <TextIcon icon='calendar'
                                size={24}
                                text={this.state.dateTo === '' ?
                                    'Thời gian kết thúc đăng ký'
                                    :
                                    this.state.dateTo.getDate() + '/' + (this.state.dateTo.getMonth() + 1) + '/' + this.state.dateTo.getFullYear()} />
                        </TouchableOpacity>

                        <ButtonLoading
                            style={{ alignItems: 'center' }}
                            text='Tạo giải'
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

export default connect(mapStateToProps, mapDispatchToProps)(TaoGiaiDau);
