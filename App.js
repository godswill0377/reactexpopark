import React, {
    useState,
    useEffect
} from 'react';
import * as Font from 'expo-font';
import {AppLoading} from "expo";
import {StyleSheet, Text, View} from 'react-native';
import {Theme} from "./src/core/Theme";
import App from "./src/navigation/Router";
import {Provider} from "react-native-paper";

export default class main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
        }

    }

    async componentDidMount() {
        await Font.loadAsync({
            'icons': require('./assets/fonts/icons.ttf'),
            'mont-bold': require('./assets/fonts/mont-bold.ttf'),
            'mont-boldItalic': require('./assets/fonts/mont-boldItalic.ttf'),
            'TT-Hoves-Demi-bold': require('./assets/fonts/TTHovesDemiBold.ttf'),
            'TT-Hoves-Regular': require('./assets/fonts/TTHovesRegular.ttf'),
            'FontAwesome': 'https://github.com/FortAwesome/Font-Awesome/raw/master/webfonts/fa-solid-900.ttf',
        });
        this.setState({isReady: true});
    }

    render() {
        if (!this.state.isReady) {
            return <AppLoading/>;
        }
        return <Provider theme={Theme}>
            <App/>
        </Provider>
    }
}
