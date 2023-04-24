import React, { useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { djLog, getToken, getPartyName, logout } from "../reducers/user";

export default function ChoiceScreen({ navigation }) {
  //ID spotify developer
  const CLIENT_ID = "YOUR CLIENT ID";
  const CLIENT_SECRET = "YOUR CLIENT SECRET";

  const user = useSelector((state) => state.user.value);

  //création d'un nom de soirée aléatoire
  function partyrandom() {
    const mots = [
      "badbunny",
      "daddy",
      "maluma",
      "romeo",
      "swing",
      "rnb",
      "zouk",
      "jeanne",
      "bachata",
      "disney",
      "macumba",
      "merengue",
      "shaki",
      "electro",
      "salsa",
      "jazz",
      "rap",
      "patoche",
      "djsnake",
      "retro",
      "frenchtouch",
      "karaoke",
      "dancehall",
      "rock",
      "soul",
      "blues",
      "bossanova",
    ];
    const motAleatoire = mots[Math.floor(Math.random() * mots.length)];
    const chiffreAleatoire = Math.floor(Math.random() * 10000);
    const password = motAleatoire + chiffreAleatoire;
    console.log("password", password);
    return password;
  }

  // au clic DJ, le reducer enregistre IsDj à true
  const dispatch = useDispatch();
  const isDJ = () => {
    dispatch(logout());
    dispatch(djLog());
    console.log("choice : dj");
  };

  //fonction qui utilise party random et enregistre partyName dans le reducer
  const handlePassword = () => {
    dispatch(getPartyName(partyrandom()));
  };

  //au clic invité, génération token invité, enregistrement dans le reducer du token et envoi vers party
  const handleInvite = () => {
    dispatch(logout());
    fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
    })
      .then((result) => result.json())
      .then((data) => {
        const token = data.access_token;
        dispatch(getToken(token));
        console.log("getToken", token);
        console.log("user.token", user.token);
        navigation.navigate("Party");
      });
  };
  console.log("user.token", user.token, "partyname", user.partyName);

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
        <Text style={styles.title}>Choisis ton rôle</Text>
        <View style={styles.divider}></View>
        <View style={styles.containerButton}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("Connection"), isDJ(), handlePassword();
            }}
            activeOpacity={0.8}
          >
            <FontAwesome name="headphones" size={63} color="#581B98" />
            <Text style={styles.textButton}>DJ</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleInvite();
            }}
            style={styles.button}
            activeOpacity={0.8}
          >
            <FontAwesome name="gift" size={63} color="#581B98" />
            <Text style={styles.textButton}>INVITÉ</Text>
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
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 150,
    height: 150,
    margin: 20,
    backgroundColor: "#FAEE1C",
    borderRadius: 20,
  },
  textButton: {
    color: "#581B98",
    fontWeight: "600",
    fontSize: 28,
  },
  divider: {
    borderBottomColor: "#F3558E",
    borderBottomWidth: 1,
    marginBottom: 20,
    width: "70%",
  },
});
