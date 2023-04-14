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
  } from 'react-native';
  import { useSelector, useDispatch } from 'react-redux';


export default function PlaylistScreen() {
  const user = useSelector((state) => state.user.value);
  const [queueItems, setQueueItems] = useState([]);
  const [nowPlaying, setNowPlaying] = useState('')
  const backendUrl= "https://jukebox-backend.vercel.app"

  //déclaration de la fonction qui permet de fetcher la queue et now playing du DJ et de l'enregistrer en BDD
  async function getAllSongs() {
    await fetch(`https://api.spotify.com/v1/me/player/queue`, 
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.token,
      }
    })
    .then(response => response.json())
    .then(data => {
      const currPlayingFull= data.currently_playing
      const currentlyPlaying = {
        title: currPlayingFull.name,
        artist: currPlayingFull.artists[0].name,
        url_image: currPlayingFull.album.images[2].url,
        uri: currPlayingFull.uri,
      }
      const liste = data.queue;
      const items = liste.map(item => ({
        title: item.name,
        artist: item.artists[0].name,
        url_image: item.album.images[2].url,
        uri: item.uri,
      }));
    
      // envoyer la queue fetchée au backend pour copier dans BDD
      if (items.length > 0) {
        fetch(`${backendUrl}/queue/copyqueueitems/${user.partyName}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(items)
        })
        .then(response => response.json())
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.error(error);
        });
      } else {
        console.log("empty queue, nothing to send to database")
      }

    // envoyer nowplaying fetchée au backend pour copier dans BDD
      if (currentlyPlaying !== '') {
        fetch(`${backendUrl}/queue/copynowplaying/${user.partyName}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(currentlyPlaying)
        })
        .then(response => response.json())
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.error(error);
        });
      } else {
        console.log("empty nowplaying, nothing to send to database")
      }
    });
  }

  //si c'est le DJ qui arrive sur cet écran, on fetche avec son token pour récupérer tout.
  useEffect (() => {
    if(user.isDj){
      getAllSongs();
    }
  }, []);


  //pour tout le monde : récupérer la BDD dans les états du composants pour pouvoir les afficher plus bas
  //3 secondes d'attente pour être sur d'obtenir la réponse des fetchs
  useEffect(() => {
    setTimeout(() => {
      fetch(`${backendUrl}/queue/queueitems/${user.partyName}`)
        .then(response => response.json())
        .then(data => {
          setQueueItems(data.queueItems);
        });
      fetch(`${backendUrl}/queue/nowplaying/${user.partyName}`)
        .then(response => response.json())
        .then(data => {
          setNowPlaying(data.nowPlaying);
        });
    }, 3000);
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
      <ScrollView style={styles.scroll}>
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