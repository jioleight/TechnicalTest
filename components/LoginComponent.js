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
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import FlashMessage from 'react-native-flash-message';
import { showMessage } from 'react-native-flash-message';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { TextField } from 'react-native-material-textfield';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export default class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      emailERR: ' ',
      passERR: ' ',
      checked: false,
      rememberLogin: false,
      emailValid: true,
      passwordValid: true,
      loginValid: false,
      displayIMG: true,
      keyboardOpen: false,
    }
  }
  componentDidMount() {
    this.forceUpdate();
    this.checkInfo();
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  componentWillMount() {
    this.checkInfo();
  }

  componentWillUnmount() {
    this.checkInfo();
    clearTimeout(this.waitTime);
  }

  waitTime() {
    showMessage({
      message: 'Login Success!',
      description: 'Welcome ' + this.state.email,
      type: 'success',
      position: 'center'
    })
    setTimeout(() => {
      this.props.navigation.navigate('Profile');
    }, 1500)
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
  }
  // Login Function //
  login = () => {
    this.saveInfo();
    this.waitTime();
  }
  valueTextField(type) {
    if (type === 'email') {
      return (this.state.email)
    } else {
      return (this.state.password)
    }
  }
  // Save Credentials //
  saveInfo = async () => {
    if (!this.state.checked) {
      this.setState({
        email: '',
        password: ''
      })
    }
    try {
      let data = {
        email: this.state.email,
        password: this.state.password,
        rememberLogin: this.state.checked,
      }
      AsyncStorage.setItem('data', JSON.stringify(data));
    } catch(error) {
    console.warn(error);
  }
}
// Check Saved Credentials //
checkInfo = async () => {
  try {
    let data = await AsyncStorage.getItem('data');
    let parsedata = JSON.parse(data)
    if (parsedata !== null) {
      this.setState({
        email: parsedata.email,
        password: parsedata.password,
        rememberLogin: parsedata.rememberLogin,
        checked: parsedata.rememberLogin,
        loginValid: false,
      })
      if (!parsedata.rememberLogin) {
        this.setState({
          loginValid: false,
          email: '',
          password: ''
        })
      } else {
        this.setState({
          loginValid: true,
        })
      }
    } else {
      this.setState({
        loginValid: false,
      });
    }
  } catch (error) {
    console.warn(error);
  }
}
// Start Here //
render() {
  console.log(this.state.checked)
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      enabled>
      <View style={styles.containerImg}>
        <Image
          source={require('../assets/Logo.png')}
          style={!this.state.displayIMG ? styles.hideIMG : styles.showImg}
        />
      </View>
      <View style={styles.textInputContainer}>
        <TextField
          ref={input => { this.textInput = input }}
          value={this.valueTextField('email')}
          keyboardType='email-address'
          autoCorrect={false}
          autoCapitalize='none'
          onSubmitEditing={() => this.passwordInput.focus()}
          onChangeText={
            (text) => this.emailValidate(text, 'email')
          }
          onFocus={() => this.setState({ displayIMG: false })}
          label='Email Address'
          returnKeyType='next'
          error={!this.state.emailValid ? this.state.emailERR : null}
        />

        <TextField
          ref={(input) => this.passwordInput = input}
          value={this.valueTextField('password')}
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
      <FlashMessage
        floating={true}
        icon='auto'
        style={{ alignItems: 'center' }}
        hideOnPress={false}
      />
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
    width: wp('100%'),
    marginTop: getStatusBarHeight(),
  },
  showImg: {
    resizeMode: 'contain',
    width: '70%',
    height: '70%',
    alignItems: 'center'
  },
  hideIMG: {
    resizeMode: 'center',
    width: '0%',
    height: '0%',
  },
  containerImg: {
    width: wp('100%%'),
    height: hp('60%'),
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputContainer: {
    width: wp('80%'),
    height: hp('40%'),
    backgroundColor: '#fff',
    marginBottom: hp('10%'),
    flex: 0,
    justifyContent: 'center',
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