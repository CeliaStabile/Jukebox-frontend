import React, { useEffect, useState } from 'react';
import { Card, Button, Icon, ListItem, Avatar } from 'react-native-elements'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
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
    RefreshControl,
  } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';


export default function PlaylistScreen() {
  const user = useSelector((state) => state.user.value);
  //resQueue et resNowPlaying : réponse de la fonction getAllSongs pour le dj
  const [resNowPlaying, setResNowPlaying] = useState('');
  const [resQueue, setResQueue] = useState([]);
  //queueItems et nowPlaying : réponse de l'appel api au backend pour afficher la playlist
  const [queueItems, setQueueItems] = useState([]);
  const [nowPlaying, setNowPlaying] = useState('');
  const backendUrl= "https://jukebox-backend.vercel.app"
  const [refreshing, setRefreshing] = useState(false);
  

  //déclaration de la fonction qui permet de fetcher la queue et now playing du DJ et de l'enregistrer
  //dans resQueue et resNowPlaying
  async function getAllSongs() {
    try {
      const response = await fetch(`https://api.spotify.com/v1/me/player/queue`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + user.token,
        },
      });
      const data = await response.json();
  
      const currPlayingFull = data.currently_playing;
      const nowPlaying = {
        title: currPlayingFull.name,
        artist: currPlayingFull.artists[0].name,
        url_image: currPlayingFull.album.images[2].url,
        uri: currPlayingFull.uri,
      };
  
      const queue = data.queue.map((item) => ({
        title: item.name,
        artist: item.artists[0].name,
        url_image: item.album.images[2].url,
        uri: item.uri,
      }));
      await setResQueue(queue);
      await setResNowPlaying(nowPlaying);
    } catch (error) {
      console.error(error);
    }
  } 
  
//déclaration de fonction pour copier la queue et le nowplaying fetchés à la database
  async function updateDatabase() {
    if (resQueue.length > 0) {
      try {
        const queueResponse = await fetch(`${backendUrl}/queue/copyqueueitems/${user.partyName}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(resQueue),
        });
        console.log(await queueResponse.json());
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log('empty queue, nothing to send to database');
    }

    if (resNowPlaying !== '') {
      try {
        const nowPlayingResponse = await fetch(`${backendUrl}/queue/copynowplaying/${user.partyName}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(resNowPlaying),
        });
        console.log(await nowPlayingResponse.json());
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log('empty nowplaying, nothing to send to database');
    }
  }

  // quand le dj se connecte pour la première fois, appeler GetAllSongs
  useEffect(() => {
    if (user.isDj) {
      getAllSongs();
    }
  }, []);
  
  // uniquement si getAllSongs a répondu (a fait le fetch API spotify), faire l'appel au backend pour enregistrer en BDD
  useEffect(() => {
    if(user.isDj) {  
    updateDatabase();
  }
  }, [resQueue, resNowPlaying]);
 
  //déclaration de fonctions appel backend pour obtenir la queue et le nowPlaying
 function getQueue(){
  fetch(`${backendUrl}/queue/queueitems/${user.partyName}`)
  .then(response => response.json())
  .then(data => {
    setQueueItems(data.queueItems);
  });
  };

function getNowPlaying(){
  fetch(`${backendUrl}/queue/nowplaying/${user.partyName}`)
  .then(response => response.json())
  .then(data => {
    setNowPlaying(data.nowPlaying);
  }); 
  }

  //A l'ouverture pour tout le monde : récupérer la BDD dans les états du composants pour pouvoir les afficher plus bas.
  // recommence à chaque fois qu'il y a un changement dans queueItems pour s'afficher quand on a bien récupéré la réponse du back
  useEffect(() => {
   getQueue();
   getNowPlaying();   
  }, [queueItems]);  


  // on refresh : vider database, refaire l'appel API spotify et réenregistrer.
  // pour l'instant problème avec la queue, il faut refresh 2 fois pour qu'elle soit a jour
  // pour tester invité, besoin d'ouvrir les deux à la fois sur deux téléphones et voir ce qu'il se passe
  // quand le dj modifie la playlist
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      if(user.isDj){
        await fetch(`${backendUrl}/queue/queueitems/${user.partyName}`,  { method: 'DELETE' });
        await fetch(`${backendUrl}/queue/nowplaying/${user.partyName}`,  { method: 'DELETE' });
        await getAllSongs();
        await updateDatabase();
      }
    } catch (error) {
      console.error(error);
    }
    console.log("queue", queueItems)
    setRefreshing(false);
  }, []);
  
  return (
    <ImageBackground source={require('../assets/bg-screens.jpg')} style={styles.background}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.party}>
      <Text style={styles.title}>{user.partyName}</Text>
      </View>
      <View style={styles.contentdivider}>
      <View style={styles.divider1}></View>
      </View>
      {nowPlaying &&  <View style={styles.playnow}>
  <ListItem
    containerStyle={{
      backgroundColor:"#F9F9FC", 
      borderRadius: 20,
      borderColor: '#F3558E',
      borderWidth: 2,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,
      elevation: 6,
    }}>
    <Avatar source={{uri: nowPlaying.url_image}} />
    <ListItem.Content style={styles.playnowcontent}>
      <ListItem.Title style={styles.playnowtitle}>{nowPlaying.title}</ListItem.Title>
      <ListItem.Subtitle style={styles.playnowsubtitle}>{nowPlaying.artist}</ListItem.Subtitle>
    </ListItem.Content>
    <FontAwesome name='headphones' size={40} color='#581B98'/>
    </ListItem>
    </View>}

      <View style={styles.contentdivider}>
      <View style={styles.divider2}></View>
      </View>
      <ScrollView style={styles.scroll} refreshControl={
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  }>
      {queueItems && <View style={styles.list}>{
            queueItems.map((l, i) => (
            <ListItem key={i} bottomDivider style={styles.listitem}>
                <Avatar source={{uri: l.url_image}} />
                <ListItem.Content style={styles.listcontent}>
                <ListItem.Title style={styles.listtitle}>{l.title}</ListItem.Title>
                <ListItem.Subtitle style={styles.listsubtitle}>{l.artist}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
            ))
          }
        </View>}
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
      // paddingTop: 110,
      // borderRadius: 1,
    },
    title: {
      fontSize: 32,
      fontWeight: '600',
      marginBottom: 20,
      color: '#581B98',
    },
    playnow: {
      height: '20%',
      // backgroundColor: 'red',
      // marginBottom: 50,
      // marginTop: 50,
      justifyContent: 'center',
      paddingLeft: 10,
      paddingRight: 10,
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
    playnowtitle:{
      color: '#1A1C1E',
      fontSize: 16,
      fontWeight: '500',
    },
    listtitle: {
      color: '#1A1C1E',
      fontSize: 16,
      fontWeight: '400',
    },
    playnowsubtitle: {
      color: '#1A1C1E',
      fontSize: 14,
      fontWeight: '400',
      textTransform:'uppercase',
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
      heigh: '5%',
    },
    divider1:{
      borderBottomColor: '#F3558E',
      borderBottomWidth: 1,
      // marginBottom: 20,
      // marginTop: 20,      
      width: '70%',      
    },
    divider2:{
      borderBottomColor: '#F3558E',
      borderBottomWidth: 1,
      marginBottom: 20,
      // marginTop: 10,     
      width: '70%',      
    },
  },
);
