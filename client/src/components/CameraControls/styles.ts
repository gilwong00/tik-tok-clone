import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

export const styles = StyleSheet.create({
  cameraOptionsContainer: {
    position: 'absolute',
    top: 60,
    right: 0,
    marginHorizontal: 20
  },
  cameraBtnText: {
    color: COLORS.WHITE,
    fontSize: 12,
    textAlign: 'center'
  },
  cameraOptionBtn: {
    alignItems: 'center',
    marginBottom: 25
  }
});
