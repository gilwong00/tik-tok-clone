import React from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { Post } from '../../@types';
import { styles } from './styles';

type Props = {
  posts: Array<Post>;
  loading: boolean;
  handleRefresh: () => void;
};

const Posts: React.FC<Props> = ({ posts, loading, handleRefresh }) => {
  const renderItem = ({ item }: { item: Post }) => {
    console.log('item', item);
    return (
      <View style={styles.postItem}>
        <Image style={styles.image} source={{ uri: item.thumbnailUri }} />
        <Text>{item.description}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        onRefresh={handleRefresh}
        refreshing={loading}
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
