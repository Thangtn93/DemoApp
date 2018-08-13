import React, { Component } from "react";
import { StyleSheet, View, Text, ScrollView, Image, TouchableHighlight, TouchableOpacity, Platform } from "react-native";
import Carousel from 'react-native-snap-carousel';
import { Actions } from "react-native-router-flux";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HeaderBack from '../../components/HeaderBack';
import TextIcon from '../../components/TextIcon/TextIcon';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as todoActions from '../../actions/todoActions';
import Card from '../../components/Card';
import LoadingScreen from '../util/LoadingScreen';

import { MARGIN_CARD } from '../../share/constant';
import Util from '../../share/Util';
import ImageSlider from "../../components/ImageSlider";
import { ImagePicker, Permissions } from 'expo';

const WIDTH = Util.size.width;

class TeamProfile extends React.Component {

    componentWillUnmount() {
        this.props.actions.clearSelectTeam();
    }

    handleJoinTeam() {
        this.props.actions.requestJoinTeam(this.props.userData.shortInfor.UID, this.props.searchReducer.teamSelect.ID);
    }

    handleLeaveTeam(isAdmin) {
        if (!isAdmin) {
            this.props.actions.leaveTeam(this.props.userData.shortInfor.UID, this.props.searchReducer.teamSelect.ID);
        }
    }

    handleCancelRequest() {
        this.props.actions.cancelRequestJoinTeam(this.props.userData.shortInfor.UID, this.props.searchReducer.teamSelect.ID);
    }

