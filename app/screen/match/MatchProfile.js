import React, { Component } from "react";
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import Carousel from 'react-native-snap-carousel';
import HeaderBack from '../../components/HeaderBack';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as todoActions from '../../actions/todoActions';
import Card from '../../components/Card';
import LoadingScreen from '../util/LoadingScreen';
import Util from '../../share/Util';

class MatchProfile extends React.Component {

    renderContactHeader = () => {

        var countMember = 1;
        if(this.props.pitchReducer.team2.member.member !== undefined){
            countMember = Object.keys(this.props.pitchReducer.team2.member.admin).length + Object.keys(this.props.pitchReducer.team2.member.member).length;
        }

        return (
            <View style={styles.coverContainer}>
                <Image
                    source={{
                        uri: this.props.pitchReducer.team2.avatar,
                    }}
                    style={styles.profileImage}
                />

                <View style={styles.coverTitle}>
                    <Text style={styles.coverName}>{this.props.pitchReducer.team2.name}</Text>
                    <Text style={styles.coverName}>{countMember + ' thành viên'}</Text>
                    <Text style={styles.coverName}>{this.props.pitchReducer.team2.address}</Text>

                </View>
            </View>
        )
    }

    _renderItem({ item, index }) {
        return (
            <View style={styles.slide}>
                <Image
                    source={{ uri: item.url }}
                    style={styles.slide}
                />
            </View>
        );
    }

    requestMatch() {
        this.props.actions.requestMatch(this.props.pitchReducer.matchProfile, this.props.teamReducer);
    }

    render() {
        if (this.props.condition.isLoading) {
            return <LoadingScreen />;
        }

        return (
            <View style={{ flex: 1 }}>
                <HeaderBack headerName="Chi tiết trận đấu" />
                <ScrollView style={styles.container}>
                    <Card
                        title='Thông tin đội bạn'
                        child={this.renderContactHeader()}
                    />

                    <Card
                        title='Ảnh về đội bóng'
                        child={
                            <Carousel
                                data={
                                    [
                                        { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Old_Trafford_02.JPG/640px-Old_Trafford_02.JPG' },
                                        { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Semi_final_football_mens_at_old_trafford.jpeg/640px-Semi_final_football_mens_at_old_trafford.jpeg' },
                                        { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Sir_Alex_Ferguson_Stand.jpg/640px-Sir_Alex_Ferguson_Stand.jpg' },
                                        { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/The_Stretford_End%2C_Old_Trafford_Stadium_-_geograph.org.uk_-_2433352.jpg/640px-The_Stretford_End%2C_Old_Trafford_Stadium_-_geograph.org.uk_-_2433352.jpg' }
                                    ]}
                                renderItem={this._renderItem}
                                hasParallaxImages={true}
                                sliderWidth={640}
                                itemWidth={640}
                            />
                        }
                    />

                    <Card
                        title='Mô tả về đội bóng'
                        child={
                            <Text>
                                {this.props.teamReducer.description}
                            </Text>
                        }
                    />

                    <Card
                        title='Thông tin về trận đấu'
                        child={
                            <View>
                                <Text>
                                    {'Địa điểm: ' + this.props.pitchReducer.matchProfile.address}
                                </Text>
                                <Text>
                                    {'Thời gian: ' + Util.mapToTime(this.props.pitchReducer.matchProfile.time) + ' ngày ' + this.props.pitchReducer.matchProfile.date}
                                </Text>
                                <Text>
                                    {'Số người: ' + this.props.pitchReducer.matchProfile.teamSize}
                                </Text>
                                <Text>
                                    {'Yêu cầu khác: ' + this.props.pitchReducer.matchProfile.moreRequest}
                                </Text>
                            </View>
                        }
                    />
                </ScrollView>
                <TouchableOpacity onPress={this.requestMatch.bind(this)} style={styles.bottomView} >
                    <Text style={styles.textStyle}>Hẹn đội</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D3D3D3',
        marginBottom: 40,
    },
    coverContainer: {
        justifyContent: 'flex-start',
        height: 110,
        flexDirection: 'row',
    },
    coverName: {
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold',
    },
    coverTitle: {
        paddingLeft: 10,
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

    bottomView: {
        width: '100%',
        height: 40,
        backgroundColor: '#00aced',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0
    },
    textStyle: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
    }
});

function mapStateToProps(state) {
    return {
        teamReducer: state.teamReducer,
        pitchReducer: state.pitchReducer,
        condition: state.condition
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(todoActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MatchProfile);