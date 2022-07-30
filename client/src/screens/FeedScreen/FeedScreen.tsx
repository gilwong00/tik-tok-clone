import { useQuery } from '@apollo/client';
import React from 'react';
import { View, Text } from 'react-native';
import { GET_FEED } from '../../graphql';

const FeedScreen = () => {
  const { loading, error, data } = useQuery(GET_FEED);
  console.log('loading', loading);
  console.log('data', data);
  return (
    <View>
      <Text>FeedScreen</Text>
    </View>
  );
};

export default FeedScreen;
