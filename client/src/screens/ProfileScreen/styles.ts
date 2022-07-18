import { Dimensions, StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    height: '100%'
  },
  sectionContainer: {
    height: Dimensions.get('screen').height - 220
  }
});
