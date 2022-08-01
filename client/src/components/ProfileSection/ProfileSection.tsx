import React, { useCallback } from 'react';
import UserAvatar from 'react-native-user-avatar';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { COLORS } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from '../../@types';

type Props = {
  name: string;
};

const ProfileSection: React.FC<Props> = ({ name }) => {
  const navigation = useNavigation();

  const handleEditPress = useCallback(() => {
    navigation.navigate(ScreenNames.EDIT_PROFILE as never);
  }, []);
  return (
    <View style={styles.container}>
      <UserAvatar
        size={60}
        name={name}
        bgColors={[...Object.values(COLORS)]}
        style={styles.avatar}
      />
      <Text style={styles.email}>test@email.com</Text>
      <View style={styles.userStats}>
        <View style={styles.statColumn}>
          <Text style={styles.statAmount}>10</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
        <View style={styles.statColumn}>
          <Text style={styles.statAmount}>1</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
        <View style={styles.statColumn}>
          <Text style={styles.statAmount}>5</Text>
          <Text style={styles.statLabel}>Likes</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.editProfileBtn} onPress={handleEditPress}>
        <Text>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileSection;
