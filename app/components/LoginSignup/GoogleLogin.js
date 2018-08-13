import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View, Alert } from 'react-native';
import { Google } from 'expo';
import firebase from '../../config/firebase';


const auth = firebase.auth();

export default class GoogleLogin extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const { actions } = this.props;
        auth.onAuthStateChanged(user => {
            if (user != null) {
                this.props.actions.googleSignIn(user);
            } else {

            }
        });
    }

    async handleGoogleButton() {
        const { type, accessToken, idToken } = await Google.logInAsync({
            androidStandaloneAppClientId: '732120503804-89b7jae5hkm0us1lais2e1bambk821fi.apps.googleusercontent.com',
            iosStandaloneAppClientId: '<IOS_CLIENT_ID>',
            scopes: ['profile', 'email'],
        });
        if (type === 'success') {
            const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
            auth.signInWithCredential(credential)
                .then((user) => {
                })
                .catch(error => {
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
                    name="Google"
                    underlayColor={styles.facebookButton.backgroundColor}
                    onPress={() => this.handleGoogleButton()}
                >
                    <Text style={styles.facebookButtonText}>Log in with Google</Text>
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
        backgroundColor: '#d9534f'
    },
    facebookButtonText: {
        color: '#fff'
    },
    space: {
        height: 17
    }
});
