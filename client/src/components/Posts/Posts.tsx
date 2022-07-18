import React from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { styles } from './styles';

type Props = {
  posts: Array<any>;
};

const Posts: React.FC<Props> = ({ posts }) => {
  const renderItem = ({ item }: { item: any }) => {
    return (
      <View style={styles.postItem}>
        <Image style={styles.image} source={{ uri: item.uri }} />
        <Text>{item.name}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        numColumns={3}
        removeClippedSubviews
        data={posts}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Posts;
