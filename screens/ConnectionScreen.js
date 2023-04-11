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
        <Text style={styles.title}>Connection Spotify</Text>
          <TouchableOpacity style={styles.button} activeOpacity={0.8}>
            <Text style={styles.textButton}>Spotify</Text>
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
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 310,
    height: 70,
    backgroundColor: '#1DB954',
    borderRadius: 30,
  },
  textButton: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 28,
  },
});