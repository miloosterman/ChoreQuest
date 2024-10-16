import { Pressable, Text, StyleSheet } from 'react-native';
import { Checkbox } from 'expo-checkbox';

type props = {
  item: string;
  isChecked: boolean;
  setIsChecked: (isChecked: boolean) => void;
}

export default function ChecklistItem({ item, isChecked, setIsChecked }: props) {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? '#FF4500' : '#FFD700',
        },
        styles.checklistItem
      ]}>
      <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setIsChecked} />
      <Text>{item}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    borderColor: '#D1D1D1',
    marginBottom: 10,
  },
  checkbox: {
    marginRight: 10,
  }
});