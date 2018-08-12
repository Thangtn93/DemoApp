import React from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    View,
    Image
} from 'react-native';
import TextIcon from './TextIcon/TextIcon';
import { MARGIN_CARD } from '../share/constant';
import Util from '../share/Util';
const WIDTH = Util.size.width;

const ImageEdit = (props) => {
    const {
        image,
        icon,
        text,
        isShowButtonEdit
    } = props;

    return (
        <View style={styles.slide}>
            <Image
                source={{ uri: image }}
                style={styles.slide}
            />
            {isShowButtonEdit ?
                <TouchableOpacity onPress={_onPressEdit.bind(this, image)} style={styles.bottomView} >
                    <TextIcon icon={icon} text={text} />
                </TouchableOpacity>
                :
                <View />}
        </View>
    )
}

const styles = StyleSheet.create({
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
})

export default ImageEdit;