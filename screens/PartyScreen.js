import {
    Image,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
  } from 'react-native';


export default function PartyScreen({navigation}) {

    
  return (
<KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

   
   <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TabNavigator')} activeOpacity={0.8}>
            <Text style={styles.textButton}>Go to Playlist !</Text>
          </TouchableOpacity>

</KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
    container: {

        backgroundColor: 'yellow',
        flex: 1,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 310,
        height: 70,
        backgroundColor: 'green',
        borderRadius: 30,


    }
  
  },
);
