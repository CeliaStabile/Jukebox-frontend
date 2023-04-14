import React, { useState } from 'react';
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
  const user = useSelector((state) => state.user.value);
    
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

       const [input, setInput] = useState("");
       const [results, setResults] = useState([]);
       const [search, setSearch] = useState("");

       const updateSearch = (search) => {
        setSearch(search);
      };
      //  const [searchTimer, setSearchTimer] = useState(null);
   
      //  async function fetchData(text) {
      //      const res = await fetch(
      //          `https://demo.wp-api.org/wp-json/wp/v2/posts?_embed&search=${text}`,
      //      );
      //      res
      //          .json()
      //          .then((res) => {
      //              setResults(res);
      //          })
      //          .catch((err) => console.log(err));
      //  }
    
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
              onChangeText={updateSearch}
              
              // {(text) => {
              //       if (searchTimer) {
              //           clearTimeout(searchTimer);
              //       }
              //       setInput(text);
              //       setSearchTimer(
              //           setTimeout(() => {
              //               fetchData(text);
              //           }, 2000),
              //       );
              //   }}
               value={search}
            />
            <FlatList
                data={results}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.title.rendered}</Text>
                        <Text>{item.excerpt.rendered}</Text>
                    </View>
                )}
                keyExtractor={(item) => "" + item.id}
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
            list.map((l, i) => (
            <ListItem key={i} bottomDivider style={styles.listitem}>
                <Avatar source={{uri: l.avatar_url}} />
                <ListItem.Content style={styles.listcontent}>
                <ListItem.Title style={styles.listtitle}>{l.name}</ListItem.Title>
                <ListItem.Subtitle style={styles.listsubtitle}>{l.subtitle}</ListItem.Subtitle>
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
