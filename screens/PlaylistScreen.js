import React, { useState } from 'react';
import { ListItem, Avatar } from 'react-native-elements'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
  } from 'react-native';


export default function PlaylistScreen() {
    
    const list = [
        {
          name: 'Amy Farha',
          avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
          subtitle: 'Vice President'
        },
        {
          name: 'Chris Jackson',
          avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
          subtitle: 'Vice Chairman'
        },
      ]
    
  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
    <View style={styles.list}>{
        list.map((l, i) => (
        <ListItem key={i} bottomDivider>
            <Avatar source={{uri: l.avatar_url}} />
            <ListItem.Content style={styles.listcontent}>
            <ListItem.Title style={styles.listtitle}>{l.name}</ListItem.Title>
            <ListItem.Subtitle style={styles.listsubtitle}>{l.subtitle}</ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
        ))
    }
    </View>

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'blue',
    },
    list: {
      
    },
    listcontent: {

    },
    listtitle: {
      color: 'red',
    },
    listsubtitle: {
      color: 'green',
    }
  
  },
);
