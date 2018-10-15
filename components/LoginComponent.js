import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  KeyboardAvoidingView, 
  AsyncStorage,
  Alert, 
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
      emailValue: '',
      passwordValue: '',
      dataValid: false,
      checked: false,
      emailValid: true,
      passwordValid: true,
      loginValid: false,
      emailERR: ' ',
      passERR: ' ',
    }
  }

  login = () => {
    if (this.state.checked) {
      this.saveInfo();
      this.checkInfo();
      this.setState({
        email: '',
        password: '',
        loginValid: true,
        checked: true,
      });
      Alert.alert(
        '',
        'Login Successful \n\nWelcome '+ this.state.email +'!',
      )
    } else {
      this.setState({
        email: '',
        password: '',
        loginValid: false,
        checked: false,
      });
      Alert.alert(
        '',
        'Login Successful \n\nWelcome '+ this.state.emailValue +'!',
      )
      this.textInput.clear();
      this.passwordInput.clear();
    }
    this.textInput.focus();
  }

  press = () => {
    this.setState((state) => ({
      checked: !state.checked,
    }));
    console.log(this.state.checked);
  }

  saveInfo = async () => {
    if (this.state.email !== '' && this.state.password !=='') {
      let data = {
        email: this.state.email,
        password: this.state.password
      }
      AsyncStorage.setItem('data', JSON.stringify(data));
    }
  }

  checkInfo = async () => {
    try{
      let data = await AsyncStorage.getItem('data');
      let parsedata = JSON.parse(data)
      if(parsedata !== null){
        this.setState ({
          emailValue: parsedata.email,
          passwordValue: parsedata.password,
          dataValid: true,
          loginValid: true,
        });
        console.log(this.state.emailValue);
      } else {
        this.setState ({
          dataValid: false,
        });
      }
    } catch (error) {
      console.warn(error);
    }
  }

  emailValidate(text, type) {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    this.setState ({
      dataValid: false,
    })
    if (type === 'email' && text !== '') {
      if (reg.test(text)) {
        this.setState ({
          email: text,
          emailERR: ' ',
          emailValid: true,
        });
        if (this.state.password === '') {
          this.setState ({loginValid: false});
        } else {
          this.setState ({loginValid: true});}
      } else {
          this.setState ({
            email: text,
            emailERR: 'Incorrect email format ',
            emailValid: false,
            loginValid: false
          });
      }
    } else {
      this.setState ({
        email: text,
        emailERR: ' ',
        emailValid: true,
      });
    }
  }

  passValidate(text, type) {
    this.setState ({
      dataValid: false,
    })
    if (type === 'password' && text !== '' ) {
      if (text.length < 6) {
        this.setState({
          password: text,
          passERR: 'Password length must be 6 - 12 characters',
          passwordValid: false,
          loginValid: false
        });
      } else {
        this.setState({
          password: text,
          passERR: ' ',
          passwordValid: true,
        });
        if (this.state.email === '') {
          this.setState({loginValid: false});
        } else {
          this.setState({loginValid: true});}
      }
    } else {
      this.setState({
        password: text,
        passERR: ' ',
        passwordValid: true,
      });
    } 
  }

  render() {
    return (
      <KeyboardAvoidingView style = {styles.container} behavior = "padding" enabled>
        <View>
          <Image source = {require('../assets/Logo.png')} style={{maxWidth: '100%', maxHeight: '100%', margin: 70}}/>
        </View>
        <View style = {styles.textInputContainer}>
          <Text style = {styles.textLabel}>Email</Text>
          <TextInput 
            placeholder = 'Input email address' 
            value = {!this.state.dataValid? this.state.email:this.state.emailValue}
            ref={input => {this.textInput = input}}
            onChangeText = { (text) => this.emailValidate(text, 'email') }
            keyboardType = 'email-address' 
            returnKeyType = 'next'
            underlineColorAndroid = 'transparent'
            onSubmitEditing = {() => this.passwordInput.focus()}
            autoCapitalize = 'none'
            autoCorrect = {false}
            style = {[styles.textInput, 
              !this.state.emailValid? styles.textInputError:null
            ]}
          />
          <Text style = {styles.textErr}>{this.state.emailERR}</Text>

          <Text style = {styles.textLabel}>Password</Text>
          <TextInput 
            placeholder='Input password' 
            value = {!this.state.dataValid? this.state.password:this.state.passwordValue}
            maxLength = {12}
            onChangeText = { (text) => this.passValidate(text, 'password')}
            autoCapitalize = 'none'
            autoCorrect = {false}
            underlineColorAndroid = 'transparent'
            secureTextEntry = {true}
            onSubmitEditing = {() => this.textInput.focus()}
            returnKeyType = 'go'
            ref = {(input) => this.passwordInput = input}
            style = {[
              styles.textInput,  
              !this.state.passwordValid? styles.textInputError:null
            ]}  
          />
          <Text style = {styles.textErr}>{this.state.passERR}</Text>
          <CheckBox 
            containerStyle = {styles.checkboxStyle}
            title='Remember Email & Password'
            onPress={this.press}
            checked={this.state.checked}
          />
          <TouchableOpacity
            disabled = {!this.state.loginValid? true:false}
            style = {[
              styles.button, 
              !this.state.loginValid? styles.buttonStyle:null
            ]}
            onPress = {this.login}>
              <Text style={styles.buttonText}>Sign In</Text>  
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
    marginBottom:10,
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
    borderRadius: 5
  },
  textInputError: {
    borderColor: 'red', 
    borderWidth: 1,
  },
  textInputContainer: {
    width: 300,
    marginBottom: 70
  },
  button: {
    backgroundColor: '#714db2',
    alignItems:'center',
    borderRadius: 5
  },
  buttonText: {
    color:'#fff', 
    height: 40, 
    padding: 10, 
    fontWeight:'bold', 
    fontSize: 14
  },
  buttonStyle: {
    opacity: 0.4
  },
  checkboxStyle: {
    backgroundColor: '#ffffff',
    borderWidth: 0,
    marginTop: -10,
    alignItems: 'center',
    height: 40
  }
});