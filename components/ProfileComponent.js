import React from 'react';
import FlashMessage from 'react-native-flash-message';
import { showMessage, hideMessage } from 'react-native-flash-message';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  KeyboardAvoidingView, 
  AsyncStorage, 
  TouchableOpacity 
} from 'react-native';

export default class ProfileComponent extends React.Component {

    componentDidMount() {
        showMessage({
            message: 'Login Successful!',
            type: 'success',
            position: 'center',
        })
    }
    render() {
        return (
            <KeyboardAvoidingView style={styles.container}>
                <View>
                    <Text>Welcome</Text>
                </View>
                <View>
                    <Text>sup</Text>
                </View>
                <View>
                    <Text>here</Text>
                </View>
                <FlashMessage
                    floating = { true } 
                    icon = 'auto' 
                    style = {{ alignItems: 'center'}}
                />
            </KeyboardAvoidingView>
        );
    }
}

class userProfile extends React.Component{

}

class adminProfile extends React.Component{
    
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    
});