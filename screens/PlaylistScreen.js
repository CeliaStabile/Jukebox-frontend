import React, { useEffect, useState } from 'react';
import { Card, Button, Icon, ListItem, Avatar } from 'react-native-elements'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Icon from 'react-native-vector-icons/FontAwesome';

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

  // if(user.isDj){
  //   useEffect(() => {
  //     fetch('https://api.spotify.com/v1/me/player/queue', {
  //       headers: {
  //         Authorization: 'Bearer ' + user.token,
  //       },
  //     })
  //       .then(response => response.json())
  //       .then(data => {
  //         console.log("résultat :", data)})
  //       //   const tracks = data.items.map(item => ({
  //       //     artistname: item.track.artists[0].name,
  //       //     songname: item.track.name,
  //       //     imageUrl: item.track.album.images[0].url,
  //       //     trackUri: item.track.uri,
  //       //   }));
  //       //   fetch('/your-backend-endpoint', {
  //       //     method: 'POST',
  //       //     headers: {
  //       //       'Content-Type': 'application/json',
  //       //     },
  //       //     body: JSON.stringify(tracks),
  //       //   })
  //       //     .then(response => response.json())
  //       //     .then(data => console.log(data))
  //       //     .catch(error => console.error(error));
  //       // })
  //       // .catch(error => console.error(error));
  //   }, []);
  // }

  if (user.isDj) {
    useEffect(() => {
      const intervalId = setInterval(() => {
        fetch('https://api.spotify.com/v1/me/player/queue', {
          headers: {
            Authorization: 'Bearer ' + user.token,
          },
        })
          .then(response => response.json())
          .then(data => {
            console.log(data.queue);
            const result = data.queue
        //     const tracks = result.map(item => ({
        //       title : item.name,
        //       artist : item.artist[0].name,
        //       url_image: item.album.images[2].url,
        //       uri: item.uri
        //     }))
        // console.log("queue :",tracks)
          })
          .catch(error => console.error(error));
      }, 10000); // 10 seconds in milliseconds
  
      return () => clearInterval(intervalId);
    }, []);
  }

    const list = [
        {
          name: 'Amy Farha',
          avatar_url: 'https://static.fnac-static.com/multimedia/FR/Images_Produits/FR/fnac.com/Visual_Principal_340/1/2/7/5099931916721/tsp20121221100041/Prestige.jpg',
          subtitle: 'Vice President'
        },
        {
          name: 'Chris Jackson',
          avatar_url: 'https://static.fnac-static.com/multimedia/FR/Images_Produits/FR/fnac.com/Visual_Principal_340/1/2/7/5099931916721/tsp20121221100041/Prestige.jpg',
          subtitle: 'Vice Chairman'
        },
        {
          name: 'Amy Farha',
          avatar_url: 'https://static.qobuz.com/images/covers/6b/ch/zn433rr1qch6b_600.jpg',
          subtitle: 'Vice President'
        },
        {
          name: 'Chris Jackson',
          avatar_url: 'https://static.fnac-static.com/multimedia/FR/Images_Produits/FR/fnac.com/Visual_Principal_340/1/2/7/5099931916721/tsp20121221100041/Prestige.jpg',
          subtitle: 'Vice Chairman'
        },
        {
          name: 'Amy Farha',
          avatar_url: 'https://static.qobuz.com/images/covers/6b/ch/zn433rr1qch6b_600.jpg',
          subtitle: 'Vice President'
        },
        {
          name: 'Chris Jackson',
          avatar_url: 'https://static.fnac-static.com/multimedia/FR/Images_Produits/FR/fnac.com/Visual_Principal_340/1/2/7/5099931916721/tsp20121221100041/Prestige.jpg',
          subtitle: 'Vice Chairman'
        },
        {
          name: 'Amy Farha',
          avatar_url: 'https://static.qobuz.com/images/covers/6b/ch/zn433rr1qch6b_600.jpg',
          subtitle: 'Vice President'
        },
        {
          name: 'Chris Jackson',
          avatar_url: 'https://static.fnac-static.com/multimedia/FR/Images_Produits/FR/fnac.com/Visual_Principal_340/1/2/7/5099931916721/tsp20121221100041/Prestige.jpg',
          subtitle: 'Vice Chairman'
        },
        {
          name: 'Amy Farha',
          avatar_url: 'https://static.qobuz.com/images/covers/6b/ch/zn433rr1qch6b_600.jpg',
          subtitle: 'Vice President'
        },
        {
          name: 'Chris Jackson',
          avatar_url: 'https://static.fnac-static.com/multimedia/FR/Images_Produits/FR/fnac.com/Visual_Principal_340/1/2/7/5099931916721/tsp20121221100041/Prestige.jpg',
          subtitle: 'Vice Chairman'
        },
        {
          name: 'Amy Farha',
          avatar_url: 'https://static.qobuz.com/images/covers/6b/ch/zn433rr1qch6b_600.jpg',
          subtitle: 'Vice President'
        },
        {
          name: 'Chris Jackson',
          avatar_url: 'https://static.fnac-static.com/multimedia/FR/Images_Produits/FR/fnac.com/Visual_Principal_340/1/2/7/5099931916721/tsp20121221100041/Prestige.jpg',
          subtitle: 'Vice Chairman'
        },
        {
          name: 'Amy Farha',
          avatar_url: 'https://static.qobuz.com/images/covers/6b/ch/zn433rr1qch6b_600.jpg',
          subtitle: 'Vice President'
        },
        {
          name: 'Chris Jackson',
          avatar_url: 'https://static.fnac-static.com/multimedia/FR/Images_Produits/FR/fnac.com/Visual_Principal_340/1/2/7/5099931916721/tsp20121221100041/Prestige.jpg',
          subtitle: 'Vice Chairman'
        },
      ]

      const users = [
        {
          name: 'Amy Farha',
          avatar_url: 'https://static.fnac-static.com/multimedia/FR/Images_Produits/FR/fnac.com/Visual_Principal_340/1/2/7/5099931916721/tsp20121221100041/Prestige.jpg',
          subtitle: 'Vice President'
        },
       ]

    
  return (
    <ImageBackground source={require('../assets/bg-screens.jpg')} style={styles.background}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.party}>
      <Text style={styles.title}>{user.partyName}</Text>
      </View>
      <View style={styles.contentdivider}>
      <View style={styles.divider1}></View>
      </View>
      <View style={styles.playnow}>{
            users.map((u, i) => (
            <ListItem key={i} 
            containerStyle={{              
              backgroundColor:"#F9F9FC", 
              borderRadius: 20,
              // height: "80%",
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
                <Avatar source={{uri: u.avatar_url}} />
                <ListItem.Content style={styles.playnowcontent}>
                <ListItem.Title style={styles.playnowtitle}>{u.name}</ListItem.Title>
                <ListItem.Subtitle style={styles.playnowsubtitle}>{u.subtitle}</ListItem.Subtitle>
                </ListItem.Content>
                <FontAwesome name='headphones' size={40} color='#581B98'/>
            </ListItem>
            ))
          }
      </View>
      <View style={styles.contentdivider}>
      <View style={styles.divider2}></View>
      </View>
      <ScrollView style={styles.scroll}>
        <View style={styles.list}>{
            list.map((l, i) => (
            <ListItem key={i} bottomDivider style={styles.listitem}>
                <Avatar source={{uri: l.avatar_url}} />
                <ListItem.Content style={styles.listcontent}>
                <ListItem.Title style={styles.listtitle}>{l.name}</ListItem.Title>
                <ListItem.Subtitle style={styles.listsubtitle}>{l.subtitle}</ListItem.Subtitle>
                </ListItem.Content>
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
