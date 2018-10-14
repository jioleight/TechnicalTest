import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  KeyboardAvoidingView, 
  AsyncStorage, 
  TouchableOpacity 
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Constants } from 'expo';
import { CheckBox } from 'react-native-elements';

export default class LoginComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      checked: false,
      emailERR: '',
      passERR: '',
      defEmail: 'jiofreed01@gmail.com',
      defPass: '123456',
    }
  }

  componentDidMount() {
    this._loadInitialState().done();
  }

  _loadInitialState = async () => {
    var value = await AsyncStorage.getItem('user');
    if (value !== null) {
      this.props.navigation('Profile');
    }
  }

  login = () => {
    if (this.state.email === '') {
      this.setState((state) => ({
        emailERR: 'Input email address',
      }));
    } else {
      this.setState((state) => ({
        emailERR: '',
      }));
    }
    if (this.state.password === '') {
      this.setState((state) => ({
        passERR: 'Input password',
      }));
    } else {
      this.setState((state) => ({
        passERR: '',
      }));
    }
  }

  press = () => {
    this.setState((state) => ({
      checked: !state.checked,
    }));
    this.setState((state) => ({

    }));
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View>
          <Image source={require('../assets/Logo.png')} style={{maxWidth: '100%', maxHeight: '100%', margin: 100}}/>
        </View>
        <View style={styles.textInputContainer}>
          <Text style={styles.textLabel}>Email</Text>
          <TextInput placeholder='Input email address' 
            onChangeText = { (email) => this.setState({email})}
            keyboardType='email-address' 
            returnKeyType='next'
            underlineColorAndroid='transparent'
            onSubmitEditing={() => this.passwordInput.focus()}
            autoCapitalize='none'
            autoCorrect={false}
            style={styles.textInput}
          />
          <Text style={styles.textErr}>{this.state.emailERR}</Text>

          <Text style={styles.textLabel}>Password</Text>
          <TextInput placeholder='Input password' 
            onChangeText = { (password) => this.setState({password})}
            autoCapitalize='none'
            autoCorrect={false}
            underlineColorAndroid='transparent'
            secureTextEntry={true}
            returnKeyType='go'
            ref={(input) => this.passwordInput = input}
            style={styles.textInput}  
          />
          <Text style={styles.textErr}>{this.state.passERR}</Text>
          <CheckBox
            title='Remember Email & Password'
            onPress={this.press}
            checked={this.state.checked}
          />
          <TouchableOpacity
            style = {styles.button}
            onPress = {this.login}>
              <Text style={{color:'#fff', height: 40, padding: 10, fontWeight:'bold', fontSize: 14}}>Sign In</Text>  
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  textErr: {
    marginBottom:20,
    color: 'red',
    fontSize: 12
  },
  textLabel: {
    color: 'black',
    fontSize:20,
    fontWeight:'bold'
  },
  textInput: {
    height: 40,
    padding: 10, 
    borderColor: '#714db2', 
    borderWidth: 1,
  },
  textInputContainer: {
    width: 300,
    marginBottom: 40
  },
  button: {
    backgroundColor: '#714db2',
    alignItems:'center',
  }
});