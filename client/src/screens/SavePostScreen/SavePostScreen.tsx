import { View, Text } from 'react-native';
import React from 'react';

type Props = {
  mediaUrl: string;
};

const SavePostScreen: React.FC<Props> = ({ mediaUrl }) => {
  return (
    <View>
      <Text>SavePost</Text>
    </View>
  );
};

export default SavePostScreen;
