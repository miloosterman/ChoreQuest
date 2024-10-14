import { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import Input from '@/components/Input';
export default function App() {
  const [text, setText] = useState<string>("");
  const [checklist, setChecklist] = useState<string[]>([]);

  const submitHandler = () => {
    if (text.trim()) {
      setChecklist([...checklist, text]);
      setText("");
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Input value={text} placeholder="Insert New Chore" onChangeText={setText} onSubmit={submitHandler} />
      </View>
      <View style={styles.section}>
        <FlatList
          data={checklist}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Text style={styles.checklistItem}>{item}</Text>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 32,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checklistItem: {
    padding: 10,
    fontSize: 18,
    margin: 10,
    textAlign: 'center',
    backgroundColor: '#FFD700',

  }
});
