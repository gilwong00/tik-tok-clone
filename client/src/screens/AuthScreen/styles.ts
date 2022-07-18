import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: COLORS.WHITE
  },
  headerText: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    color: COLORS.BLACK,
    marginBottom: 25
  },
  formContainer: {
    padding: 5
  },
  textInput: {
    borderColor: 'lightgray',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    paddingVertical: 10,
    marginBottom: 30
  },
  authBtn: {
    backgroundColor: 'red',
    borderColor: 'lightgray',
    borderStyle: 'solid',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 10
  },
  authBtnText: {
    color: COLORS.WHITE,
    fontWeight: 'bold'
  }
});
