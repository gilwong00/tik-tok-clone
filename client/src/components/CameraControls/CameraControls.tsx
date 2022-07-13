import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';

type Props = {
  cameraPosition: 'camera-reverse' | 'camera-reverse-outline';
  flashMode: 'flash' | 'flash-off';
  toggleCameraPosition: () => void;
  toggleFlash: () => void;
};

const CameraControls: React.FC<Props> = ({
  cameraPosition,
  flashMode,
  toggleCameraPosition,
  toggleFlash
}) => {
  return (
    <View style={styles.cameraOptionsContainer}>
      <TouchableOpacity
        style={styles.cameraOptionBtn}
        onPress={toggleCameraPosition}
      >
        <Ionicons name={cameraPosition} size={24} color='white' />
        <Text style={styles.cameraBtnText}>Flip</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cameraOptionBtn} onPress={toggleFlash}>
        <Ionicons name={flashMode} size={24} color='white' />
        <Text style={styles.cameraBtnText}>Flash</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CameraControls;
