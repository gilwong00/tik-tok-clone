import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Image } from 'react-native';
import { User } from '../../@types';
import { SafeContainer } from '../../components';
import { useSearchUsers } from '../../hooks';
import { styles } from './styles';

const DiscoverScreen: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { data, isLoading } = useSearchUsers({
    query: searchTerm
  });

  const renderItem = ({ item }: { item: User }) => {
    return (
      <View style={styles.searchItemContainer}>
        <Text style={styles.text}>{item.email}</Text>
        <Image style={styles.image} source={{ uri: item.avatarUri }} />
      </View>
    );
  };
  console.log({ data, isLoading });
  return (
    <SafeContainer>
      <TextInput
        style={styles.searchInput}
        onChangeText={setSearchTerm}
        value={searchTerm}
        placeholder='Search'
      />
      <FlatList
        data={[]}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeContainer>
  );
};

export default DiscoverScreen;
