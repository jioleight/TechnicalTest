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

export default class Profile extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Welcome</Text>
            </View>
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
});