import React, { useState, useEffect } from 'react';
import { Card, Button, Icon, ListItem, Avatar } from 'react-native-elements'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { Searchbar } from 'react-native-paper';
import { StatusBar } from "expo-status-bar";

import {
    ImageBackground,
    Image,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    View,  
    TouchableOpacity,
    ScrollView,
    FlatList,
  } from 'react-native';
  import { useSelector, useDispatch } from 'react-redux';

 
export default function SuggestionScreen() {


  const backendUrl= "https://jukebox-backend.vercel.app"

  const user = useSelector((state) => state.user.value);
   console.log('user.token',user.token); 
   
    const users = [
        {
          name: 'Amy Farha',
          avatar_url: 'https://static.fnac-static.com/multimedia/FR/Images_Produits/FR/fnac.com/Visual_Principal_340/1/2/7/5099931916721/tsp20121221100041/Prestige.jpg',
          subtitle: 'Vice President'
        },
       ]

       const list = [
        {
          name: 'Amy Farha',
          avatar_url: 'https://static.fnac-static.com/multimedia/FR/Images_Produits/FR/fnac.com/Visual_Principal_340/1/2/7/5099931916721/tsp20121221100041/Prestige.jpg',
          subtitle: 'Vice President'
        },
       ]


       const [input, setInput] = useState("");
       const [resultats, setResultats] = useState([]);
       const [search, setSearch] = useState("");
       const [suggestion, setSuggestions]= useState([]);

     async  function getSuggestion() {
       await fetch(`${backendUrl}/suggestions/${user.partyName}`)
          .then(response => response.json())
          .then(data => {
            setSuggestions(data.suggestion);
          

          });
         ;
      }
    
     useEffect (() => {
      getSuggestion();
     },[]);

      
function ajoutsuggestion(item) {
//pour envoyer dans le back la chanson dans la base de donnée
fetch(`${backendUrl}/suggestions/new`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
      name: user.partyName,
      title: resultats.title,
      artist: resultats.artist ,
      url_image: resultats.url_image,
      uri: resultats.uri ,
      likeCount:0
    })
      }).then(response => response.json())
      .then(data => {
        if (data.result) {
          console.log('envoyé au backend')
        setResultats([]);
        }
      });

}


async function recherche(value) {  

    const trackParameters = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`,
          }
    }
      // pour avoir titanic en premier il faut faire un tri selon popularité de la chanson pour l'avoir en premier
       
        const track = await fetch(`https://api.spotify.com/v1/search?query=${input}&type=track,artist&market=FR&offset=0&limit=5`, trackParameters)
        .then(response => response.json())
        .then(data => {
          console.log('data', data);
              const result = data.tracks.items;
              const tracks = result.map(item => ({
                title: item.name,
                artist: item.artists[0].name,
                url_image: item.album.images[2].url,
                uri: item.uri,
              }));
              //useState tableau vide resultats à prendre en compte
              setResultats(tracks);
              setInput('');
             
              })
           

     }
      console.log('resultat', resultats);

       
        
        /*const affichage = resultats.map((data, i) => {
          return (
           <View onPress={() => ajoutsuggestion()}>
              <Image source={{uri:data.url_image}}/>
               <Text>{data.title}</Text>
                <Text>{data.artist}</Text>
            </View>
            
          )})*/

        /*  const renderItem = ({ item }) => (
            <TouchableOpacity onPress={() => ajoutsuggestion()}>
              <View>
                <Image source={{uri:item.url_image}}/>
                <Text>Titre : {item.title}, Artiste : {item.artist}</Text>
               </View>
            </TouchableOpacity>
          );*/
      



          
  return (
    <ImageBackground source={require('../assets/bg-screens.jpg')} style={styles.background}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.party}>
      {!user.isDj && <Text style={styles.title}>Ajoute ton morceau !</Text>}
      {user.isDj && <Text style={styles.title}>Swipe 👈 ou 👉</Text>}
      </View>

      <View style={styles.contentdivider}>
        <View style={styles.divider1}></View>
      </View>

      {!user.isDj && 
      <View style={styles.searchbar}>
            <Searchbar
              platform="default"            
              placeholderTextColor={'#49454E'}
              placeholder="Suggérer un titre ou un artiste"
              onChangeText={(value) => setInput(value)}
              onSubmitEditing={() => recherche(input)}
              value={input}
              />
            <FlatList
                data={resultats}
                renderItem={({ item }) => (
                  <View onPress={() => ajoutsuggestion(item)}>
                   <Text>Titre : {item.title}, Artiste : {item.artist}</Text>
                 </View>
                )}
                keyExtractor={(item) => item.uri}
            />
            <StatusBar style="auto" />
            <View style={styles.errorphrase}>
              <Text style={styles.error}>Ce titre a déjà été proposé 😕</Text>
            </View>
      </View>
      
      }

      <View style={styles.contentdivider}>
        <View style={styles.divider2}></View>
      </View>

      <ScrollView style={styles.scroll}>
        <View style={styles.list}>{
            suggestion.map((l, i) => (
            <ListItem key={i} bottomDivider style={styles.listitem}>
                <Avatar source={{uri: l.url_image}} />
                <ListItem.Content style={styles.listcontent}>
                <ListItem.Title style={styles.listtitle}>{l.title}</ListItem.Title>
                <ListItem.Subtitle style={styles.listsubtitle}>{l.artist}</ListItem.Subtitle>
                </ListItem.Content>
                <Text style={styles.count}>0</Text>
                <FontAwesome name='heart-o' size={30} color='#F3558E'/>
            </ListItem>
            ))
          }
        </View>
      </ScrollView>
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
      justifyContent: 'space-between'
    },
    party: {
      // backgroundColor: 'red',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      height: '20%',
    },
    title: {
      fontSize: 32,
      fontWeight: '600',
      marginBottom: 20,
      color: '#581B98',
    },
    searchbar: {
      // backgroundColor: 'red',
      justifyContent: 'center',
      paddingLeft: 20,
      paddingRight: 20,
      marginTop: 45,
      marginBottom: 45,
    },
    list: {
      height: '50%',
    },
    listitem: {
      borderBottomColor: '#9C1DE7',
      borderBottomWidth: 1,
    },
    listcontent: {
      // backgroundColor: 'pink',
    },
    listtitle: {
      color: '#1A1C1E',
      fontSize: 16,
      fontWeight: '400',
    },
    listsubtitle: {
      color: '#49454F',
    },
    count: {
      color: '#1A1C1E',
      fontSize: 18,
      fontWeight: '400',
    },
    contentdivider: {
      alignItems: 'center',
      heigh: '10%',
    },
    divider1:{
      borderBottomColor: '#F3558E',
      borderBottomWidth: 1,
      // marginBottom: 20,
      marginTop: 20,      
      width: '70%',      
    },
    divider2:{
      borderBottomColor: '#F3558E',
      borderBottomWidth: 1,
      marginBottom: 20,
      // marginTop: 10,     
      width: '70%',      
    },
    errorphrase: {
      alignItems: 'center',
    },
    error:{
      fontSize: 16,
      marginTop: 10,
      color: '#FAEE1C',
    }
  },
);
