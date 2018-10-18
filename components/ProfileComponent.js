import React from 'react';
import { List, ListItem, colors } from 'react-native-elements';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
    StyleSheet,
    View,
    FlatList,
    AsyncStorage,
} from 'react-native';
import { NavigationActions } from 'react-navigation';

export default class ProfileComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataUsers: [],
        }
    }

    componentDidMount() {
        this.makeRemoteRequest();
        AsyncStorage.getItem('data')
        .then((check) => {
            console.log(check)
        })
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
    }
    render() {
        console.log(this.state.email);
        return (
            <View style={styles.container}>
                <List containerStyle = {{marginTop: 0}}>
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
        );
    }
}
const backAction = NavigationActions.back({
    key: 'Home',
});

const styles = StyleSheet.create({
    container: {
        flex: 0,
        height: hp('100%'),
        width: wp('100%'),
        backgroundColor: '#fff',
        justifyContent: 'flex-start'
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