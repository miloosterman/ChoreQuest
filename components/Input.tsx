import React from 'react';
import { SafeAreaView, TextInput, StyleSheet } from 'react-native';

type props = {
  value?: string;
  placeholder?: string;
  onChangeText: (text: string) => void;
  onSubmit?: () => void;
}
export default function Input({ value, placeholder, onChangeText, onSubmit }: props) {

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={"black"}
        onSubmitEditing={onSubmit}
      >
      </TextInput>
    </SafeAreaView >
  )
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
