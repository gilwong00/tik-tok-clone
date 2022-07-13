import { Asset } from 'expo-media-library';
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { styles } from './styles';

type Props = {
  isCameraReady: boolean;
  galleryItem: Asset | null;
  recordVideo: () => void;
  stopRecording: () => void;
  selectAssetFromGallery: () => void;
};

const CameraActions: React.FC<Props> = ({
  isCameraReady,
  galleryItem,
  recordVideo,
  stopRecording,
  selectAssetFromGallery
}) => {
  return (
    <View style={styles.actionContainer}>
      <View style={styles.mediaContainer}>
        <View style={styles.recordBtnContainer}>
          <TouchableOpacity
            style={styles.recordBtn}
            disabled={!isCameraReady}
            onLongPress={recordVideo}
            onPressOut={stopRecording}
          />
        </View>
        <View style={styles.galleryContainer}>
          <TouchableOpacity
            style={styles.galleryBtn}
            onPress={selectAssetFromGallery}
          >
            {!!galleryItem && (
              <Image
                style={styles.galleryIcon}
                source={{
                  uri: galleryItem?.uri ?? ''
                }}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CameraActions;
