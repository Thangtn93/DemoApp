import React, { Component } from 'react';
import {
    View, Dimensions, Keyboard, ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as todoActions from '../../actions/todoActions';

import HeaderBack from '../../components/HeaderBack';
import InputTextIconVector from '../../components/InputText/InputTextIconVector';
import InputTitle from '../../components/InputText/InputTitle';
import ButtonLoading from '../../components/Buttons/ButtonLoading';

class EditProfile extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            phoneNumber: '',
            address: '',
            description: '',
            vitrisotruong: '',
            level: '',
            khunggio: '',
            visibleHeight: Dimensions.get('window').height
        }
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

    componentDidMount() {
        if (this.props.isEditUserProfile) {
            const { userData } = this.props;
            this.setState({
                name: userData.shortInfor.fullName,
                email: userData.shortInfor.email,
                phoneNumber: userData.shortInfor.phoneNumber,
                address: userData.shortInfor.address,
                description: userData.shortInfor.description,
                vitrisotruong: userData.shortInfor.vitrisotruong,
                level: userData.shortInfor.level,
            })
        } else {
            const { teamReducer } = this.props;
            this.setState({
                name: teamReducer.name,
                phoneNumber: teamReducer.phoneNumber,
                address: teamReducer.address,
                description: teamReducer.description,
                khunggio: teamReducer.khunggio,
            })
        }
    }

    _onChangeName = value => {
        this.setState({ name: value });
    };

    _onChangeEmail = value => {
        this.setState({ email: value });
    };

    _onChangePhoneNumber = value => {
        this.setState({ phoneNumber: value });
    };

    _onChangeAddress = value => {
        this.setState({ address: value });
    };

    _onChangeVitrisotruong = value => {
        this.setState({ vitrisotruong: value });
    };

    _onChangeLevel = value => {
        this.setState({ level: value });
    };

    _onChangeKhungGio = value => {
        this.setState({ khunggio: value });
    };

    _onChangeDescription = value => {
        this.setState({ description: value });
    };

    _onPressUpdate = () => {
        if (this.props.isEditUserProfile) {
            this.props.actions.updateProfile(this.props.userData, this.state.name, this.state.email, this.state.phoneNumber, this.state.address, this.state.vitrisotruong, this.state.level, this.state.description);
        } else {
            this.props.actions.updateTeamProfile(this.props.teamReducer, this.state.name, this.state.phoneNumber, this.state.address, this.state.khunggio, this.state.level, this.state.description);
        }
    };

    render() {
        const { formData } = this.props;
        return (
            <View style={{ flex: 1 }}>
                <HeaderBack headerName="Chỉnh sửa thông tin" />
                <View style={{ height: this.state.visibleHeight }}>
                    <ScrollView>
                        <InputTextIconVector source='account'
                            onChangeText={this._onChangeName}
                            value={this.state.name}
                            placeholder='Name'
                            autoCapitalize={'none'}
                            returnKeyType={'done'}
                            autoCorrect={false} />

                        {this.props.isEditUserProfile ?
                            <InputTextIconVector source='email-outline'
                                onChangeText={this._onChangeEmail}
                                value={this.state.email}
                                placeholder='Email'
                                returnKeyType={'done'}
                                autoCapitalize={'none'}
                                autoCorrect={false} />
                            :
                            <View />
                        }

                        <InputTextIconVector source='phone'
                            onChangeText={this._onChangePhoneNumber}
                            value={this.state.phoneNumber}
                            placeholder='Phone Number'
                            returnKeyType={'done'}
                            autoCapitalize={'none'}
                            autoCorrect={false} />

                        <InputTextIconVector source='map-marker'
                            onChangeText={this._onChangeAddress}
                            value={this.state.address}
                            placeholder='Address'
                            returnKeyType={'done'}
                            autoCapitalize={'none'}
                            autoCorrect={false} />

                        {this.props.isEditUserProfile ?
                            <InputTextIconVector source='tshirt-v'
                                onChangeText={this._onChangeVitrisotruong}
                                value={this.state.vitrisotruong}
                                placeholder='Vị trí sở trường'
                                returnKeyType={'done'}
                                autoCapitalize={'none'}
                                autoCorrect={false} />
                            :
                            <View />
                        }
                        {this.props.isEditTeamProfile ?
                            <InputTextIconVector source='calendar-clock'
                                onChangeText={this._onChangeKhungGio}
                                value={this.state.khunggio}
                                placeholder='Khung giờ'
                                returnKeyType={'done'}
                                autoCapitalize={'none'}
                                autoCorrect={false} />
                            :
                            <View />
                        }
                        <InputTextIconVector source='trending-up'
                            onChangeText={this._onChangeLevel}
                            value={this.state.level}
                            placeholder='Trình độ'
                            returnKeyType={'done'}
                            autoCapitalize={'none'}
                            autoCorrect={false} />

                        <InputTitle title='Mô tả'
                            onChangeText={this._onChangeDescription}
                            value={this.state.description}
                            placeholder='Thêm mô tả ...'
                            returnKeyType={'done'}
                            autoCapitalize={'none'}
                            autoCorrect={false} />

                        <ButtonLoading
                            style={{ alignItems: 'center' }}
                            onPress={this._onPressUpdate}
                            text='Update'
                            isLoading={this.props.condition.isLoading} />
                    </ScrollView>
                </View>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        teamReducer: state.teamReducer,
        userData: state.userData,
        condition: state.condition
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(todoActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);