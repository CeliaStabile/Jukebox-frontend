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
import { useEffect, useState } from "react";
import { ResponseType, useAuthRequest } from "expo-auth-session";
import { useSelector, useDispatch } from 'react-redux';
import { getToken } from '../reducers/user';


  const discovery = {
    authorizationEndpoint: 
    "https://accounts.spotify.com/authorize",
    tokenEndpoint: 
    "https://accounts.spotify.com/api/token",
  };
  

  export default function ConnectionScreen({navigation}) {

    //accéder à ce qu'il y a dans le reducer user
    const user = useSelector((state) => state.user.value);
   
    const [token, setToken] = useState("");

    const [request, response, promptAsync] = 
    useAuthRequest(
      {
        responseType: ResponseType.Token,
        clientId: "db1242ce93da4429a427639434f2becd",
        scopes: [
          "user-read-currently-playing",
          "user-read-recently-played",
          "user-read-playback-state",
          "user-top-read",
          "user-modify-playback-state",
          "streaming",
          "user-read-email",
          "user-read-private",
        ],
        // In order to follow the "Authorization Code Flow" 
        // to fetch token after authorizationEndpoint
        // this must be set to false
        usePKCE: false,
        redirectUri: "exp://192.168.43.212:19000",
      },
      discovery
    );
  
    useEffect(() => {
      if (response?.type === "success") {
        const { access_token } = response.params;
        console.log("response",response)
        setToken(access_token);
      }
    }, [response]);
  
    console.log(token);


   
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
          <TouchableOpacity style={styles.button} activeOpacity={0.8}  onPress={() => {
          promptAsync();
        }}>
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