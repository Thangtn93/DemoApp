import React, { Component } from 'react';
// import ImageSlider from 'react-native-image-slider';
import ImageSlider from '../components/ImageSlider';
import { StyleSheet, View, Text, Button, TouchableOpacity, TextInput, Picker, Alert, Image, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import * as todoActions from '../actions/todoActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SlidesShow from '../components/Slideshow/Slideshow';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import ListComment from '../components/Pitch/ListComment';
import style from '../components/ModalPicker/style';
import HeaderBack from '../components/HeaderBack';
import LoadingScreen from './util/LoadingScreen';
import StarRating from '../components/StarRating/star-rating';

const behavior = (Platform.OS === 'ios') ? 'position' : 'padding';

class BookDetail extends Component {

    _renderItem({ item, index }) {
        return (
            <View style={styles.slide}>
                <Image
                    source={{ uri: item }}
                    style={styles.slide}
                />
            </View>
        );
    }

    componentDidMount() {
        // this.props.actions.changeCondition({ isLoading: true });
    }

    render() {
        var pitchInfo = this.props.pitchReducer.searchResult.filter((item) => {
            if(item.pitchID === this.props.pitchID){
                return item;
            }
        })[0];

        if (this.props.condition.isLoading) {
            return <LoadingScreen />;
        }

        var urlPrice = pitchInfo.price;

        return (
            <View style={{
                flex: 1
            }}>
                <HeaderBack headerName="Chi tiết sân bóng" />
                <ScrollView style={styles.container}>
                    <KeyboardAvoidingView behavior={behavior} >
                        <View style={styles.card}>
                            <Carousel
                                data={pitchInfo.images}
                                renderItem={this._renderItem}
                                hasParallaxImages={true}
                                sliderWidth={640}
                                itemWidth={640}
                            />

                            <View>
                                <Text style={styles.title}>{pitchInfo.name}</Text>
                                <StarRating ratingObj={pitchInfo.rating} />
                                <Text>{pitchInfo.address}</Text>
                                <Text>{pitchInfo.phoneNumber}</Text>
                            </View>
                        </View>

                        <View style={styles.card}>
                            <Text style={styles.title}>
                                Mô tả
                            </Text>
                            <Text>
                                {pitchInfo.desciption}
                            </Text>
                        </View>

                        <View style={styles.card}>
                            <Text style={styles.title}>
                                Bảng giá
                            </Text>
                            <Image
                                source={{ uri: urlPrice }}
                                style={styles.slide}
                            />
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D3D3D3',
    },
    slide: {
        width: 640,
        height: 240,
    },
    card: {
        // width: 640,
        backgroundColor: '#ffffff',
        marginBottom: 10
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    }
});

function mapStateToProps(state) {
    return {
        pitchReducer: state.pitchReducer,
        condition: state.condition,
        userData: state.userData,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(todoActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BookDetail);
