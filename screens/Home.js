import React from 'react';
import {
    View,
    Text
} from 'react-native';
import LoginScreen from './Login'


export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
    
    }
  
    render() {
        return (
            <View>
                <Text>ShazamFest</Text>
                {/* <Image source={require('./images/logo.png')} /> */}
                <LoginScreen/>
            </View>
        );
    }
}



