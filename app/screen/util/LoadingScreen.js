import React, { Component } from 'react';
import { View, Image } from "react-native";
import spinner from '../../assets/loading.gif';

class LoadingScreen extends Component {
    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Image source={spinner} style={{
                    width: 24,
                    height: 24,
                }} />
            </View>
        );
    }
}

export default LoadingScreen;
