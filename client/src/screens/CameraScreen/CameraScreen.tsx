import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import {
  Camera,
  CameraType,
  FlashMode,
  VideoCodec,
  // VideoCodec,
  VideoQuality
} from 'expo-camera';
import { Audio } from 'expo-av';
import {
  ImagePickerResult,
  launchImageLibraryAsync,
  MediaTypeOptions,
  requestMediaLibraryPermissionsAsync
} from 'expo-image-picker';
import { Asset, getAssetsAsync } from 'expo-media-library';
import { useIsFocused } from '@react-navigation/core';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from '../../@types';
import { CameraActions, CameraControls } from '../../components';
import { getThumbnailAsync } from 'expo-video-thumbnails';

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

  const redirectToSavePostScreen = useCallback(
    (uri: string, thumbnail: string) => {
      return navigation.navigate({
        name: ScreenNames.SAVE_POST,
        params: {
          mediaUri: uri,
          thumbnail
        }
      } as never);
    },
    []
  );

  const generateThumbnail = async (source: string): Promise<string> => {
    try {
      const { uri } = await getThumbnailAsync(
        source ?? 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        {
          time: 1000
        }
      );
      return uri;
    } catch (e) {
      console.warn(e);
      return '';
    }
  };

  const recordVideo = useCallback(async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.recordAsync({
          maxDuration: 60,
          quality: VideoQuality['480p'],
          codec: VideoCodec.H264
        });
        const thumbnail = await generateThumbnail(data.uri);
        return redirectToSavePostScreen(data.uri, thumbnail);
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

    if (!results.canceled) {
      const thumbnail = await generateThumbnail(results.assets[0].uri);
      redirectToSavePostScreen(results.assets[0].uri, thumbnail);
    }
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
            <CameraControls
              cameraPosition={
                cameraPosition === CameraType.back
                  ? 'camera-reverse'
                  : 'camera-reverse-outline'
              }
              flashMode={flashMode === FlashMode.on ? 'flash' : 'flash-off'}
              toggleCameraPosition={toggleCameraPosition}
              toggleFlash={toggleFlash}
            />
            <CameraActions
              isCameraReady={isCameraReady}
              galleryItem={galleryItems[0] ?? null}
              recordVideo={recordVideo}
              stopRecording={stopRecording}
              selectAssetFromGallery={selectAssetFromGallery}
            />
          </Camera>
        )}
      </View>
    </View>
  );
};

export default CameraScreen;
