import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import * as firebase from 'firebase'
import 'firebase/auth'
import {
    IntroScreen,
    LoginOrRegister,
    Register,
    LoginScreen,
    VehicleTypeRegister,
    VehicleFuelRegister,
    VehicleAmbientalTypeRegister,
    PhoneRegister,
    PhoneValidator
} from "../screens";
import HamburgerNav from './HamburgerNav'
import LoadingScreen from '../screens/LoadingScreen'
var firebaseConfig = {
    apiKey: "AIzaSyAUdoZ7lzqFNQaOISS-IeGfqGHAjnI4W04",
    authDomain: "parquick-bc93d.firebaseapp.com",
    databaseURL: "https://parquick-bc93d.firebaseio.com",
    projectId: "parquick-bc93d",
    storageBucket: "parquick-bc93d.appspot.com",
    messagingSenderId: "1040717030960",
    appId: "1:1040717030960:web:4f1b4a3c39450f26292ff5",
    measurementId: "G-SXDVXG6HZ4"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const skipIntro = false;
const AuthStack = createStackNavigator(
    {
        IntroScreen,
        LoginOrRegister,
        Register,
        LoginScreen,
        VehicleTypeRegister,
        VehicleFuelRegister,
        VehicleAmbientalTypeRegister,
        PhoneRegister,
        PhoneValidator
    },
    {
        //initialRouteName: skipIntro ? "LoginOrRegister" : "IntroScreen",
        initialRouteName: "PhoneRegister",
        headerMode: "none"
    }
);
const AppStack = createStackNavigator(
    {
        HamburgerNav

    }
);


export default createAppContainer(
    createSwitchNavigator({
        App: AppStack,
        Auth: AuthStack,
        Loading: LoadingScreen
    },
        {
            initialRouteName: "Loading"
        }
    ));