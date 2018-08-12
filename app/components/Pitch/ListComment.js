import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    StatusBar,
    FlatList,
    Image,
} from 'react-native';

class ListComment extends Component {

    constructor(props) {
        super(props)
    }

    state = {
        typing: '',
        comments: []
    };

    componentDidMount() {
        this.loadCommentOfPitch();
    }

    loadCommentOfPitch() {
        const { actions, pitchID } = this.props;
        var listComments = [];
        var commentSnap = actions.loadCommentOfPitch(pitchID);
        const promises = [];
        commentSnap.then((snapshot) => {
            console.log(snapshot.val())
            if (snapshot.val() !== null) {
                Object.keys(snapshot.val()).forEach((key) => {
                    promises.push(listComments.push(snapshot.val()[key]));
                });
                Promise.all(promises).then(results => {
                    this.setState({ comments: listComments });
                    actions.changeCondition({ isLoading: false });
                })
            }
            actions.changeCondition({ isLoading: false });
        })
    }

    renderItem({ item }) {
        return (
            <View style={styles.row}>
                <Image style={styles.avatar} source={{ uri: item.avatar }} />
                <View style={styles.rowText}>
                    <Text style={styles.sender}>{item.username}</Text>
                    <Text style={styles.comment}>{item.comment}</Text>
                </View>
            </View>
        );
    };

    sendComment() {
        const { actions, userData } = this.props;
        var comment = {
            UID: userData.UID,
            avatar: userData.shortInfor.avatar,
            username: userData.shortInfor.fullName,
            comment: this.state.typing
        }
        this.setState(prevState => ({
            comments: [...prevState.comments, comment],
            typing: ''
        }))
        actions.sendComment(comment, this.props.pitchID);
    }

    render = () => {
        return (
            <View>
                <FlatList
                    data={this.state.comments}
                    renderItem={this.renderItem}
                    inverted
                />
                <View style={styles.footer}>
                    <TextInput
                        value={this.state.typing}
                        style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholder="Type something nice"
                        onChangeText={text => this.setState({ typing: text })}
                    />
                    <TouchableOpacity onPress={this.sendComment.bind(this)}>
                        <Text style={styles.send}>Send</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        padding: 5
    },
    avatar: {
        borderRadius: 20,
        width: 40,
        height: 40,
    },
    rowText: {
        flex: 1,
        paddingLeft: 10
    },
    comment: {
        fontSize: 14
    },
    sender: {
        fontWeight: 'bold',
        paddingRight: 10
    },
    footer: {
        flexDirection: 'row',
        backgroundColor: '#fff'
    },
    input: {
        fontSize: 14,
        flex: 1,
    },
    send: {
        alignSelf: 'center',
        color: 'lightseagreen',
        fontSize: 14,
        fontWeight: 'bold',
        padding: 10
    }
});

export default ListComment;