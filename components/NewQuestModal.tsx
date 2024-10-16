import { Button, Modal, Pressable, Text, View, StyleSheet } from 'react-native';
import { useState } from 'react';
import Input from './Input';

export default function NewQuestModal() {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <View>
      <Pressable style={[styles.button, styles.submitButton]} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Create New Quest</Text>
      </Pressable>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>Create A New Quest!</Text>
            <Input placeholder="Quest Name" onChangeText={() => { }} />
            <View style={styles.submitView}>
              <Pressable style={[styles.button, styles.submitButton]} onPress={() => setModalVisible(!modalVisible)}>
                <Text >Assign Quest</Text>
              </Pressable>
              <Pressable style={[styles.button, styles.cancelButton]} onPress={() => setModalVisible(!modalVisible)}>
                <Text>Cancel</Text>
              </Pressable>
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
      height: 2
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