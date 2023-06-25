import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  ActivityIndicator
} from 'react-native';
import { User } from '../../@types';
import { SafeContainer } from '../../components';
import { useDebounce, useSearchUsers } from '../../hooks';
import { styles } from './styles';

const DiscoverScreen: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const debouncedSearch = useDebounce(searchTerm, 500);
  const { data, isLoading } = useSearchUsers({
    query: debouncedSearch
  });

  const handleSearchTermChange = useCallback((term: string) => {
    setSearchTerm(term.toLowerCase());
  }, []);

  const renderItem = ({ item }: { item: User }) => {
    return (
      <View style={styles.searchItemContainer}>
        <Text style={styles.text}>{item.email}</Text>
        {item.avatarUri.length > 0 && (
          <Image style={styles.image} source={{ uri: item.avatarUri }} />
        )}
      </View>
    );
  };

  return (
    <SafeContainer>
      <TextInput
        style={styles.searchInput}
        onChangeText={handleSearchTermChange}
        value={searchTerm}
        placeholder='Search'
      />
      {isLoading && searchTerm.length >= 2 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size='large' />
        </View>
      ) : (
        <FlatList
          data={data ?? []}
          renderItem={renderItem}
          keyExtractor={item => item.email}
        />
      )}
    </SafeContainer>
  );
};

export default DiscoverScreen;
