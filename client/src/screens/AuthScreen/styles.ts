import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#fff'
  },
  headerText: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    color: '#000',
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
    color: '#fff',
    fontWeight: 'bold'
  }
});
