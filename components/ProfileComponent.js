import React from 'react';
import FlashMessage from 'react-native-flash-message';
import { showMessage } from 'react-native-flash-message';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { List, ListItem, colors } from 'react-native-elements';
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
        this.makeRemoteRequest();
        this.forceUpdate();
    }
    makeRemoteRequest = () => {
        const { page, seed } = this.state;
        const url = 'https://randomuser.me/api/?seed=${seed}&page=${page}&results=120';
        this.setState({ loading: true });
        fetch(url)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    dataUsers: page === 1 ? res.results : [...this.state.dataUsers, ...res.results],
                    error: res.error || null,
                    loading: false,
                    refresh: false
                });
            })
            .catch(error => {
                this.setState({ error, loading: false });
            });
        console.log(this.state.dataUsers);
    }
    logout = () =>{
        goBack('Home');
    }
    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior='padding' enabled>
                <View style={styles.userContainer}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.textTitle}>List of users</Text>
                        <TouchableOpacity 
                            style={styles.logoutButton}
                            onPress = { this.logout() }>
                            <Text style={{ color: 'white' }}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                    <List>
                        <FlatList
                            data={this.state.dataUsers}
                            renderItem={({ item }) => (
                                <ListItem
                                    roundAvatar
                                    title={`${item.name.first} ${item.name.last}`}
                                    subtitle={item.email}
                                    avatar={{ uri: item.picture.thumbnail }}
                                />
                            )}
                            keyExtractor={item => item.email}
                        />
                    </List>
                </View>
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
    headerContainer: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        marginTop: 10
    },
    userContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        height: hp('100%'),
        width: wp('100%'),
        padding: 10,
    },
    logoutButton: {
        padding: 5,
        alignItems: 'center',
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