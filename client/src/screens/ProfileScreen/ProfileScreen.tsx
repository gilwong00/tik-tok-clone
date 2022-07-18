import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ProfileHeader, ProfileSection } from '../../components';
import { useUserStore } from '../../store';
import { styles } from './styles';

const ProfileScreen = () => {
  const { user } = useUserStore();

  return (
    <View style={styles.container}>
      <ProfileHeader user={user} />
      <ScrollView
        style={{
          height: Dimensions.get('screen').height - 280
        }}
      >
        <ProfileSection />
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
