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


export default function PlaylistScreen() {

    
  return (
<KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>


   <Text> PLAYLIST </Text>

</KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
    container: {

        backgroundColor: 'blue',
        flex: 1,
    }
  
  },
);
