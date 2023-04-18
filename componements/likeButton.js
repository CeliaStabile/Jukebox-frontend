import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';


const LikeButton = (props) => {
  const [liked, setLiked] = useState(false);
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
    <TouchableOpacity onPress={() => handleLike(props.song)}>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 5, }}>
        <Text style={{ marginRight: 8, }}>{props.likeCount}</Text>
        {liked ? (
          <Icon name="heart" size={24} color="#F3558E" />
        ) : (
          <Icon name="heart-outline" size={24} color="black" />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default LikeButton;
