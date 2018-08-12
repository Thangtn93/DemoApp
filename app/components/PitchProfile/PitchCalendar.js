import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/MaterialIcons';

// import EventCalendar from 'react-native-events-calendar';
import EventCalendar from '../Calendar/EventCalendar';

let { width } = Dimensions.get('window');

const PitchCalendar = props => {
    state = {
        events: [
            { start: '2018-04-29 00:30:00', end: '2018-04-29 01:30:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
            { start: '2018-04-29 01:30:00', end: '2018-04-29 02:20:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
            { start: '2018-04-29 04:10:00', end: '2018-04-29 04:40:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
            { start: '2018-04-29 01:05:00', end: '2018-04-29 01:45:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
            { start: '2018-04-29 14:30:00', end: '2018-04-29 16:30:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
            { start: '2018-04-30 01:20:00', end: '2018-04-30 02:20:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
            { start: '2018-04-30 04:10:00', end: '2018-04-30 04:40:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
            { start: '2018-04-30 00:45:00', end: '2018-04-30 01:45:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
            { start: '2018-04-30 11:30:00', end: '2018-04-30 12:30:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
            { start: '2018-05-01 01:30:00', end: '2018-05-01 02:00:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
            { start: '2018-05-01 03:10:00', end: '2018-05-01 03:40:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
            { start: '2018-05-01 00:10:00', end: '2018-05-01 01:45:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' }
        ]
    };

    _eventTapped = (event) => {
        alert(JSON.stringify(event));
    };

    _getEventsForIndex = (data, index) => {
        return this.state.events[Math.abs(index % this.state.events.length)];
    };

    return (
        
            <EventCalendar
                eventTapped={this._eventTapped}
                events={this.state.events}
                getItem={this._getEventsForIndex}
                width={width}
            />
            
        
    );
}

const styles = StyleSheet.create({
    actionButtonIcon: {
      fontSize: 20,
      height: 22,
      color: 'white',
    },
  });

export default PitchCalendar;
