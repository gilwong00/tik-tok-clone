import { Dimensions, StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: Dimensions.get('screen').width,
    height: 60,
    padding: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: COLORS.LIGHT_GRAY,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: COLORS.LIGHT_GRAY
  },
  bannerText: {
    textAlign: 'center'
  },
  cta: {
    color: 'red'
  }
});
