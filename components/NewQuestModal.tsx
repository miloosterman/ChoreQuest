import { Button, Modal, Pressable, Text, View, StyleSheet } from 'react-native';
import { useState } from 'react';
import Input from './Input';
import { addQuest } from '../firebase/databaseService';
import { useSession } from '@/firebase/SessionProvider';

type NewQuestModalProps = {
  heroId: string;
};

export default function NewQuestModal({ heroId }: NewQuestModalProps) {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [questName, setQuestName] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [gold, setGold] = useState<string>('');
  const { session } = useSession();

  const handleAssignQuest = async () => {
    if (!session) {
      console.log('User is not signed in');
      return;
    }
    try {
      await addQuest(questName, parseInt(time), parseInt(gold), heroId, session);
      setQuestName('');
      setTime('');
      setGold('');
      setModalVisible(false);
    } catch (error) {
      console.error('Error adding quest:', error);
    }
  };

  return (
    <View>
      <Button title="Create New Quest" onPress={() => setModalVisible(true)} />
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>Create A New Quest!</Text>
            <Input
              placeholder="Quest Name"
              onChangeText={(text) => setQuestName(text)}
              value={questName}
            />
            <Input
              placeholder="Screentime Reward"
              onChangeText={(text) => setTime(text)}
              value={time}
            />
            <Input
              placeholder="Gold Reward"
              onChangeText={(text) => setGold(text)}
              value={gold}
            />
            <View style={styles.submitView}>
              <Button title="Assign Quest" onPress={() => handleAssignQuest()} />
              <Button title="Cancel" color="#FF3333" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  submitView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 10,
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#A4D55D',
    color: 'black',
  },
  cancelButton: {
    backgroundColor: '#FF3B70',
    color: 'black',
  },
  buttonText: {
    textAlign: 'center',
  },
});
