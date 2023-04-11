import React, { useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {  
  KeyboardAvoidingView, 
  StyleSheet, 
  Text, 
  View, 
  ImageBackground, 
  Image,  
  TouchableOpacity,
  TextInput,
  Platform} from 'react-native';

  export default function ConnectionScreen({navigation}) {
   
   
  return (
    <ImageBackground source={require('../assets/bg-screens.jpg')} style={styles.background}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <Image style={styles.image} source={require('../assets/logo.jpg')} />
        {/* <View style={styles.containerRecap}>
          <Text style={styles.title}>Nom de la soirée</Text>
          <Text style={styles.titleW}>DADDY5</Text>
          <Text style={styles.title}>Connection Spotify</Text>
          <Text style={styles.titleW}>DJ YANKEE</Text>
        </View> */}
        <View style={styles.containerButton}>
        <Text style={styles.title}>Nom de la soirée</Text>
        

        
        <TextInput
            placeholder="Entre le nom de la soirée"
            placeholderTextColor="white"
            autoCapitalize="none" // https://reactnative.dev/docs/textinput#autocapitalize
            // onChangeText={(value) => setEmail(value)}
            // value={email}
            style={styles.input}
          />



          <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={() => navigation.navigate('TabNavigator')} >
            <Text style={styles.textButton}>Go to Party !</Text>
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    marginBottom:70,
    borderRadius:20,
    width: 200,
    height: 150,
  },
  title: {
    fontSize: 32,
      fontWeight: '600',
      marginBottom: 20,
      color: '#FAEE1C'
  },
  titleW: {
    fontSize: 32,
      fontWeight: '600',
      marginBottom: 20,
      color: '#FFFFFF'
  },
  containerRecap: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '85%',
    paddingTop: 30,
    paddingBottom: 30,

  },
  containerButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '85%',
    paddingTop: 30,
    borderRadius: 1,
  },
  input: {
    placeholderTextColor: 'white',
    color:'white',
    width: '80%',
    height: 40,
    borderColor: '#FAEE1C', 
    borderWidth: 1,  
    marginBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 16,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 310,
    height: 70,
    backgroundColor: '#FAEE1C',
    borderRadius: 30,
  },
  textButton: {
    color: '#581B98',
    fontWeight: '600',
    fontSize: 28,
  },
});
