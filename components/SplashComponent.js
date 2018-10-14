import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';

export default class SplashComponent extends React.Component {
    componentWillMount() {
        setInterval(() =>{
            this.props.navigation.navigate('Home');
        }, 2000)
    }
    render() {
        return (
            <View style={ styles.container }>
                <Image source={ require('../assets/Logo.png') } style={ styles.img }></Image>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    img: {
        width: 303,
        height: 207,
    }
});