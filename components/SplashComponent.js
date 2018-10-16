import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';
import { 
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

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
        width: wp('50%'),
        height: hp('80'),
        resizeMode: 'contain'
    }
});