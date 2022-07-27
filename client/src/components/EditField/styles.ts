import { Dimensions, StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

export const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('screen').height - 140,
    padding: 20
  },
  title: {
    fontWeight: 'bold',
    color: COLORS.BLACK
  },
  textInput: {
    borderColor: COLORS.LIGHT_GRAY,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    paddingVertical: 5
  }
});
