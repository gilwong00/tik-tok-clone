import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { SafeContainer } from '../../components';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './style';

type Props = {
  route: RouteProp<{ params: { mediaUri: string } }, 'params'>;
};

const SavePostScreen: React.FC<Props> = ({ route }) => {
  const [description, setDescription] = useState<string>('');
  const { goBack } = useNavigation();

  const handleGoBack = useCallback(() => goBack(), []);

  const handleTextChange = useCallback(
    (text: string) => setDescription(text),
    []
  );

  return (
    <SafeContainer>
      <View style={styles.container}>
        <View style={styles.form}>
          <TextInput
            style={styles.descriptionInput}
            multiline
            maxLength={200}
            placeholder='Describe your video'
            onChangeText={handleTextChange}
          />
          <Image
            style={styles.preview}
            source={{ uri: route.params.mediaUri }}
          />
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.cancelBtn} onPress={handleGoBack}>
            <Ionicons name='close' size={24} color='#000' />
            <Text style={styles.btnText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.postBtn} onPress={handleGoBack}>
            <Ionicons name='cloud-upload' size={24} color='#FFF' />
            <Text style={[styles.btnText, styles.postBtnText]}>Post</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeContainer>
  );
};

export default SavePostScreen;
