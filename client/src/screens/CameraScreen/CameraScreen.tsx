import React, { useCallback, useEffect, useState } from 'react';
import { TouchableOpacity, View, Image, Text } from 'react-native';
import { Camera, CameraType, FlashMode, VideoQuality } from 'expo-camera';
import { Audio } from 'expo-av';
import {
  ImagePickerResult,
  launchImageLibraryAsync,
  MediaTypeOptions,
  requestMediaLibraryPermissionsAsync
} from 'expo-image-picker';
import { Asset, getAssetsAsync } from 'expo-media-library';
import { useIsFocused } from '@react-navigation/core';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from '../../@types';

const CameraScreen = () => {
  // Camera state
  const [cameraRef, setCameraRef] = useState<Camera | null>(null);
  const [cameraPosition, setCameraPosition] = useState<CameraType>(
    CameraType.back
  );
  const [flashMode, setFlashMode] = useState<FlashMode>(FlashMode.off);
  const [galleryItems, setGalleryItems] = useState<Array<Asset>>([]);
  const [isCameraReady, setIsCameraReady] = useState<boolean>(false);

  // Permission state
  const [hasCameraPermission, setHasCameraPermission] =
    useState<boolean>(false);
  const [hasAudioPermission, setHasAudioPermission] = useState<boolean>(false);
  const [hasGalleryPermission, setHasGalleryPermission] =
    useState<boolean>(false);

  const navigation = useNavigation();
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

  const redirectToSavePostScreen = useCallback((uri: string) => {
    navigation.navigate(
      ScreenNames.SAVE_POST as never,
      {
        mediaUri: uri
      } as never
    );
  }, []);

  const recordVideo = useCallback(async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.recordAsync({
          maxDuration: 60,
          quality: VideoQuality['480p']
        });
        return redirectToSavePostScreen(data.uri);
      } catch (err) {
        console.error(err);
      }
    }
  }, [cameraRef]);

  const stopRecording = useCallback(async () => {
    if (cameraRef) cameraRef.stopRecording();
  }, [cameraRef]);

  const selectAssetFromGallery = useCallback(async () => {
    const results: ImagePickerResult = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1 // smaller the number the lower the quality
    });

    if (!results.cancelled) redirectToSavePostScreen(results.uri);
  }, []);

  const toggleCameraPosition = useCallback(() => {
    setCameraPosition((prev: CameraType) =>
      prev === CameraType.back ? CameraType.front : CameraType.back
    );
  }, []);

  const toggleFlash = useCallback(() => {
    setFlashMode((prev: FlashMode) =>
      prev === FlashMode.off ? FlashMode.on : FlashMode.off
    );
  }, []);

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
            <View style={styles.cameraOptionsContainer}>
              <TouchableOpacity
                style={styles.cameraOptionBtn}
                onPress={toggleCameraPosition}
              >
                <Ionicons
                  name={
                    cameraPosition === CameraType.back
                      ? 'camera-reverse'
                      : 'camera-reverse-outline'
                  }
                  size={24}
                  color='white'
                />
                <Text style={styles.cameraBtnText}>Flip</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cameraOptionBtn}
                onPress={toggleFlash}
              >
                <Ionicons
                  name={flashMode === FlashMode.on ? 'flash' : 'flash-off'}
                  size={24}
                  color='white'
                />
                <Text style={styles.cameraBtnText}>Flash</Text>
              </TouchableOpacity>
            </View>
            {/* TODO move this to own component */}
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
                    {!!galleryItems[0] && (
                      <Image
                        style={styles.galleryIcon}
                        source={{
                          uri: galleryItems[0]?.uri ?? ''
                        }}
                      />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Camera>
        )}
      </View>
    </View>
  );
};

export default CameraScreen;
