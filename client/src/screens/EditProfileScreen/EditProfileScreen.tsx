import React, { useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { EditField, ProfileHeader, SafeContainer } from '../../components';
import { COLORS } from '../../constants';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import { ScreenNames } from '../../@types';
import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker';

// change this to a edit user form
interface EditForm {
  title: string;
  field: string;
  currentValue: string;
}

const EditProfileScreen = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editForm, setEditForm] = useState<EditForm>({
    title: '',
    field: '',
    currentValue: ''
  });
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

  const handleEditFieldSelect = useCallback(
    (field: string, currentValue: string) => {
      setEditForm({
        title: field,
        field,
        currentValue
      });
      setIsEditing(true);
    },
    []
  );

  const handleSave = useCallback(() => {
    if (isEditing) {
      // do something to save individual field change
    }

    // do something else
  }, [isEditing]);

  return (
    <SafeContainer>
      <ProfileHeader
        title={editForm.title || 'Some other value'}
        leftIcon='arrow-back'
        rightIcon='save'
        handleLeftIconPress={handleReturnToProfile}
        handleRightIconPress={handleSave}
      />

      {isEditing ? (
        <EditField {...editForm} handleUpdate={handleEditFieldSelect} />
      ) : (
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
          <View style={styles.fieldContainer}>
            <TouchableOpacity
              style={styles.itemRow}
              onPress={() => handleEditFieldSelect('Display Name', 'value')}
            >
              <Text>Display Name</Text>
              <View style={styles.itemRow}>
                <Text style={styles.value}>Value</Text>
                <Ionicons name='arrow-forward' size={20} color={COLORS.BLACK} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeContainer>
  );
};

export default EditProfileScreen;
