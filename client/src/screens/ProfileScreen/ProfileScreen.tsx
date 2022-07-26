import React from 'react';
import { View } from 'react-native';
import { Posts, ProfileHeader, ProfileSection } from '../../components';
import { useUserStore } from '../../store';
import { styles } from './styles';

const ProfileScreen = () => {
  const { user } = useUserStore();

  return (
    <View style={styles.container}>
      <ProfileHeader
        title={'Joe Dow'}
        leftIcon='search'
        rightIcon='menu'
        handleLeftIconPress={() => {}}
        handleRightIconPress={() => {}}
      />
      <View style={styles.sectionContainer}>
        <ProfileSection />
        <Posts posts={[]} />
      </View>
    </View>
  );
};

export default ProfileScreen;
