import React, {Component} from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';

export default class SavingsStatistics extends Component {
    static navigationOptions = {
        drawerLabel: 'Ahorro y pagos',
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
                <Text>SavingsStatistics</Text>
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
    },icon:{
        height: 20,
        width: 20,
    },
});

