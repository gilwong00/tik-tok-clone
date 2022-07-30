import React from 'react';
import { View, Text } from 'react-native';
import { Posts, ProfileHeader, ProfileSection } from '../../components';
import { useUserPosts } from '../../hooks';
import { useUserStore } from '../../store';
import { styles } from './styles';

const ProfileScreen = () => {
  const { user } = useUserStore();
  const { data, loading, error, refetch } = useUserPosts({
    userId: user?.id ?? ''
  });

  if (loading) return <Text>Loading....</Text>;

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
        <Posts
          posts={data.userPosts}
          handleRefresh={refetch}
          loading={loading}
        />
      </View>
    </View>
  );
};

export default ProfileScreen;