    askPermissionsAsync = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
    };

    _onPressEditAvatar = async (oldUrl) => {
        if(Platform.OS === "ios"){
            await this.askPermissionsAsync();
        }
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: false,
            aspect: [1, 1],
        });

        if (!result.cancelled) {
            this.props.actions.editAvatarProfile(false, oldUrl, result.uri, this.props.userData.shortInfor.UID);
        }
    };

    renderContactHeader = (team) => {

        // đã request join team thì isJoinTeam = true, request chưa được approve thì isCancelRequestJoin = true
        var isJoinTeam = Object.keys(this.props.userData.teams).indexOf(this.props.searchReducer.teamSelect.ID) > -1;
        var isCancelRequestJoin = false;
        var isAdmin = false; // nếu là admin thì phải disable button 'leave team' đi
        if (isJoinTeam) {
            if (this.props.userData.teams[this.props.searchReducer.teamSelect.ID] === 'waitting') {
                isCancelRequestJoin = true;
            }
            if (this.props.userData.teams[this.props.searchReducer.teamSelect.ID] === 'admin') {
                isAdmin = true;
            }
        }

        var countMember = 1
        if (this.props.isFromSearch || this.props.isFromCreateNewTeam) {
            if (team.member.member !== undefined) {
                countMember = Object.keys(team.member.admin).length + Object.keys(team.member.member).length;
            }
        } else {
            if (team.member !== undefined) {
                countMember = Object.keys(team.admin).length + Object.keys(team.member).length;
            }
        }

        return (
            <View style={{ flexDirection: 'column', }}>
                <View style={styles.coverContainer}>
                    <View style={styles.profileImage}>
                        <Image
                            source={{ uri: team.avatar }}
                            style={styles.profileImage}
                        />
                        {this.props.isFromSearch || team.rule !== 'admin' ?
                            <View />
                            :
                            <TouchableOpacity onPress={this._onPressEditAvatar.bind(this, team.avatar)} style={styles.bottomView} >
                                <TextIcon icon='camera' text='Chỉnh sửa' />
                            </TouchableOpacity>
                        }
                    </View>

                    <View style={styles.coverTitle}>
                        <Text style={styles.coverName}>{team.name}</Text>
                        <TextIcon icon="account-multiple" text={countMember + ' thành viên'} />
                        <TextIcon text={team.phoneNumber} icon='phone' />
                        <TextIcon text={team.address} icon='map-marker' />
                        <Text>Khung giờ: {team.khunggio}</Text>
                        <Text>Trình độ: {team.level}</Text>
                        <TextIcon text={team.description} icon="information-outline" />
                    </View>
                </View>
                {this.props.isFromSearch ?
                    <View style={{
                        marginLeft: '3%',
                        marginTop: 10,
                        marginBottom: 10,
                    }}>
                        {isJoinTeam ?
                            <View>
                                {isCancelRequestJoin ?
                                    <TouchableHighlight
                                        style={styles.facebookButton}
                                        name="Facebook"
                                        underlayColor={styles.facebookButton.backgroundColor}
                                        onPress={() => this.handleCancelRequest()}
                                    >

                                        <Text style={styles.facebookButtonText}>Cancel Request</Text>
                                    </TouchableHighlight>
                                    :
                                    <TouchableHighlight
                                        style={styles.facebookButton}
                                        name="Facebook"
                                        underlayColor={styles.facebookButton.backgroundColor}
                                        onPress={() => this.handleLeaveTeam(isAdmin)}
                                    >

                                        <Text style={styles.facebookButtonText}>Leave Team</Text>
                                    </TouchableHighlight>
                                }
                            </View>
                            :
                            <TouchableHighlight
                                style={styles.facebookButton}
                                name="Facebook"
                                underlayColor={styles.facebookButton.backgroundColor}
                                onPress={() => this.handleJoinTeam()}
                            >
                                <Text style={styles.facebookButtonText}>Join Team</Text>
                            </TouchableHighlight>
                        }
                    </View>
                    :
                    <View></View>
                }
            </View>
        )
    }

    onPressBack() {
        if (this.props.isFromCreateNewTeam) {
            Actions.loginScreen({ type: "reset" });
        } else {
            Actions.pop();
        }
    }

    _editImage = async (oldUrl, index) => {
        if(Platform.OS === "ios"){
            await this.askPermissionsAsync();
        }
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: false,
            aspect: [1, 1],
        });

        if (!result.cancelled) {
            this.props.actions.addImageTeamProfile(oldUrl, result.uri, this.props.teamReducer.ID, index);
        }
    };

    _uploadImage = async (oldUrl, index) => {
        if(Platform.OS === "ios"){
            await this.askPermissionsAsync();
        }
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: false,
            aspect: [1, 1],
        });

        if (!result.cancelled) {
            this.props.actions.addImageTeamProfile(oldUrl, result.uri, this.props.teamReducer.ID, index);
        }
    };

    render() {
        if (this.props.condition.isLoading) {
            return <LoadingScreen />;
        }

        var team = {};
        var images = [];
        if (this.props.isFromSearch) {
            team = this.props.searchReducer.teamSelect;
            if (team.images !== undefined) {
                images = team.images.slice(0);
            }
        } else if (this.props.isFromCreateNewTeam) {
            team = this.props.newTeamReducer.teamInfor;
            this.props.isFromSearch = false;
            if (typeof team.images === 'undefined') {
                images.push('');
            } else if (team.images.length < 3) {
                images = team.images.slice(0);
                images.push('');
            } else {
                images = team.images.slice(0);
            }
        } else {
            team = this.props.teamReducer;
            this.props.isFromSearch = false;
            if (typeof team.images === 'undefined') {
                images.push('');
            } else if (team.images.length < 3) {
                images = team.images.slice(0);
                images.push('');
            } else {
                images = team.images.slice(0);
            }
        }

        return (

            <View style={styles.container}>

                <HeaderBack headerName="Thông tin đội bóng"
                    backPress={this.onPressBack.bind(this)}
                    renderRight={(!this.props.isFromSearch && team.rule === 'admin') ?
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => Actions.editUserProfileScreen({isEditTeamProfile: true})}
                        >
                            <Icon name="account-edit"
                                size={40}
                                color='black'
                            />
                        </TouchableOpacity>
                        :
                        <View />
                    }
                />

                <ScrollView style={{ flex: 1 }}>
                    <View style={styles.card}>
                        {this.renderContactHeader(team)}
                    </View>

                    <Card
                        title='Ảnh về đội bóng'
                        child={
                            <ImageSlider
                                imageData={images}
                                _onPressEdit={this._editImage}
                                _onUploadImage={this._uploadImage}
                                isShowButtonEdit={!this.props.isFromSearch && team.rule === 'admin'}
                            />
                        }
                    />
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D3D3D3',
    },
    coverContainer: {
        marginTop: 10,
        marginHorizontal: 10,
        flexDirection: 'row',
    },
    coverName: {
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold',
    },
    coverTitle: {
        alignItems: 'flex-start',
        marginLeft: 10
    },
    profileImage: {
        height: 110,
        width: 110,
    },
    card: {
        backgroundColor: '#ffffff',
        marginBottom: 10
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    slide: {
        width: 640,
        height: 240,
    },

    facebookButton: {
        width: '44%',
        height: 30,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3B5998'
    },
    facebookButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },

    bottomView: {
        width: 110,
        height: 20,
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        right: 0
    },
});

function mapStateToProps(state) {
    return {
        userData: state.userData,
        teamReducer: state.teamReducer,
        newTeamReducer: state.newTeamReducer,
        searchReducer: state.searchReducer,
        condition: state.condition
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(todoActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamProfile);