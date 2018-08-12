import React, { Component } from 'react';

import {
    View,
    Text,

} from 'react-native';

class Quote extends Component {
    render() {
        return (
            <View>
                <Text>{this.props.QuoteText}</Text>
                <Text>-{this.props.QuoteAuthor}</Text>
            </View>

        );
    }
}

export default Quote;