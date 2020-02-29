import React, {Component} from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';

export default class Statistics extends Component {
    static navigationOptions = {
        drawerLabel: 'Diario de ruta',
        drawerIcon: ({}) => (
            <Image
                source={require('../../assets/parkedLogo.png')}
                style={styles.icon}
            />
        ),
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>Statistics</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        alignItems: 'center',
        marginTop: 50,
        justifyContent: 'center',
    }, icon: {
        height: 20,
        width: 20,
    },
});

