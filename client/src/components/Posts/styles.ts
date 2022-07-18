import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  postItem: {
    flex: 1 / 3,
    height: 200,
    backgroundColor: COLORS.LIGHT_GRAY
  },
  image: {
    flex: 1
  }
});
