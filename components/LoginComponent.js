import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  AsyncStorage,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { CheckBox, List, ListItem } from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { TextField } from 'react-native-material-textfield';

export default class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      emailERR: ' ',
      passERR: ' ',
      emailValue: '',
      passwordValue: '',
      dataValid: false,
      checked: false,
      emailValid: true,
      passwordValid: true,
      loginValid: false,
      displayIMG: true,
      keyboardOpen: false,
      loading: false,
      dataUsers: [],
    }
  }
  componentDidMount() {
    this.checkInfo();
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  _keyboardDidShow = () => {
    this.setState({ keyboardOpen: true, displayIMG: false });
  }

  _keyboardDidHide = () => {
    this.setState({ keyboardOpen: false, displayIMG: true });
  }
  // Validate Email Form //
  emailValidate(text, type) {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    this.setState({
      dataValid: false,
    })
    if (type === 'email' && text !== '') {
      if (reg.test(text)) {
        this.setState({
          email: text,
          emailERR: ' ',
          emailValid: true,
        });
        if (
          this.state.password === '' ||
          this.state.password.length === 0 ||
          !this.state.passwordValid
        ) {
          this.setState({ loginValid: false });
        } else {
          this.setState({ loginValid: true });
        }
      } else {
        this.setState({
          email: text,
          emailERR: 'Incorrect email format ',
          emailValid: false,
          loginValid: false
        });
      }
    } else {
      this.setState({
        email: text,
        emailERR: ' ',
        emailValid: true,
      });
    }
  }
  // Validate Password Length //
  passValidate(text, type) {
    this.setState({
      dataValid: false,
    })
    if (type === 'password' && text !== '') {
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
        if (
          this.state.email === '' &&
          this.state.password.length !== 0 ||
          !this.state.emailValid
        ) {
          this.setState({ loginValid: false });
        } else {
          this.setState({ loginValid: true });
        }
      }
    } else {
      this.setState({
        password: text,
        passERR: ' ',
        passwordValid: true,
      });
    }
  }
  // Remember Email and Password //
  press = () => {
    this.setState((state) => ({
      checked: !state.checked,
    }));
    console.log(this.state.checked);
  }
  // Login Function //
  login = () => {
    if (this.state.checked) {
      this.saveInfo();
      this.setState({
        email: '',
        password: '',
        loginValid: true,
        checked: true,
        dataValid: true,
      });
    } else {
      this.textInput.focus();
      this.setState({
        email: '',
        password: '',
        loginValid: false,
        checked: false,
        dataValid: false,
      });
      this.textInput.clear();
      this.passwordInput.clear();
    }
    this.props.navigation.navigate('Profile');
  }
  // Save Credentials //
  saveInfo = async () => {
    if (this.state.email !== '' && this.state.password !== '') {
      let data = {
        email: this.state.email,
        password: this.state.password
      }
      AsyncStorage.setItem('data', JSON.stringify(data));
    }
  }
  // Check Saved Credentials //
  checkInfo = async () => {
    try {
      let data = await AsyncStorage.getItem('data');
      let parsedata = JSON.parse(data)
      if (parsedata !== null) {
        this.setState({
          emailValue: parsedata.email,
          passwordValue: parsedata.password,
          dataValid: true,
          loginValid: true,
        });
        console.info('Check success!')
      } else {
        this.setState({
          dataValid: false,
        });
      }
    } catch (error) {
      console.warn(error);
    }
    this.forceUpdate();
  }
  // Start Here //
  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        enabled>
        <View style={styles.containerImg}>
          <Image 
            source = { require('../assets/Logo.png') } 
            style={ !this.state.displayIMG? styles.hideIMG:styles.showImg }
          />
        </View>
        <View style={styles.textInputContainer}>
          <TextField
            ref={input => { this.textInput = input }}
            value={!this.state.dataValid ? this.state.email : this.state.emailValue}
            keyboardType='email-address'
            autoCorrect={false}
            autoCapitalize='none'
            onSubmitEditing={() => this.passwordInput.focus()}
            onChangeText={
              (text) => this.emailValidate(text, 'email')
            }
            onFocus={() => this.setState({ displayIMG: true })}
            label='Email Address'
            returnKeyType='next'
            error={!this.state.emailValid ? this.state.emailERR : null}
          />

          <TextField
            ref={(input) => this.passwordInput = input}
            value={!this.state.dataValid ? this.state.password : this.state.passwordValue}
            autoCorrect={false}
            autoCapitalize='none'
            secureTextEntry={true}
            onChangeText={(text) => this.passValidate(text, 'password')}
            label='Password'
            returnKeyType='go'
            error={!this.state.passwordValid ? this.state.passERR : null}
          />
          <CheckBox
            containerStyle={styles.checkboxStyle}
            title='Remember Email & Password'
            onPress={this.press}
            iconType='material-community'
            checkedIcon='checkbox-marked'
            uncheckedIcon='checkbox-blank-outline'
            checked={this.state.checked}
          />
          <TouchableOpacity
            disabled={!this.state.loginValid ? true : false}
            style={[
              styles.button,
              !this.state.loginValid ? styles.buttonStyle : null
            ]}
            onPress={this.login}>
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
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: hp('100%'),
    width: wp('100%')
  },
  showImg: {
    resizeMode: 'contain',
    width: '70%',
    height: '70%',
    alignItems: 'center'
  },
  hideIMG: {
    resizeMode: 'contain',
    width: 0,
    height: 0,
  },
  containerImg: {
    width: wp('100%%'),
    height: hp('60%'),
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  textInputContainer: {
    width: wp('80%'),
    height: hp('40%'),
    backgroundColor: '#fff',
    marginBottom: hp('10%'),
    flex: 0,
    justifyContent: 'flex-end',
  },
  button: {
    backgroundColor: '#714db2',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    height: 40,
    padding: 10,
    fontWeight: 'bold',
    fontSize: 14
  },
  buttonStyle: {
    opacity: 0.4
  },
  checkboxStyle: {
    backgroundColor: 'transparent',
    marginVertical: 5,
    height: 40,
    alignItems: 'center',
    borderWidth: 0,
  }
});