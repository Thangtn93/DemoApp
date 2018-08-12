'use strict';

import React, { Component } from 'react';
import { Image, StyleSheet, Text, TouchableHighlight, ScrollView, View, Platform } from 'react-native';
import SearchBar from 'react-native-material-design-searchbar';
import fuzzy from 'fuzzy';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from "react-native-router-flux";

export default class extends React.Component {
    constructor() {
        super();

        // const stateData = { "AL": "Alabama", "AK": "Alaska", "AS": "American Samoa", "AZ": "Arizona", "AR": "Arkansas", "CA": "California", "CO": "Colorado", "CT": "Connecticut", "DE": "Delaware", "DC": "District Of Columbia", "FM": "Federated States Of Micronesia", "FL": "Florida", "GA": "Georgia", "GU": "Guam", "HI": "Hawaii", "ID": "Idaho", "IL": "Illinois", "IN": "Indiana", "IA": "Iowa", "KS": "Kansas", "KY": "Kentucky", "LA": "Louisiana", "ME": "Maine", "MH": "Marshall Islands", "MD": "Maryland", "MA": "Massachusetts", "MI": "Michigan", "MN": "Minnesota", "MS": "Mississippi", "MO": "Missouri", "MT": "Montana", "NE": "Nebraska", "NV": "Nevada", "NH": "New Hampshire", "NJ": "New Jersey", "NM": "New Mexico", "NY": "New York", "NC": "North Carolina", "ND": "North Dakota", "MP": "Northern Mariana Islands", "OH": "Ohio", "OK": "Oklahoma", "OR": "Oregon", "PW": "Palau", "PA": "Pennsylvania", "PR": "Puerto Rico", "RI": "Rhode Island", "SC": "South Carolina", "SD": "South Dakota", "TN": "Tennessee", "TX": "Texas", "UT": "Utah", "VT": "Vermont", "VI": "Virgin Islands", "VA": "Virginia", "WA": "Washington", "WV": "West Virginia", "WI": "Wisconsin", "WY": "Wyoming" }
        const stateData = {};
        this.states = [];
        for (let key in stateData) {
            if (stateData.hasOwnProperty(key)) {
                this.states.push(stateData[key]);
            }
        }

        this.state = {
            states: this.states,
            searchText: ''
        };
    }

    _onChangeText(text) {
        let results = fuzzy.filter(text, this.states)
        let matches = results.map(function (el) { return el.string; });
        this.setState({
            states: matches,
            searchText: text
        })
    }

    render() {
        const statesList = this.state.states.map(function (elem, index) {
            return <View key={index} style={styles.list}><Text style={styles.text}>{elem}</Text></View>;
        })

        return (
            <View>
                <View style={styles.header}>
                </View>
                <SearchBar
                    onSearchChange={(text) => this._onChangeText(text)}
                    height={40}
                    // onFocus={() => console.log('On Focus')}
                    // onBlur={() => console.log('On Blur')}
                    placeholder={'Search...'}
                    autoCorrect={false}
                    returnKeyType={'search'}
                    onSubmitEditing={() => {
                        console.log('search screen')
                        // console.log(searchText)
                        Actions.searchResultScreen({ searchText: this.state.searchText });
                    }}
                />

                {/* <SearchBar
                    round
                    searchIcon={{ size: 24 }}
                    platform="android"
                    cancelIcon={{ type: 'font-awesome', name: 'chevron-left' }}
                    placeholder='Search'
                    onChangeText={(text) => this._onChangeText(text)}
                /> */}
                <ScrollView style={styles.container} contentOffset={{ y: 50 }}>
                    {statesList}
                </ScrollView>
            </View>
        )
    }
}

// <SearchBar
// ref='searchBar'
// placeholder='Search'
// onChangeText={(text)=> this._onChangeText(text)}
// />

const styles = StyleSheet.create({
    header: {
        height: (Platform.OS === 'ios') ? 0 : Expo.Constants.statusBarHeight,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    container: {
        backgroundColor: "#ffffff",
    },
    list: {
        height: 40,
        paddingLeft: 20,
        justifyContent: "center",
        borderBottomColor: "#aaa",
        // borderBottomWidth: Util.pixel,
    },
    input: {
        // backgroundColor: 'rgba(255, 255, 255, 1)',
        // width: DEVICE_WIDTH - 40,
        height: 50,
        // marginHorizontal: 20,
        paddingLeft: 70,
        paddingTop: 13,
        // borderRadius: 10,
        // borderWidth: 1,
        // borderColor: '#000000',
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
        color: '#000000',
    },
    inputWrapper: {
        flex: 0,
        marginBottom: 10,
    },
    inlineImg: {
        position: 'absolute',
        zIndex: 99,
        left: 20,
        top: 9,
    },
});
