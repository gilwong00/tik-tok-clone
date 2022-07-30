import { CommonActions, useNavigation } from '@react-navigation/native';
import { ScreenNames } from '../@types';

export const useScreenRedirect = () => {
  const { dispatch } = useNavigation();

  const redirectToScreen = (screenName: ScreenNames) => {
    return dispatch(
      CommonActions.reset({
        routes: [
          {
            name: screenName
          }
        ]
      })
    );
  };

  return { redirectToScreen };
};
