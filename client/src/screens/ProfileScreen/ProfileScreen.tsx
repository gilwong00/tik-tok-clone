import React from 'react';
import { View, Text } from 'react-native';
import { Posts, ProfileHeader, ProfileSection } from '../../components';
import { useUserPosts } from '../../hooks';
import { useUserStore } from '../../store';
import { styles } from './styles';

const ProfileScreen = () => {
  const { user } = useUserStore();
  const { data, isLoading, refetch } = useUserPosts({
    userId: user?.id ?? null
  });

  const userName = `${user?.firstName} ${user?.lastName}`;

  if (isLoading) return <Text>Loading....</Text>;

  return (
    <View style={styles.container}>
      <ProfileHeader
        title={userName}
        leftIcon='search'
        rightIcon='menu'
        handleLeftIconPress={() => {}}
        handleRightIconPress={() => {}}
      />
      <View style={styles.sectionContainer}>
        <ProfileSection name={userName} />
        {Array.isArray(data) && (
          <Posts posts={data} handleRefresh={refetch} loading={isLoading} />
        )}
      </View>
    </View>
  );
};

export default ProfileScreen;
