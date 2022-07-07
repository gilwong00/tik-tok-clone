import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%'
  },
  camera: {
    flex: 1,
    padding: 0,
    backgroundColor: 'black'
    // aspectRatio: 9 / 16
  },
  actionContainer: {
    position: 'absolute',
    bottom: 30,
    flexDirection: 'row',
    width: '100%'
  },
  recordBtnContainer: {
    flex: 1,
    marginHorizontal: 30,
    alignItems: 'center'
  },
  recordBtn: {
    borderWidth: 8,
    borderColor: 'darkred',
    backgroundColor: '#ff4040',
    borderRadius: 100,
    height: 80,
    width: 80
  }
});
