import React from 'react';
import { View, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import styles from './styles';

export default function Profile({ navigation }){
    const githubUsername = navigation.getParam('github_username');

    return (
        <WebView style={styles.webView} source={{ uri: `https://github.com/${githubUsername}`}} />
    )
}