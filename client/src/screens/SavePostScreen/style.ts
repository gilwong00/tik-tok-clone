import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: COLORS.WHITE
  },
  pageHeight: {
    height: '100%'
  },
  form: {
    padding: 20,
    flexDirection: 'row',
    height: 200
  },
  descriptionInput: {
    flex: 1,
    paddingVertical: 10,
    marginRight: 20
  },
  preview: {
    aspectRatio: 9 / 16,
    backgroundColor: COLORS.BLACK,
    width: 60
  },
  btnContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    position: 'absolute',
    bottom: 20
  },
  cancelBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: COLORS.LIGHT_GRAY,
    borderWidth: 1,
    padding: 10,
    justifyContent: 'center',
    borderRadius: 4,
    marginHorizontal: 10
  },
  btnText: {
    fontWeight: '700',
    color: COLORS.BLACK,
    fontSize: 16,
    paddingLeft: 10
  },
  postBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
    borderRadius: 4,
    marginHorizontal: 10,
    backgroundColor: COLORS.CORAL_RED
  },
  postBtnText: {
    color: COLORS.WHITE
  }
});
