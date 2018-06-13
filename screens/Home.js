import React from 'react';
import {
    View,
    Text,
    Image
} from 'react-native';

export default class HomeScreen extends React.Component {
    render() {
        return (
            <View>
                <Text>ShazamFest</Text>
                <Image source={require('./images/logo.png')} />
            </View>
        );
    }
}