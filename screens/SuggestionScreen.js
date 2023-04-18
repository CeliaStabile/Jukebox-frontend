
import React, { useState, useEffect } from 'react';
import { Card, Button, Icon, ListItem, Avatar } from 'react-native-elements'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { Searchbar } from 'react-native-paper';
import { StatusBar } from "expo-status-bar";
import Swipeable from 'react-native-gesture-handler/Swipeable';

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
  import LikeButton from '../componements/likeButton';

 
export default function SuggestionScreen() {


  const backendUrl= "https://jukebox-backend.vercel.app"

  const user = useSelector((state) => state.user.value);
  
       const [input, setInput] = useState("");
       const [resultats, setResultats] = useState([]);
       const [search, setSearch] = useState("");
       const [suggestion, setSuggestion]= useState([]);

       useEffect(() => {
        getSuggestions();
      }, [suggestion]);


     async function getSuggestions() {
      try {
        const response = await fetch(`${backendUrl}/suggestions/${user.partyName}`);
        const data = await response.json();
        if(data.suggestion !== suggestion) {
          setSuggestion(data.suggestions);
        }
      } catch (error) {
        console.error(error);
      }
    }
      
function ajoutsuggestion(item) {
//pour envoyer dans le back la chanson dans la base de donnée

fetch(`${backendUrl}/suggestions/new`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
      name: user.partyName,
      title: item.title,
      artist: item.artist ,
      url_image: item.url_image,
      uri: item.uri ,
      likeCount:0
    })
      }).then(response => response.json())
      .then(data => {
        if (data.result) {
          console.log('envoyé au backend')
       
        }
      });
    setResultats([]);
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
          //console.log('data', data);
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
              })}
      

          function ajoutLike(i) {
            
            fetch(`${backendUrl}/suggestions/like/${user.partyName}/${i.uri}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                likeCount: 1
              })
            })
              .then(response => response.json())
              .then(data => {
                if (data.result) {
                  console.log('A voté')
                }
              });
          }     





          const handleDelete = (index) => {
            const newSuggestions = [...suggestion];
            newSuggestions.splice(index, 1);
            setSuggestion(newSuggestions);
          };

          // a changer ne fonctionne pas
          function handleDeleted(i) {

            fetch(`${backendUrl}/suggestions/${user.partyName}/${i.uri}`, {
              meyhod: 'DELETE',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                partyName: user.partyName,
                uri: i.uri
              })
            })
            .then(response => response.json())
              .then(data => {
                if (data.result) {
                  console.log('A supprimé');
                }
                
              });
          }     
          
          
        //  const handleAddToPlaylist = 
          
          
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
      <View style={styles.searchbarcontainer}>
            <Searchbar style={styles.searchbar}
              platform="default"            
              placeholderTextColor={'#49454E'}
              placeholder="Suggérer un titre ou un artiste"
              onChangeText={(value) => setInput(value)}
              onSubmitEditing={() => recherche(input)}
              value={input}
              />
            
              <FlatList style={styles.flatlist}
                  data={resultats}
                  renderItem={({ item }) => (
                    <View style={styles.flatsong}>                      
                      <TouchableOpacity style={styles.flatitem} onPress={() => ajoutsuggestion(item)}>
                      
                        <Text style={styles.flattitle}>{item.title}</Text>
                        <Text style={styles.flatartist}>{item.artist}</Text>
                      </TouchableOpacity>
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
        <View style={styles.divider2}>   
        </View>
      </View>

      <ScrollView style={styles.scroll}>
        <View style={styles.list}>{
            suggestion.map((l, i) => (
              user.isDj ?
                <Swipeable
                  renderRightActions={(index) => (
                    <TouchableOpacity onPress={() => onSwipeableRightOpen(index)}>
                      <View style={styles.rightSwipeItem} />
                    </TouchableOpacity>
                  )}
                  onSwipeableRightOpen={() => {   handleDelete(i) && handleDeleted(i)  }}


                  renderLeftActions={(index) => (
                    <TouchableOpacity onPress={() => onSwipeableLeftOpen(index)}>
                      <View style={styles.leftSwipeItem} />
                    </TouchableOpacity>
                  )}
                  onSwipeableLeftOpen={() => {  /* handleAddToPlaylist */     }}
                  >
                  
                  <ListItem key={i} bottomDivider style={styles.listitem}>
                    <Avatar source={{uri: l.url_image}} />
                    <ListItem.Content style={styles.listcontent}>
                      <ListItem.Title style={styles.listtitle}>{l.title}</ListItem.Title>
                      <ListItem.Subtitle style={styles.listsubtitle}>{l.artist}</ListItem.Subtitle>
                    </ListItem.Content>
                    {user.isDj && (
                      <View style={styles.likebutton}>
                        <LikeButton onPress={()=> ajoutLike(l)} song={l} />
                      </View>
                    )}
                  </ListItem>
                </Swipeable>
              :
                <ListItem key={i} bottomDivider style={styles.listitem}>
                  <Avatar source={{uri: l.url_image}} />
                  <ListItem.Content style={styles.listcontent}>
                    <ListItem.Title style={styles.listtitle}>{l.title}</ListItem.Title>
                    <ListItem.Subtitle style={styles.listsubtitle}>{l.artist}</ListItem.Subtitle>
                  </ListItem.Content>
                  {user.isDj && (
                    <View style={styles.likebutton}>
                      <LikeButton onPress={()=> ajoutLike(l)} song={l} />
                    </View>
                  )}
                </ListItem>
              )
            )
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
    searchbarcontainer: {
      // backgroundColor: 'red',
      justifyContent: 'center',
      paddingLeft: 20,
      paddingRight: 20,
      marginTop: 45,
      marginBottom: 45,
    },
    searchbar:{
      borderColor: '#F3558E',
      borderWidth: 2,
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
    },
    rightSwipeItem: {
      width: 1,
    },
    flatcontainer:{
      marginTop: StatusBar.currentHeight || 0,
      // backgroundColor:'red',
      
    },
    flatlist:{
      backgroundColor:'#eee8f4',
      borderRadius: 30,
      // borderColor: '#F3558E',
      // borderWidth: 2,      
    },
    flatsong:{

    },
    flatitem:{
      borderBottomColor: '#9C1DE7',
      borderBottomWidth: 1,
      height:0,
      margin:10,
    },
    flattitle:{
      color: '#1A1C1E',
      fontSize: 16,
      fontWeight: '400',
    },
    flatartist:{
      color: '#49454F',
      // fontSize: 14,
      // fontWeight: '400',
      // marginBottom:30,
    },
    rightSwipeItem: {
      width: 1,

    },
    leftSwipeItem: {
      width: 1,
    }
    
  },
);