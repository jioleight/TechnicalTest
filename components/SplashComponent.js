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
        }, 1000)
    }
    render() {
        return (
            <View style={ styles.container }>
                <Image 
                    source={ require('../assets/Logo.png') } 
                    style={ styles.img }
                />
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
        maxWidth: '70%',
        height: '70%',
        resizeMode: 'contain'
    }
});