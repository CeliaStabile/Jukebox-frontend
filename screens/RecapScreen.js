import React, { useEffect, useState } from 'react';
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
  import { useDispatch, useSelector } from 'react-redux';
  import { getPartyName } from '../reducers/user';
  

  export default function ConnectionScreen({navigation}) {
   
    const backendUrl = 'https://jukebox-backend.vercel.app'
    const user = useSelector((state) => state.user.value);
    const dispatch = useDispatch();

    const handleSubmit = () => {
      if(user.isDj && user.partyName){
      fetch(`${backendUrl}/newparty`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
           name: user.partyName,
           })
      }).then(response => response.json())
      navigation.navigate('TabNavigator');
    }
  };

  function partyrandom () {
    const mots =['badbunny','confetti','teuf','hiphop','dance','biere','jeanne','rnb','disney','macumba','fiesta','shaki','zouk','reaggeton','jazz','rap','ska', 'djsnake', 'retro', 'frenchtouch', 'karaoke', 'dancehall', 'rock', 'soul', 'blues', 'bossaova']
    const motAleatoire = mots[Math.floor(Math.random() * mots.length)];
    const chiffreAleatoire = Math.floor(Math.random() * 10000);
    const password = motAleatoire + chiffreAleatoire;
         console.log('password', password);
    return password;
  }

  
  useEffect(() => {
    if (user.isDj) {
      dispatch(getPartyName(partyrandom()));
    }
  }, []);


  
 
  return (
    <ImageBackground source={require('../assets/bg-screens.jpg')} style={styles.background}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <Image style={styles.image} source={require('../assets/logo.jpg')} />
        <View style={styles.containerRecap}>
          <Text style={styles.title}>Nom de la soirée</Text>          
            <View style={styles.divider}></View>          
          <Text style={styles.titleW}>{user.partyName}</Text>
          </View>
          <View style={styles.containerRecap}>
          <Text style={styles.title}>Connection Spotify</Text>
            <View style={styles.divider}></View>
          <Text style={styles.titleW}>tu es connecté(e)</Text>
        </View>
        <View style={styles.containerButton}>
          <TouchableOpacity onPress={() => handleSubmit()} style={styles.button} activeOpacity={0.8}>
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
      marginTop: 20,
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
    backgroundColor: '#FAEE1C',
    borderRadius: 30,
  },
  textButton: {
    color: '#581B98',
    fontWeight: '600',
    fontSize: 28,
  },
  divider:{
    borderBottomColor: '#F3558E',
    borderBottomWidth: 1,
    // marginBottom: 20,
    // marginTop: 20,      
    width: '90%',      
  },
});
