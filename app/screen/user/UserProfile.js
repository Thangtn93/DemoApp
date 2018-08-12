import React, { Component } from "react";
import { StyleSheet, View, Text, ScrollView, Image, TouchableHighlight, TouchableOpacity } from "react-native";
import Carousel from 'react-native-snap-carousel';
import { ImagePicker } from 'expo';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HeaderBack from '../../components/HeaderBack';
import TextIcon from '../../components/TextIcon/TextIcon';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from "react-native-router-flux";
import * as todoActions from '../../actions/todoActions';
import Card from '../../components/Card';

import { MARGIN_CARD } from '../../share/constant';
import Util from '../../share/Util';
import ImageSlider from "../../components/ImageSlider";

const WIDTH = Util.size.width;

class UserProfile extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillUnmount() {
        this.props.actions.clearSelectUser();
    }

    handleFollow() {
        this.props.actions.follow(this.props.userData.shortInfor.UID, this.props.searchReducer.userSelect.shortInfor.UID);
    }

    handleUnFollow() {
        this.props.actions.unfollow(this.props.userData.shortInfor.UID, this.props.searchReducer.userSelect.shortInfor.UID);
    }

    _onPressEditAvatar = async (oldUrl) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: false,
            aspect: [1, 1],
        });

        if (!result.cancelled) {
            this.props.actions.editAvatarProfile(true, oldUrl, result.uri, this.props.userData.shortInfor.UID);
        }
    };

    renderContactHeader = (userData) => {
        return (
            <View style={{ flexDirection: 'column', marginLeft: 10, marginRight: 10 }}>
                <View style={styles.coverContainer}>
                    <View style={styles.profileImage}>
                        <Image
                            source={{ uri: userData.shortInfor.avatar }}
                            style={styles.profileImage}
                        />
                        {this.props.isFromSearch ?
                            <View />
                            :
                            <TouchableOpacity onPress={this._onPressEditAvatar.bind(this, userData.shortInfor.avatar)} style={styles.bottomView} >
                                <TextIcon icon='camera' text='Chỉnh sửa' />
                            </TouchableOpacity>
                        }
                    </View>

                    <View style={styles.coverTitle}>
                        <Text style={styles.coverName}>{userData.shortInfor.fullName}</Text>
                        <TextIcon text={userData.shortInfor.phoneNumber} icon='phone' />
                        <TextIcon text={userData.shortInfor.address} icon='map-marker' />
                        <Text>Vị trí sở trường: {userData.shortInfor.vitrisotruong}</Text>
                        <Text>Trình độ: {userData.shortInfor.level}</Text>
                        <TextIcon text={userData.shortInfor.description} icon="information-outline" />
                    </View>
                </View>
                {this.props.isFromSearch ?
                    <View style={{
                        marginLeft: '3%',
                        marginTop: 10,
                        marginBottom: 10,
                    }}>
                        {(this.props.userData.following.indexOf(this.props.searchReducer.userSelect.shortInfor.UID) > -1) ?
                            <TouchableHighlight
                                style={styles.facebookButton}
                                name="Facebook"
                                underlayColor={styles.facebookButton.backgroundColor}
                                onPress={() => this.handleUnFollow()}
                            >

                                <Text style={styles.facebookButtonText}>Unfollow</Text>
                            </TouchableHighlight>
                            :
                            <TouchableHighlight
                                style={styles.facebookButton}
                                name="Facebook"
                                underlayColor={styles.facebookButton.backgroundColor}
                                onPress={() => this.handleFollow()}
                            >
                                <Text style={styles.facebookButtonText}>Follow</Text>
                            </TouchableHighlight>
                        }
                    </View>
                    :
                    <View></View>
                }
            </View>
        )
    }

    _editImage = async (oldUrl, index) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: false,
            aspect: [1, 1],
        });

        if (!result.cancelled) {
            this.props.actions.addImageProfile(oldUrl, result.uri, this.props.userData.shortInfor.UID, index);
        }
    };

    _uploadImage = async (oldUrl, index) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: false,
            aspect: [1, 1],
        });

        if (!result.cancelled) {
            this.props.actions.addImageProfile(oldUrl, result.uri, this.props.userData.shortInfor.UID, index);
        }
    };

    render() {
        var user = {};
        var images = [];
        if (this.props.isFromSearch) {
            user = this.props.searchReducer.userSelect;
            if (user.shortInfor.images !== undefined) {
                images = user.shortInfor.images.slice(0);
            }
        } else {
            user = this.props.userData;
            this.props.isFromSearch = false;
            if (typeof user.shortInfor.images === 'undefined') {
                images.push('');
            } else if (user.shortInfor.images.length < 3) {
                images = user.shortInfor.images.slice(0);
                images.push('');
            } else {
                images = user.shortInfor.images.slice(0);
            }
        }

        return (
            <View style={styles.container}>
                <HeaderBack headerName="Thông tin người dùng"
                    renderRight={!this.props.isFromSearch ?
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => Actions.editUserProfileScreen({ isEditUserProfile: true })}
                        >
                            <Icon name="account-edit"
                                size={40}
                                color='black'
                            />
                        </TouchableOpacity>
                        :
                        <View />
                    } />
                <ScrollView style={{ flex: 1 }}>
                    <View style={styles.card}>
                        {this.renderContactHeader(user)}
                    </View>
                    <Card
                        title='Ảnh của bạn'
                        child={
                            <ImageSlider
                                imageData={images}
                                _onPressEdit={this._editImage}
                                _onUploadImage={this._uploadImage}
                                isShowButtonEdit={!this.props.isFromSearch}
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
        width: WIDTH - 2 * MARGIN_CARD,
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
        searchReducer: state.searchReducer,
        condition: state.condition
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(todoActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);