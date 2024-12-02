import { Button, Modal, Pressable, Text, TextInput, View, StyleSheet } from 'react-native';
import { useState } from 'react';
import Input from './Input';
import { addHero} from '../firebase/databaseService';
import { useSession } from '@/firebase/SessionProvider';

export default function NewQuestModal() {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [heroName, setHeroName] = useState<string>('');
  const { session } = useSession();

  const handleNewHero = async () => {
    if (!session) {
      console.log('User is not signed in');
      return
    }
    try {
      await addHero(heroName, session);
      setHeroName('');
      setModalVisible(false);
    } catch (error) {
      console.error('Error adding hero:', error);
    }
  };

  return (
    <View>
      <Button title="Add New Hero" onPress={() => setModalVisible(true)} />
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>Add a New Hero!</Text>
            <Input
              placeholder="Hero Name"
              onChangeText={(text) => setHeroName(text)}
              value={heroName}
            />
            <View style={styles.submitView}>
              <Button title="Add" onPress={handleNewHero} />
              <Button title="Cancel" color="#FF3333" onPress={() => setModalVisible(false)}/>
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
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
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
    backgroundColor: "#A4D55D",
    color: 'black',
  },
  cancelButton: {
    backgroundColor: "#FF3B70",
    color: 'black',
  },
  buttonText: {
    textAlign: 'center',
  },
});
