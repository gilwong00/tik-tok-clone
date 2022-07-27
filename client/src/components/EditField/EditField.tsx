import React, { useCallback } from 'react';
import { View, Text, TextInput } from 'react-native';
import { styles } from './styles';

type Props = {
  title: string;
  field: string;
  currentValue: string;
  handleUpdate: (field: string, newValue: string) => void;
};

const EditField: React.FC<Props> = ({ field, currentValue, handleUpdate }) => {
  const handleTextChange = useCallback((text: string) => {
    handleUpdate(field, text);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{field}</Text>
      <TextInput
        style={styles.textInput}
        value={currentValue}
        onChangeText={handleTextChange}
      />
    </View>
  );
};

export default EditField;
