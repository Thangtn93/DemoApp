import React, { Component } from 'react';
import {
    Text,
    View,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import HeaderBack from '../../components/HeaderBack';
import Logo from '../../components/Logo';
import { validateEmail, validatePhoneNumber } from '../../share/Util';
import * as todoActions from '../../actions/todoActions';
import ButtonLoading from '../../components/Buttons/ButtonLoading';
import InputTextIconVector from '../../components/InputText/InputTextIconVector';

class RecoverPass extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{ flex: 1, }}>
                <HeaderBack headerName='Quên mật khẩu' />
                <Logo />
                <InputTextIconVector source='email-outline'
                    onChangeText={(phoneOrEmail) => {
                        this.props.actions.changePhoneOrEmail(phoneOrEmail);
                    }}
                    value={this.props.formData.phoneOrEmail}
                    placeholder='Email hoặc số điện thoại'
                    autoCapitalize={'none'}
                    returnKeyType={'done'}
                    autoCorrect={false} />
                <ButtonLoading
                    style={{ alignItems: 'center' }}
                    text='Đổi mật khẩu'
                    onPress={() => {
                        const phoneOrEmail = this.props.formData.phoneOrEmail;
                        // if (validateEmail(phoneOrEmail)) {
                        // email
                        this.props.actions.getVerifyCodeByEmail(phoneOrEmail);
                        // } else if (validatePhoneNumber(phoneOrEmail)) {
                        //     // phone number
                        // } else {
                        //     this.setState({
                        //         error: true
                        //     })
                        // }
                    }}
                    isLoading={false}
                />
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        formData: state.formData,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(todoActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RecoverPass);