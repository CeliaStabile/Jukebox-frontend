import FontAwesome from "react-native-vector-icons/FontAwesome";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useEffect, useState } from "react";
import { ResponseType, useAuthRequest } from "expo-auth-session";
import { useSelector, useDispatch } from "react-redux";
import { getToken } from "../reducers/user";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";

const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

export default function ConnectionScreen({ navigation }) {
  //accéder à ce qu'il y a dans le reducer user
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const [token, setToken] = useState("");

  //mécanisme d'authentification spotify pour le DJ
  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: "yourClientID",
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
      usePKCE: false,
      redirectUri: "yourRedirectURI",
    },
    discovery
  );

  //si l'identification a réussi, on récupère le token du DJ dans le reducer
  useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params;
      setToken(access_token);
      dispatch(getToken(access_token));
    }
  }, [response]);

  //une fois que le DJ a un token, on l'envoie vers recap screen
  if (user.isDj && user.token) {
    navigation.navigate("Recap");
  }

  console.log(user);

  return (
    <ImageBackground
      source={require("../assets/bg-screens.jpg")}
      style={styles.background}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <Image style={styles.image} source={require("../assets/logo.jpg")} />
        <View style={styles.containerButton}>
          <Text style={styles.title}>Connection Spotify</Text>
          <View style={styles.divider}></View>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={() => {
              promptAsync();
            }}
          >
            <Text style={styles.textButton}>Spotify</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    marginBottom: 70,
    borderRadius: 20,
    width: 200,
    height: 150,
  },
  title: {
    fontSize: 32,
    fontWeight: "600",
    marginBottom: 20,
    color: "#FAEE1C",
  },
  titleW: {
    fontSize: 32,
    fontWeight: "600",
    marginBottom: 20,
    color: "#FFFFFF",
  },
  containerRecap: {
    alignItems: "center",
    justifyContent: "center",
    width: "85%",
    paddingTop: 30,
    paddingBottom: 30,
  },
  containerButton: {
    alignItems: "center",
    justifyContent: "center",
    width: "85%",
    paddingTop: 30,
    borderRadius: 1,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 310,
    height: 70,
    backgroundColor: "#1DB954",
    borderRadius: 30,
  },
  textButton: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 28,
  },
  divider: {
    borderBottomColor: "#F3558E",
    borderBottomWidth: 1,
    marginBottom: 20,
    width: "90%",
  },
});
