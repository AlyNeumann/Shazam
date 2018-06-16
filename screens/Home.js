import React from 'react';
import {
    View,
    Text,
    Button,
    Alert
} from 'react-native';


export default class HomeScreen extends React.Component {
    async logIn() {
        const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('463689234063252', {
            permissions: ['public_profile'],
          });
        if (type === 'success') {
          // Get the user's name using Facebook's Graph API
          const response = await fetch(
            `https://graph.facebook.com/me?access_token=${token}`);
          Alert.alert(
            'Logged in!',
            `Hi ${(await response.json()).name}!`,
          );
        }
      }
    render() {
        return (
            <View>
                <Text>ShazamFest</Text>
                {/* <Image source={require('./images/logo.png')} /> */}
                <Button onPress={this.logIn.bind(this)} title='Login with Facebook'/>
            </View>
        );
    }
}



 