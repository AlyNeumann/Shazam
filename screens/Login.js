import React from 'react';
import {
    View,
    Text,
    Button,
    Alert,
    Image
} from 'react-native';
import * as firebase from 'firebase';
import { FormLabel, FormInput } from 'react-native-elements';


firebase.initializeApp(
    {
        apiKey: "AIzaSyAVp7GFalrYCNqPqex0zTMTXguDXsmRghk",
        authDomain: "shazamfestapp.firebaseapp.com",
        databaseURL: "https://shazamfestapp.firebaseio.com",
        projectId: "shazamfestapp",
        storageBucket: "shazamfestapp.appspot.com",
        messagingSenderId: "332925247143"
    }
)


export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: '',
            loading: false,
            userInfo: null
        };
    }
    onLoginPress() {
        this.setState({ error: '', loading: true });
        const { email, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ error: '', loading: false });
            })
            .catch(() => {
                this.setState({ error: 'Authentication failed', loading: false });
            })
    }
    onSignUpPress() {
        this.setState({ error: '', loading: true });
        const { email, password } = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ error: '', loading: false });
            })
            .catch(() => {
                this.setState({ error: 'Authentication failed', loading: false })
            })
    }
    renderButtonOrLoading = () => {
        if (this.state.loading) {
            return <Text> Loading... </Text>
        }
        return <View>
            <Button
                onPress={this.onLoginPress.bind(this)} title="Login" />
            <Button
                onPress={this.onSignUpPress.bind(this)} title="Sign Up" />
        </View>
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
    onChangeEmail = (email) => {
        return this.setState({ email })
    }
    onChangePassword = (password) => {
        return this.setState({ password })
    }
    render() {
        return (
            <View>
                <FormLabel> Email </FormLabel>
                <FormInput 
                value={this.state.email} 
                onChangeText={this.onChangeEmail} />
                <FormLabel> PassWord </FormLabel>
                <FormInput 
                value={this.state.password} 
                secureTextEntry
                placeholder="********"
                onChangeText={this.onChangePassword} />
                <Text>{this.state.error}</Text>
                {this.renderButtonOrLoading()}
                {!this.state.userInfo ? (<Button onPress={this.logIn.bind(this)} title='Login with Facebook' />) : (this._renderUserInfo())}

            </View>
        );
    }
}