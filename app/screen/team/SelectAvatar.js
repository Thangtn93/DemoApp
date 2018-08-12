import React from 'react';
import { Button, Image, View, StyleSheet, TextInput, TouchableOpacity, Platform, Text, FlatList } from 'react-native';
import { ImagePicker } from 'expo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from "react-native-router-flux";
import Util from '../../share/Util';
import HeaderBack from '../../components/HeaderBack';
import MemberItem from '../../components/List/SimpleItem';
import LoadingScreen from '../util/LoadingScreen';
import * as todoActions from '../../actions/todoActions';

class SelectAvatar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            image: '',
            teamName: ''
        }
    }

    renderUploadAvatar() {
        return (
            <Image source={this.state.image.length === 0 ?
                require('../../assets/camera.png')
                :
                { uri: this.state.image }
            }
                style={{
                    height: 80,
                    width: 80,
                }}
                borderRadius={40}
            />
        );
    }

    render() {
        if (this.props.condition.isLoading) {
            return <LoadingScreen />;
        }

        return (
            <View style={{ flex: 1 }}>
                <HeaderBack headerName="Tạo đội"
                    renderRight={(this.state.teamName.length > 0 && this.state.image.length > 0) ?
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => {
                                this.props.actions.changeCondition({ isLoading: true });
                                // Actions.teamProfileScreen({ isFromCreateNewTeam: true });
                                this.props.actions.createNewTeam(this.state.teamName,
                                    this.props.newTeamReducer.friends.filter((user) => {
                                        if (user.isSelected) {
                                            return user;
                                        }
                                    }),
                                    this.state.image);
                                    // .then((teamID) => {
                                    //     console.log('teamID')
                                    //     console.log(teamID)
                                    //     this.props.actions.loadNewTeamInfor(teamID);
                                    // });
                            }}
                        >
                            <Text style={{
                                fontSize: 20,
                                fontWeight: 'bold',
                                marginRight: 10,
                            }}>Hoàn tất</Text>
                        </TouchableOpacity>
                        :
                        <View />
                    } />

                <View style={{ marginLeft: 10, marginRight: 10 }}>
                    <View style={{ justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center', height: 100 }}>
                        <TouchableOpacity onPress={this._pickImage} key='camera'>
                            {this.renderUploadAvatar()}
                        </TouchableOpacity>
                        <TextInput style={{
                            width: Util.size.width - 105,
                            height: 40,
                            paddingLeft: 5,
                            fontSize: 16,
                            fontWeight: 'bold',
                        }}
                            placeholder="Enter team name"
                            onChangeText={(text) => {
                                this.setState({
                                    teamName: text
                                })
                            }}
                        />
                    </View>
                    <FlatList
                        data={this.props.newTeamReducer.friends.filter((user) => {
                            if (user.isSelected) {
                                return user;
                            }
                        })}
                        key={'member'}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={
                            ({ item }) => {
                                return (
                                    <MemberItem
                                        avatar={item.avatar}
                                        title={item.fullName}
                                    />
                                )
                            }
                        }
                    />
                </View>
            </View>
        );
    }

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: false,
            aspect: [1, 1],
        });

        if (!result.cancelled) {
            this.setState({ image: result.uri });
        }
    };
}

const styles = StyleSheet.create({

});

function mapStateToProps(state) {
    return {
        newTeamReducer: state.newTeamReducer,
        condition: state.condition
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(todoActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectAvatar);