import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    paddingTop: 30,
    height: '100%'
  },
  searchInput: {
    backgroundColor: COLORS.LIGHT_GRAY,
    padding: 10,
    margin: 10,
    borderRadius: 4
  },
  searchItemContainer: {
    flex: 1,
    padding: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  image: {
    backgroundColor: 'gray',
    height: 40,
    width: 40,
    borderRadius: 20
  },
  text: {},
  loadingContainer: {
    marginTop: 10
  }
});
