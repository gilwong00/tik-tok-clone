import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Keyboard
} from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { SafeContainer } from '../../components';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './style';
import { useCreatePost } from '../../hooks';
import { useUserStore } from '../../store';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

type Props = {
  route: RouteProp<
    { params: { mediaUri: string; thumbnail: string } },
    'params'
  >;
};

const SavePostScreen: React.FC<Props> = ({ route }) => {
  const { user } = useUserStore();
  const [description, setDescription] = useState<string>('');
  const { goBack } = useNavigation();

  const { mutateAsync: createPost } = useCreatePost({
    config: {
      onSuccess: () => {
        handleGoBack();
      },
      onError: err => {
        console.log('[CreatePost] err', JSON.stringify(err));
      }
    }
  });

  const handleGoBack = useCallback(() => goBack(), []);

  const handleTextChange = useCallback(
    (text: string) => setDescription(text),
    []
  );

  const handleCreatePost = useCallback(async () => {
    if (description.length && user?.id?.length) {
      await createPost({
        variables: {
          userId: user.id,
          uri: route.params.mediaUri,
          thumbnailUri: route.params.thumbnail,
          description
        }
      });
    }
  }, [createPost, description]);

  return (
    <SafeContainer>
      <View style={styles.container}>
        <TouchableWithoutFeedback
          style={styles.pageHeight}
          onPress={Keyboard.dismiss}
          accessible={false}
        >
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
        </TouchableWithoutFeedback>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.cancelBtn} onPress={handleGoBack}>
            <Ionicons name='close' size={24} color='#000' />
            <Text style={styles.btnText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.postBtn} onPress={handleCreatePost}>
            <Ionicons name='cloud-upload' size={24} color='#FFF' />
            <Text style={[styles.btnText, styles.postBtnText]}>Post</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeContainer>
  );
};

export default SavePostScreen;
