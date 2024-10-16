import { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import Input from '@/components/Input';
import Header from '@/components/Header';
import ChecklistItem from '@/components/ChecklistItem';

type ChecklistItemType = {
  id: string;
  text: string;
  isChecked: boolean;
};

export default function App() {
  const [text, setText] = useState<string>("");
  const [checklist, setChecklist] = useState<ChecklistItemType[]>([]);

  const submitHandler = () => {
    if (text.trim()) {
      setChecklist([...checklist, {id: Date.now().toString(), text, isChecked: false}]);
      setText("");
    }
  };

  const toggleCheck = (id: string) => {
    setChecklist(checklist.map(item => 
      item.id === id ? { ...item, isChecked: !item.isChecked} : item
    ));
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.section}>
        <Input value={text} placeholder="Insert New Chore" onChangeText={setText} onSubmit={submitHandler} />
      </View>
      <View style={styles.section}>
        <FlatList
          data={checklist}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ChecklistItem item={item.text} isChecked={item.isChecked} setIsChecked={() => toggleCheck(item.id)} />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
