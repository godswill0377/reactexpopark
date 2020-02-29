import React from 'react';
import {Image, View} from 'react-native'
import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {DrawerItems} from 'react-navigation-drawer'

import SavingsStatistics from '../screens/SavingsStatistics';
import MapWithInterface from "../screens/MapWithInterface";
import Statistics from '../screens/Statistics';

import {Theme} from "../core/Theme";

const DrawerContent = (props) => (
    <View>
        <View
            style={{
                backgroundColor: Theme.colors.white,
                padding: 50,
                height: 50,
            }}
        >
            <Image style={{
                width: 75,
                height: 20,
                resizeMode: 'stretch',
            }} source={require('../../assets/parquick-logo-skyBlue.png')}/>
        </View>
        <DrawerItems {...props} />
    </View>
);

const HamburgerNav = createDrawerNavigator({
    MapWithInterface: {
        screen: MapWithInterface
    },
    savingsStatistics: {
        screen: SavingsStatistics
    },
    Route: {
        screen: Statistics
    }
}, {
    drawerPosition: "left",
    contentOptions: {
        inactiveTintColor: Theme.colors.primary,
        activeTintColor: Theme.colors.secondary,
    },
    contentComponent: DrawerContent,
});
const MainNavigation = createAppContainer(HamburgerNav);
export default MainNavigation;