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
            androidStandaloneAppClientId: '<ANDROID_CLIENT_ID>',
            iosStandaloneAppClientId: '<IOS_CLIENT_ID>',
            androidClientId: '732120503804-pq3g9bphbsiujn9n1ld3q8eo23nto750.apps.googleusercontent.com',
            iosClientId: '732120503804-pq3g9bphbsiujn9n1ld3q8eo23nto750.apps.googleusercontent.com',
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
