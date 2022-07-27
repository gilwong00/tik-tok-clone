import React, { useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, TouchableOpacity, Image } from 'react-native';
import { ProfileHeader, SafeContainer } from '../../components';
import { COLORS } from '../../constants';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import { ScreenNames } from '../../@types';
import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker';

const EditProfileScreen = () => {
  const navigation = useNavigation();

  const handleReturnToProfile = useCallback(
    () => navigation.navigate(ScreenNames.PROFILE as never),
    []
  );

  const chooseNewImage = async () => {
    const result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    });

    if (!result.cancelled) {
      // save as new avatarUri
      // update userState
    }
  };
  return (
    <SafeContainer>
      <ProfileHeader
        title='tesr'
        leftIcon='arrow-back'
        rightIcon='save'
        handleLeftIconPress={handleReturnToProfile}
        handleRightIconPress={() => {}}
      />
      <View style={styles.container}>
        <View style={styles.profileImageSection}>
          <TouchableOpacity
            style={styles.imageContainer}
            onPress={chooseNewImage}
          >
            <Image
              style={styles.image}
              source={{
                uri: 'https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg'
              }}
            />
            <View style={styles.imageOverlay} />
            <Ionicons name='camera-outline' size={24} color={COLORS.WHITE} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeContainer>
  );
};

export default EditProfileScreen;
