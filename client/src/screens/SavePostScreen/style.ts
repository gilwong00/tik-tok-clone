import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#fff'
  },
  form: {
    padding: 20,
    flexDirection: 'row'
  },
  descriptionInput: {
    flex: 1,
    paddingVertical: 10,
    marginRight: 20
  },
  preview: {
    aspectRatio: 9 / 16,
    backgroundColor: '#000',
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
    borderColor: 'lightgray',
    borderWidth: 1,
    padding: 10,
    justifyContent: 'center',
    borderRadius: 4,
    marginHorizontal: 10
  },
  btnText: {
    fontWeight: '700',
    color: '#000',
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
    backgroundColor: '#ff4040'
  },
  postBtnText: {
    color: '#FFF'
  }
});
