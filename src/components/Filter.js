import React from 'react';
import {TouchableOpacity, View, StyleSheet, Text} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

const filter = props => {
    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity
                onPress={() => props.onPress()}
                style={[styles.bubble, styles.button]}
            >
                <Ionicons name="md-switch" size={18}>
                    <Text style={styles.text}> Filtros </Text>
                </Ionicons>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    bubble: {
        backgroundColor: 'white',
        borderRadius: 20,
    }, buttonContainer: {
        flexDirection: 'row',
        width: 120,
    }, button: {
        flexDirection: 'row',
        padding: '10%',
        paddingTop: '0%',
        textAlign: 'justify',
        alignItems: 'center',
        marginRight: '25%',
    },
    text: {
        fontSize: 14,
    },
});

export default filter;