import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    View,
} from 'react-native';
import emailIcon from '../../assets/Icon_email.jpg';
import InputTextIcon from '../../components/InputText/InputTextIcon';
import HeaderBack from '../../components/HeaderBack';
import Logo from '../../components/Logo';

class VertifyCode extends Component {

    constructor() {
        super();
        this.state = {
            email: ''
        }
    }

    _onPress() {
    }

    render() {
        return (
            <View style={{ flex: 1, }}>
                <HeaderBack headerName='Quên mật khẩu' />
                <Logo />
                <View style={styles.container}>
                    <InputTextIcon source={emailIcon}
                        onChangeText={(value) => {
                            this.setState({
                                email: value
                            });
                        }}
                        value={this.state.email}
                        placeholder='Nhập mã xác thực'
                        autoCapitalize={'none'}
                        returnKeyType={'done'}
                        autoCorrect={false} />
                    <TouchableOpacity style={styles.button}
                        onPress={this._onPress}
                        activeOpacity={1} >
                        <Text style={styles.text}>Tiếp tục</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}
                        onPress={this._onPress}
                        activeOpacity={1} >
                        <Text style={styles.text}>Gửi lại mã xác thực</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E7BCAA',
        height: 40,
        width: 100,
        borderRadius: 20,
        zIndex: 100,
    },
    text: {
        color: 'black',
        letterSpacing: 1,
        backgroundColor: 'transparent',
    },
});

export default VertifyCode;
