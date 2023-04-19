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
  Platform,
  Keyboard} from 'react-native';
  import { useSelector, useDispatch } from 'react-redux';
  import { getPartyName } from '../reducers/user';
  import ConfettiCanon from 'react-native-confetti-cannon';
  
 
  export default function ConnectionScreen({navigation}) {
    const user = useSelector((state) => state.user.value);
    const dispatch = useDispatch();
    const [partyName, setPartyName] = useState("");
    const [error, setError] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);

    const backendUrl = 'https://jukebox-backend.vercel.app'

    const handleSubmit = () => {
      fetch(`${backendUrl}/findparty?name=${partyName}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }).then(response => response.json())
      .then(data => {
        if (data.result) {  
          setShowConfetti(true);
          dispatch(getPartyName(partyName));
          setTimeout(() => {
            navigation.navigate('TabNavigator');
          }, 3700);        
        } else {
          setError(true)
        }
      });
    };

   console.log(user);

  return (
    <ImageBackground source={require('../assets/bg-screens.jpg')} style={styles.background}>    
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <Image style={styles.image} source={require('../assets/logo.jpg')} />
        <View style={styles.containerButton}>
        <Text style={styles.title}>Nom de la soirée</Text>
        <View style={styles.divider}></View>
        
        <TextInput
            placeholder="Entre le nom de la soirée"
            placeholderTextColor="white"
            autoCapitalize="none" // https://reactnative.dev/docs/textinput#autocapitalize
            onChangeText={(value) => setPartyName(value)}
            value={partyName}
            style={styles.input}
          />
          <TouchableOpacity onPress={() => {handleSubmit()
           Keyboard.dismiss()}} style={styles.button} activeOpacity={0.8}>
            <Text style={styles.textButton}>Go to Party !</Text>
          </TouchableOpacity>
          {error && <Text style={styles.error}>Cette soirée n'existe pas 😖</Text>}
          {showConfetti && (
          <ConfettiCanon
          count={200}
          origin={{x: -10, y: 0}}
          colors={['#ff2e2e', '#F0F', '#FFFACD', '#00FFFF', '#7FFFD4', '#00FF00', '#FF00FF', '#FFD700', '#FF7F50']}
          explosionSpeed={500}
          fallSpeed={2000}
          fadeOut={true}/>)} 
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
    // placeholderTextColor: 'white',
    borderRadius: 5,
    color:'white',
    width: '90%',
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
  error:{
    fontSize: 16,
    marginTop: 10,
    color: 'white',
  },
  divider:{
    borderBottomColor: '#F3558E',
    borderBottomWidth: 1,
    marginBottom: 20,
    // marginTop: 20,      
    width: '80%',      
  },
 

});