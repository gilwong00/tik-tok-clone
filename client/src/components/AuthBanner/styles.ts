import { Dimensions, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: Dimensions.get('screen').width,
    height: 60,
    padding: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'lightgray',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'lightgray'
  },
  bannerText: {
    textAlign: 'center'
  },
  cta: {
    color: 'red'
  }
});
