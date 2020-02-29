import React from 'react';
import {View, StyleSheet} from 'react-native';


import Filter from './Filter';
import Hamburger from './HamburgerButton';

const userMapInterface = props => {
    return (
        <View>
            <View style={styles.container}>
                <View style={styles.leftContainer}>
                    <Hamburger style={styles.hamburger}
                               onPress={() => props.onPress()}/>
                </View>
                <View style={styles.rightContainer}>
                    <Filter
                        onPress={props.onGetLocation}/>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        paddingLeft: '5%',
    },
    leftContainer: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
    },
    rightContainer: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        marginLeft: '65%',
        paddingRight: '10%',
    },
    hamburger: {
        flex: 1,
    },
    parkingView: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 40,
        position: 'relative', top: 550,
    }
});
export default userMapInterface;