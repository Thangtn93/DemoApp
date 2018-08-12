import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import { ImagePicker } from 'expo';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TextIcon from '../components/TextIcon/TextIcon';

import { MARGIN_CARD } from '../share/constant';
import Util from '../share/Util';
const WIDTH = Util.size.width;

const ImageSlider = props => {
  const {
    imageData,
    _onPressEdit,
    _onUploadImage,
    isShowButtonEdit
  } = props;

  return (
    <Carousel
      data={imageData}
      renderItem={({ item, index }) => {
        return (
          <View style={{ flex: 1 }}>
            {(item !== '') ?
              <View style={styles.slide}>
                <Image
                  source={{ uri: item }}
                  style={styles.slide}
                />
                {isShowButtonEdit ?
                  <TouchableOpacity onPress={_onPressEdit.bind(this, item, index)} style={styles.bottomView} >
                    <TextIcon icon='camera' text='Chỉnh sửa' />
                  </TouchableOpacity>
                  :
                  <View />}
              </View>
              :
              <View style={{ flex: 1 }}>
                {isShowButtonEdit ?
                  <TouchableOpacity onPress={_onUploadImage.bind(this, item, index)} style={styles.slideWrap} >
                    <Icon size={24} name='plus' />
                  </TouchableOpacity>
                  :
                  <View />}
              </View>
            }
          </View>
        );
      }}
      hasParallaxImages={true}
      sliderWidth={WIDTH - 2 * MARGIN_CARD}
      itemWidth={WIDTH - 2 * MARGIN_CARD}
    />
  );
}

const styles = StyleSheet.create({
  slideWrap: {
    justifyContent: 'center',
    backgroundColor: '#999',
    alignItems: 'center',
    height: 240,
  },
  slide: {
    width: WIDTH - 2 * MARGIN_CARD,
    height: 240,
  },
  bottomView: {
    width: 100,
    height: 20,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0
  },
});

export default ImageSlider;