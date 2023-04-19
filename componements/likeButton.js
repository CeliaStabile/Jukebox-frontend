import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';


const LikeButton = (props) => {
  const [count, setCount] = useState(0);
  const user = useSelector((state) => state.user.value);


  const handleLike = (l) => {
    if (!liked && !user.isDj) {
      setLiked(true);
      setCount(props.likeCount);
      props.onPress(l);
    }
  };

  return (
    
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 5, }}>
        <Text style={{ marginRight: 8, }}>{props.likeCount}</Text>
        {props.isLiked ? (
          <Icon name="heart" size={24} color="#F3558E" />
        ) : (
          <Icon name="heart-outline" size={24} color="black" />
        )}
      </View>
   
  );
};

export default LikeButton;