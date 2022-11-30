import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, Image } from 'react-native';
import { useLazyQuery } from '@apollo/client';
import { User } from '../../@types';
import { SafeContainer } from '../../components';
import { styles } from './styles';
import { SEARCH_USERS } from '../../graphql';

const DiscoverScreen: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchUser, { loading, error, data }] = useLazyQuery(SEARCH_USERS);

  const renderItem = ({ item }: { item: User }) => {
    return (
      <View style={styles.searchItemContainer}>
        <Text style={styles.text}>{item.email}</Text>
        <Image style={styles.image} source={{ uri: item.avatarUri }} />
      </View>
    );
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (searchTerm.length > 2) timer = setTimeout(() => searchUser(), 500);
    return () => clearTimeout(timer);
  }, []);

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
