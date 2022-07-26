import { Dimensions, StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: Dimensions.get('screen').height - 130
  },
  profileImageSection: {
    alignItems: 'center',
    marginTop: 20
  },
  imageContainer: {
    borderColor: COLORS.LIGHT_GRAY,
    height: 100,
    width: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  image: {
    height: 100,
    width: 100,
    position: 'absolute'
  },
  imageOverlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    ...StyleSheet.absoluteFillObject
  }
});
