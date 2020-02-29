import {
    AppRegistry,
    Platform
} from 'react-native';
import App from './App';
import {name as parkQuick} from './app.json';

AppRegistry.registerComponent(parkQuick, () => App);
if (Platform.OS === 'web') {
    AppRegistry.runApplication(parkQuick, {
        rootTag: document.getElementById('root'),

    });
}