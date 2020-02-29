import React from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

const hamburger = props => {
    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity
                onPress={() => props.onPress()}
                style={[styles.bubble, styles.button]}
            >
                <Ionicons name="ios-menu" size={15} style={{alignItems: 'center'}}/>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    bubble: {
        backgroundColor: '#ffff',
        height: 40,
        width: 40,
        borderRadius: 80,
    }, buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    }, button: {
        flexDirection: 'row',
        padding: '5%',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default hamburger;