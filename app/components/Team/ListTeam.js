import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    FlatList,
    Image
} from 'react-native';

const ListTeam = props => {

    const {
        teams, // list team {avatar: '', name: '', numMember: ''}
        onPress, // action khi nhan vao 1 item
    } = props;

    _renderItem = ({ item }) => {
        var countMember = 1;
        if(item.member.member !== undefined){
            countMember = Object.keys(item.member.admin).length + Object.keys(item.member.member).length;
        }
        
        return (
            <TouchableOpacity
                key={item.ID}
                style={styles.row}
                onPress={onPress.bind(this, item)}
            >
                <Image style={styles.avatar} source={{ uri: item.avatar }} />
                <View style={styles.rowText}>
                    <Text style={styles.sender}>{item.name}</Text>
                    <Text style={styles.comment}>{item.address}</Text>
                    <Text style={styles.comment}>{countMember} thành viên</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View>
            <FlatList
                data={teams}
                renderItem={this._renderItem}
                key={'listTeam'}
                keyExtractor={(item, index) => index.toString()}
            />

        </View>
    );
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
        width: 60,
        height: 60,
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
        fontSize: 16
    },
});

export default ListTeam;