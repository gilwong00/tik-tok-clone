import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

export const styles = StyleSheet.create({
  actionContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%'
  },
  mediaContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 30,
    alignItems: 'center',
    border: 'none',
    width: '100%'
  },
  recordBtnContainer: {
    width: 150,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  recordBtn: {
    borderWidth: 8,
    borderColor: COLORS.DARK_RED,
    backgroundColor: COLORS.CORAL_RED,
    borderRadius: 100,
    height: 80,
    width: 80
  },
  galleryContainer: {
    // width: 60,
    // display: 'flex',
    // alignItems: 'flex-end',
    // justifyContent: 'flex-end'
  },
  galleryBtn: {
    borderColor: COLORS.WHITE,
    borderWidth: 2,
    borderRadius: 10,
    overflow: 'hidden',
    width: 50,
    height: 50
  },
  galleryIcon: {
    width: 50,
    height: 50
  }
});
