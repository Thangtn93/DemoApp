﻿import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View, Alert } from 'react-native';
import { Facebook } from 'expo';
import firebase from '../../config/firebase';

/* Enter your Facebooko app ID here.
FACEBOOK_APP_ID lấy từ link
https://developers.facebook.com/apps/2166683270236145/settings/basic/
ID:2166683270236145
key secret: 3f30a0c5f3c294c9d2c31891673ebdee
*/

const FACEBOOK_APP_ID = '2166683270236145';


const auth = firebase.auth();
const provider = new firebase.auth.FacebookAuthProvider();

export default class FacebookLogin extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const { actions } = this.props;
        auth.onAuthStateChanged(user => {
            if (user != null) {
                this.props.actions.facebookSignIn(user);
            } else {
                
            }
        });
    }

    async handleFacebookButton() {
        console.log('handleFacebookButton')
        const { type, token } = await Facebook.logInWithReadPermissionsAsync(FACEBOOK_APP_ID, {
            permissions: ['public_profile', 'email']
        });
        if (type === 'success') {
            //Firebase credential is created with the Facebook access token.
            const credential = firebase.auth.FacebookAuthProvider.credential(token);
            auth.signInWithCredential(credential)
                .then((user) => {
                    console.log('signInWithCredential success', user.providerData);
                })
                .catch(error => {
                    console.log(error)
                    Alert.alert('',
                        error.message
                    )
                });
        }
    }

    render() {

        return (
            <View style={styles.container}>
                <TouchableHighlight
                    style={styles.facebookButton}
                    name="Facebook"
                    underlayColor={styles.facebookButton.backgroundColor}
                    onPress={() => this.handleFacebookButton()}
                >
                    <Text style={styles.facebookButtonText}>Đăng nhập bằng Facebook</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10
    },
    facebookButton: {
        width: 375 * 0.75,
        height: 48,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3B5998'
    },
    facebookButtonText: {
        color: '#fff'
    },
    space: {
        height: 17
    }
});
