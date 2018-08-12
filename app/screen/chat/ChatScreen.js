import React, { Component } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'; // 0.2.5
import moment from 'moment';
import { connect } from 'react-redux';

const behavior = (Platform.OS === 'ios') ? 'position' : 'padding';
import firebase, { firebaseRef } from '../../config/firebase';
import HeaderBack from '../../components/HeaderBack';

const MESSAGE_PER_PAGE = 1000;

class ChatScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            messages: [],
            typingMessage: ''
        };
    }

    componentDidMount() {
        // this.loadMessage();
        this.on(message =>
            this.setState(previousState => ({
                messages: GiftedChat.append(previousState.messages, message),
            }))
        );
    }

    get ref() {
        // return firebase.database().ref('messages');
        return firebase.database().ref('chats/' + this.props.matchID + '/messages');
    }

    on = callback =>
        this.ref
            .limitToLast(20)
            .on('child_added', snapshot => callback(this.parse(snapshot)));

    parse = snapshot => {
        var msg = snapshot.val();
        var date = moment(snapshot.val().createdAt, "YYYYMMDDHHmmss").toDate();
        msg.createdAt = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));

        return msg;
    };

    loadMessage() {
        // firebase.database().ref('chats/-LG9oE03F313fOjxBFdl/peoples/7n4TThftsbdsvhZq1PFooQpI8D83').once('value').then((snapshot) => {
        //     // lấy msgID của tin nhắn đã đọc cuối cùng
        //     var lastSeenMessageID = snapshot.val().lastSeenMessageID;
        //     if (lastSeenMessageID === undefined) {
        //         // load 1000 tin nhắn tiếp theo
        //         firebase.database().ref('chats/-LG9oE03F313fOjxBFdl').child('messages').limitToFirst(MESSAGE_PER_PAGE + 1).on('child_added', (snapshot) => {

        //             console.log(snapshot.val());
        //             var msg = snapshot.val();
        //             var date = moment(snapshot.val().createdAt, "YYYYMMDDHHmmss").toDate();
        //             msg.createdAt = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
        //             console.log("loadMSG")
        //             console.log(msg)
        //             this.setState({
        //                 messages: [msg, ...this.state.messages]
        //             });

        //         });
        //     } else {
        //         console.log('B')
        //     }
        // });

        firebase.database().ref('chats/' + this.props.matchID).child('messages').limitToLast(MESSAGE_PER_PAGE + 1).on('child_added', (snapshot) => {

            console.log(snapshot.val());
            var msg = snapshot.val();
            var date = moment(snapshot.val().createdAt, "YYYYMMDDHHmmss").toDate();
            msg.createdAt = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
            this.setState({
                messages: [msg, ...this.state.messages]
            });

        });
    }

    onSend(messages) {
        var msg = {};
        msg._id = messages[0]._id;
        msg.text = messages[0].text;
        var datestring = moment(new Date()).format('YYYYMMDDHHmmss');
        msg.createdAt = datestring;
        msg.user = messages[0].user;
        firebase.database().ref('chats/' + this.props.matchID).child('messages').push(msg);
    }

    render() {
        return (
            <View style={{
                flex: 1,
            }}>
                <HeaderBack headerName="Chat nhóm" />
                <KeyboardAvoidingView behavior={behavior}
                    style={{
                        flex: 1,
                    }}>
                    <GiftedChat
                        messages={this.state.messages}
                        onSend={(messages) => this.onSend(messages)}
                        user={{
                            _id: this.props.userData.shortInfor.UID,
                            name: this.props.userData.shortInfor.fullName,
                            avatar: this.props.userData.shortInfor.avatar,
                        }}
                        alwaysShowSend={true}
                    />
                </KeyboardAvoidingView>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        userData: state.userData,
        condition: state.condition
    }
}

export default connect(mapStateToProps)(ChatScreen);