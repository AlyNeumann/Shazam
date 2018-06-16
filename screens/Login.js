import React from 'react';
import {
    View,
    Text,
    Button,
    Alert,
    Image
} from 'react-native';



export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { userInfo: null };
    }
    async logIn() {
        const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('463689234063252', {
            permissions: ['public_profile'],
        });
        if (type === 'success') {
            // Get the user's name using Facebook's Graph API
            const response = await fetch(
                `https://graph.facebook.com/me?access_token=${token}&fields=id,name,picture.type(large)`);
            const userInfo = await response.json();
            this.setState({ userInfo: userInfo });
            Alert.alert(
                'Logged in!',
                `Hi ${(await response.json()).name}!`,
            );
        }
    }
    _renderUserInfo = () => {
        return (
            <View style={{ alignItems: 'center' }}>
                <Image
                    source={{ uri: this.state.userInfo.picture.data.url }}
                    style={{ width: 100, height: 100, borderRadius: 50 }}
                />
                <Text style={{ fontSize: 20 }}>{this.state.userInfo.name}</Text>
                <Text>ID: {this.state.userInfo.id}</Text>
            </View>
        )
    }
    render() {
        return (
            <View>
                <Text>ShazamFest</Text>
                {/* <Button onPress={this.logIn.bind(this)} title='Login with Facebook' /> */}
                {/* <Image source={require('./images/logo.png')} /> */}
                {!this.state.userInfo ? (<Button onPress={this.logIn.bind(this)} title='Login with Facebook' />): (this._renderUserInfo())}
                
            </View>
        );
    }
}