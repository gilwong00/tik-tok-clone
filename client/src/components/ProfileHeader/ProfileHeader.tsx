import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import { COLORS } from '../../constants';
import { SafeContainer } from '../SafeContainer';
import { TouchableOpacity } from 'react-native-gesture-handler';

type Props = {
  leftIcon?: 'search' | 'arrow-back';
  rightIcon?: 'menu' | 'save';
  title: string;
  handleLeftIconPress: () => void;
  handleRightIconPress: () => void;
};

const ProfileHeader: React.FC<Props> = ({
  leftIcon,
  title,
  rightIcon,
  handleLeftIconPress,
  handleRightIconPress
}) => {
  return (
    <SafeContainer>
      <View style={styles.container}>
        {leftIcon?.length && (
          <TouchableOpacity onPress={handleLeftIconPress}>
            <Ionicons name={leftIcon} size={24} color={COLORS.BLACK} />
          </TouchableOpacity>
        )}

        <Text style={styles.profileName}>{title}</Text>
        {rightIcon?.length && (
          <TouchableOpacity onPress={handleRightIconPress}>
            <Ionicons name={rightIcon} size={24} color={COLORS.BLACK} />
          </TouchableOpacity>
        )}
      </View>
    </SafeContainer>
  );
};

export default ProfileHeader;
