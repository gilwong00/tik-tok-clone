import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { useGetFeed } from '../../hooks/useGetFeed';

const FeedScreen = () => {
  const [cursor, setCursor] = useState<number | undefined>(undefined);
  const { data, isLoading } = useGetFeed({
    limit: 10,
    cursor
  });
  return (
    <View>
      <Text>FeedScreen</Text>
    </View>
  );
};

export default FeedScreen;
