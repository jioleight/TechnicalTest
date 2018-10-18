import React from 'react';
import FlashMessage from 'react-native-flash-message';
import { showMessage } from 'react-native-flash-message';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { List, ListItem } from 'react-native-elements';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    KeyboardAvoidingView,
    AsyncStorage,
    TouchableOpacity
} from 'react-native';
import { TextField } from 'react-native-material-textfield';

var statusBarHeight = getStatusBarHeight();

export default class ProfileComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataUsers: []
        }
    }

    componentDidMount() {
        showMessage({
            message: 'Login Successful!',
            type: 'success',
            position: 'center',
        })
        this.makeRemoteRequest();
    }
    makeRemoteRequest = () => {
      const { page, seed} = this.state;
      const url = 'https://randomuser.me/api/?seed=${seed}&page=${page}&results=120';
      this.setState({ loading: true });
      fetch(url)
        .then( res => res.json() )
        .then( res => {
          this.setState({
            dataUsers: page === 1 ? res.results : [...this.state.dataUsers, ...res.results],
            error: res.error || null,
            loading: false,
            refresh: false
          });
        })
        .catch( error => {
          this.setState({ error, loading: false });
        });
      console.log(this.state.dataUsers);
    }
    dataStored = async () => {
      
    }
    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior='padding' enabled>
                <View style={styles.addContainer}>
                    <Text style={styles.textTitle}>Add new users here</Text>
                    <TextField
                        label='Email'
                        keyboardType='default'
                    />
                    <TextField
                        label='Password'
                        keyboardType='visible-password'
                    />
                    <TouchableOpacity style={styles.saveButton}>
                        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Save</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.userContainer}>
                    <Text style={styles.textTitle}>List of users</Text>
                    <List>
                        <FlatList
                            data={this.state.dataUsers}
                            renderItem={({ item }) => (
                                <ListItem
                                    roundAvatar
                                    title = {`${item.name.first} ${item.name.last}`}
                                    subtitle = { item.email }
                                    avatar = {{ uri: item.picture.thumbnail }}
                                />
                            )}
                            keyExtractor={item => item.email}
                        />
                    </List>
                </View>
                <FlashMessage
                    floating={true}
                    icon='auto'
                    style={{ alignItems: 'center' }}
                />
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        maxHeight: hp('100%'),
        maxWidth: wp('100%'),
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: statusBarHeight,
    },
    addContainer: {
        flex: 0,
        justifyContent: 'space-evenly',
        height: hp('35%'),
        width: wp('100%'),
        padding: 30,
    },
    userContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        height: hp('70%'),
        width: wp('100%'),
        padding: 20,
        marginBottom: statusBarHeight,
    },
    saveButton: {
        padding: 10,
        height: 40,
        alignItems: 'center',
        marginLeft: wp('65%'),
        marginTop: statusBarHeight,
        backgroundColor: '#5cb85c',
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: 10,
    },
    textTitle: {
        fontSize: 25,
        fontWeight: 'bold',
    }
});