import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.LIGHT_GRAY
  },
  avatar: {
    width: 60,
    marginTop: 10
  },
  email: {
    padding: 10,
    textAlign: 'center'
  },
  userStats: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 10
  },
  statColumn: {
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1
  },
  statLabel: {
    fontSize: 14,
    fontWeight: '200',
    paddingTop: 5
  },
  statAmount: {
    fontSize: 16,
    fontWeight: '700'
  },
  editProfileBtn: {
    borderColor: COLORS.LIGHT_GRAY,
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginTop: 10
  }
});
