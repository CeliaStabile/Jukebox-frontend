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
import { addSuggestion } from '../reducers/user';
 
export default function SuggestionScreen() {

  const backendUrl= "https://jukebox-backend.vercel.app"

  const user = useSelector((state) => state.user.value);
  
       const [input, setInput] = useState("");
       const [resultats, setResultats] = useState([]);
       const [search, setSearch] = useState("");
       const [suggestion, setSuggestion]= useState([]);
      const [personalLikes, setPersonalLikes] = useState([]); //tab des songs liké par l'utilisateur 
      const [alerte, setAlerte] =useState(''); //pour affichage si chanson déjà ajoutée
      const dispatch = useDispatch();

//déclaration de fonction pour obtenir les suggestions du backend
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
    
    //à l'ouverture du composant, récupérer les suggestions du backend
    //se met à jour à chaque fois que suggestion change
    useEffect(() => {
      getSuggestions();
    }, [suggestion]);

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
        else {
          setAlerte(data.error);
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
      

     //ajouter like a BDD 
          function ajoutLike(i) {
            if(!user.isDj){
              fetch(`${backendUrl}/suggestions/like/${user.partyName}/${i.uri}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },   
            })
              .then(response => response.json())
              .then(data => {
                if (data.result) {
                  console.log(data.message);
                }
              })};
          }     
  

          function removeLike(i) {
            if(!user.isDj){
              fetch(`${backendUrl}/suggestions/dislike/${user.partyName}/${i.uri}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },   
            })
              .then(response => response.json())
              .then(data => {
                if (data.result) {
                  console.log(data.message)
                }
              })};
          }     
  
async function addSong(l) {
            //attention ça ajoute quand on swippe vers la gauche et non vers la droite
            if (user.isDj) {
              const addPlaylist = await fetch(
                `https://api.spotify.com/v1/me/player/queue?uri=${l.uri}`,
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                  },
                  json: true,
                }
              );
              
console.log('bien envoyé à la queue');

//pour supprimer ensuite au back end et mettre à jour la liste des suggestions

}}

     function deleteSuggestion(l) {
      console.log('supprimé');
      if(user.isDj) {
       //route pour mettre à jour le sous document suggestion et bien ne selectionné que l'objet avec l'uri(unique)        
         fetch(`${backendUrl}/suggestions/${user.partyName}/${l.uri}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: user.partyName,
              uri: l.uri,
            })
          })
            .then(response => response.json())
            .then(data => {
              if (data.result) {
                console.log('supprimé des suggestions')
              }
            });
        }  
       }  
          
  
          
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
            <Searchbar style={styles.searchbarcontent}
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
              <Text style={styles.error}>{alerte}</Text>
            </View>
      </View>
      
      }

      <View style={styles.contentdivider}>
        <View style={styles.divider2}>   
        </View>
      </View>

      <ScrollView style={styles.scroll}>
        
        
        <View style={styles.list}>{
          suggestion.map((l, i) => {
            return(
            
                        <Swipeable
              renderLeftActions={(index, song) => (
                <TouchableOpacity onPress={() => onSwipeableLeftOpen(l)}>
                <View style={styles.leftSwipeItem} >
                </View>
                </TouchableOpacity>
              )}
              onSwipeableLeftOpen={() => { addSong(l), deleteSuggestion(l);
                }} 
                renderRightActions={(index, song) => (
                  <TouchableOpacity onPress={() => onSwipeableRightOpen(l)}>
                    <View style={styles.rightSwipeItem} >
                    </View>
                  </TouchableOpacity>
                )}
                onSwipeableRightOpen={() => { deleteSuggestion(l); }}
                               >
            <ListItem key={i} bottomDivider style={styles.listitem}>
                <Avatar source={{uri: l.url_image}} />
                <ListItem.Content style={styles.listcontent}>
                <ListItem.Title style={styles.listtitle}>{l.title}</ListItem.Title>
                <ListItem.Subtitle style={styles.listsubtitle}>{l.artist}</ListItem.Subtitle>
                </ListItem.Content>
                <TouchableOpacity onPress={()=> 
                  {if(personalLikes.includes(l.uri)){
                  personalLikes.splice(l.uri, 1);
                  removeLike(l)
                }
                  else {
                     setPersonalLikes([...personalLikes, l.uri]);
                     ajoutLike(l);
                    }
                     }
                  } >
             <LikeButton isLiked={personalLikes.includes(l.uri)} song={l} likeCount={l.likeCount}/>
             </TouchableOpacity>
            </ListItem>
            </Swipeable>
            )}
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
    searchbar: {
      // backgroundColor: 'red',
      justifyContent: 'center',
      paddingLeft: 20,
      paddingRight: 20,
      marginTop: 45,
      marginBottom: 45,
    },
    searchbarcontent:{
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
      height:50,
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