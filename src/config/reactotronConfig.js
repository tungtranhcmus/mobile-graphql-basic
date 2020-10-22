/* eslint-disable no-unused-vars */
import Reactotron from 'reactotron-react-native';
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs();
Reactotron.configure({
  name: 'Starbucks',
  host: 'localhost',
});

Reactotron.useReactNative({
  asyncStorage: false, // there are more options to the async storage.
  networking: {
    // optionally, you can turn it off with false.
    ignoreUrls: /symbolicate/,
  },
  editor: false, // there are more options to editor
  errors: { veto: stackFrame => false }, // or turn it off with false
  overlay: false, // just turning off overlay
});

if (__DEV__) {
  Reactotron.connect();
  Reactotron.clear();
}

console.tron = Reactotron;