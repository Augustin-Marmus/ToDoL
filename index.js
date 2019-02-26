/** @format */

import { AppRegistry } from 'react-native';
import firebase from 'react-native-firebase';
import App from './src';
import { name as appName } from './app.json';

firebase.firestore().enablePersistence(true);
AppRegistry.registerComponent(appName, () => App);
