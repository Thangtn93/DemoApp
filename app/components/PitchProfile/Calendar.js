import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { range } from 'lodash';

class Calendar extends Component {

    renderWeekDays() {
        let weekdays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
        return weekdays.map((day) => {
            return (
                <Text key={day} style={styles.calendar_weekdays_text}>{day.toUpperCase()}</Text>
            );
        });
    }

    renderWeeks() {
        let past_month_days = range(27, 31);
        let this_month_days = range(1, 30);

        let days = past_month_days.concat(past_month_days, this_month_days);
        let grouped_days = this.getWeeksArray(days);

        return grouped_days.map((week_days, index) => {
            return (
                <View key={index} style={styles.week_days}>
                    {this.renderDays(week_days)}
                </View>
            );
        });
    }

    getWeeksArray(days) {
        var weeks_r = [];
        var seven_days = [];
        var count = 0;
        days.forEach((day) => {
            count += 1;
            seven_days.push(day);
            if (count == 7) {
                weeks_r.push(seven_days)
                count = 0;
                seven_days = [];
            }
        });
        return weeks_r;
    }

    renderDays(week_days) {
        return week_days.map((day, index) => {
            return (
                <Button
                    label={day}
                    key={index}
                    onPress=""
                    title=""
                    styles={{ button: styles.day, label: styles.day_text }}
                    noDefaultStyles={true}
                />
            );
        });
    }

    render() {
        return (
            <View>
                <View style={styles.calendar_header}>
                    <View style={styles.calendar_header_item}>
                        <Button
                            noDefaultStyles={true}
                            onPress=""
                            title=""
                        >
                            <Icon name="chevron-left" size={18} color="#333" />
                        </Button>
                        <Text style={styles.calendar_header_text}>2013</Text>
                        <Button
                            noDefaultStyles={true}
                            onPress=""
                            title=""
                        >
                            <Icon name="chevron-right" size={18} color="#333" />
                        </Button>
                    </View>

                    <View style={styles.calendar_header_item}>
                        <Button
                            noDefaultStyles={true}
                            onPress=""
                            title=""
                        >
                            <Icon name="chevron-left" size={18} color="#333" />
                        </Button>
                        <Text style={styles.calendar_header_text}>November</Text>
                        <Button
                            noDefaultStyles={true}
                            onPress=""
                            title=""
                        >
                            <Icon name="chevron-right" size={18} color="#333" />
                        </Button>
                    </View>
                </View>

                <View style={styles.calendar_weekdays}>
                    {this.renderWeekDays()}
                </View>

                <View style={styles.calendar_days}>
                    {this.renderWeeks()}
                </View>

                {/* <ScrollView style={styles.container}>

                </ScrollView> */}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    calendar_header: {
        flexDirection: 'row'
    },
    calendar_header_item: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 20,
        paddingRight: 40,
        paddingLeft: 40
    },
    calendar_header_text: {
        fontWeight: 'bold',
        fontSize: 20
    },

    calendar_weekdays_text: {
        flex: 1,
        color: '#C0C0C0',
        textAlign: 'center'
    },

    week_days: {
        flexDirection: 'row'
    },
    day: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        padding: 17,
        margin: 2
    },
    day_text: {
        textAlign: 'center',
        color: '#A9A9A9',
        fontSize: 25
    }
});

export default Calendar;