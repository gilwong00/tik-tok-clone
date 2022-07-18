import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import { COLORS } from '../../constants';
import { SafeContainer } from '../SafeContainer';
import { TouchableOpacity } from 'react-native-gesture-handler';

type Props = {
  user: any;
};

const ProfileHeader: React.FC<Props> = ({ user }) => {
  return (
    <SafeContainer>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => {}}>
          <Ionicons name='search' size={24} color={COLORS.BLACK} />
        </TouchableOpacity>
        <Text style={styles.profileName}>test user</Text>
        <TouchableOpacity onPress={() => {}}>
          <Ionicons name='menu' size={24} color={COLORS.BLACK} />
        </TouchableOpacity>
      </View>
    </SafeContainer>
  );
};

export default ProfileHeader;
