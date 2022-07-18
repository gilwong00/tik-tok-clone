import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: COLORS.LIGHT_GRAY,
    height: 60
  },
  profileName: {
    fontSize: 16,
    color: COLORS.BLACK,
    textAlign: 'center',
    fontWeight: '700'
  }
});
