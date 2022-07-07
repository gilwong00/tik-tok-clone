import React, { useCallback, useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Camera, CameraType, FlashMode, VideoQuality } from 'expo-camera';
import { Audio } from 'expo-av';
import { requestMediaLibraryPermissionsAsync } from 'expo-image-picker';
import { getAssetsAsync } from 'expo-media-library';
import { useIsFocused } from '@react-navigation/core';
import { styles } from './styles';

const CameraScreen = () => {
  // Camera state
  const [cameraRef, setCameraRef] = useState<Camera | null>(null);
  const [cameraPosition, setCameraPosition] = useState<CameraType>(
    CameraType.back
  );
  const [flashMode, setFlashMode] = useState<FlashMode>(FlashMode.off);
  const [galleryItems, setGalleryItems] = useState<Array<unknown>>([]);
  const [isCameraReady, setIsCameraReady] = useState<boolean>(false);

  // Permission state
  const [hasCameraPermission, setHasCameraPermission] =
    useState<boolean>(false);
  const [hasAudioPermission, setHasAudioPermission] = useState<boolean>(false);
  const [hasGalleryPermission, setHasGalleryPermission] =
    useState<boolean>(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    const checkForCameraPermission = async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const audioPermission = await Audio.requestPermissionsAsync();
      const galleryPermission = await requestMediaLibraryPermissionsAsync();

      setHasCameraPermission(cameraPermission.granted);
      setHasAudioPermission(audioPermission.granted);
      setHasGalleryPermission(galleryPermission.granted);

      if (galleryPermission.granted) {
        const mediaGallery = await getAssetsAsync({
          sortBy: ['creationTime'],
          mediaType: ['video']
        });
        setGalleryItems(mediaGallery.assets);
      }
    };
    checkForCameraPermission();
  }, []);

  const recordVideo = useCallback(async () => {
    if (cameraRef) {
      try {
        await cameraRef.recordAsync({
          maxDuration: 60,
          quality: VideoQuality['480p']
        });
      } catch (err) {
        console.error(err);
      }
    }
  }, [cameraRef]);

  const stopRecording = useCallback(async () => {
    if (cameraRef) cameraRef.stopRecording();
  }, [cameraRef]);

  if (!hasCameraPermission || !hasAudioPermission || !hasGalleryPermission)
    // update this view
    return <View></View>;

  return (
    <View style={styles.container}>
      <View style={styles.camera}>
        {isFocused && (
          <Camera
            style={styles.camera}
            ref={ref => setCameraRef(ref)}
            ratio='16:9'
            type={cameraPosition}
            flashMode={flashMode}
            onCameraReady={() => setIsCameraReady(true)}
          >
            <View style={styles.actionContainer}>
              <View style={styles.recordBtnContainer}>
                <TouchableOpacity
                  style={styles.recordBtn}
                  disabled={!isCameraReady}
                  onLongPress={recordVideo}
                  onPressOut={stopRecording}
                />
              </View>
            </View>
          </Camera>
        )}
      </View>
    </View>
  );
};

export default CameraScreen;
