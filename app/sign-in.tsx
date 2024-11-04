import { router } from 'expo-router';
import { Button, Text, TextInput, View, StyleSheet, ImageBackground } from 'react-native';

import { useSession } from '../firebase/SessionProvider';
import { useRef, useState } from 'react';
import { Colors } from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function SignIn() {
  const { signIn, register } = useSession();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const image = require('../assets/images/signInBackground.jpeg');
  const passwordInputRef = useRef<TextInput>(null);

  const handleSignIn = () => {
    signIn(username, password);
  };
  const handleRegister = async () => {
      register(username, password);
  };

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.image} source={image} resizeMode="cover">
        <View style={styles.signInView}>
          <Text style={styles.title}>ChoreQuest</Text>
          <View style={styles.inputField}>
            <Ionicons name="person" size={24} color={Colors.light.icon} />
            <TextInput style={styles.textbox}
              defaultValue='Username'
              onChangeText={setUsername}
              clearTextOnFocus={true}
              returnKeyType="next"
              onSubmitEditing={() => passwordInputRef.current?.focus()}
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.inputField}>
            <Ionicons name="lock-closed" size={24} color={Colors.light.icon} />
            <TextInput
              ref={passwordInputRef}
              style={styles.textbox}
              defaultValue='Password'
              textContentType="password"
              onChangeText={setPassword}
              secureTextEntry={true}
              clearTextOnFocus={true}
              returnKeyType="go"
              onSubmitEditing={handleSignIn} />
          </View>
          <Button title='Sign In' onPress={handleSignIn}></Button>
          <Button title='Register' onPress={handleRegister} color="#2196F3" />
        </View>
      </ImageBackground>
    </View >
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Papyrus',
    fontSize: 32,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  signInView: {
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 50,
    backgroundColor: 'rgba(255, 171, 64, 0.9)',
    alignItems: 'center',
    borderRadius: 10,
  },
  inputField: {
    width: 200,
    padding: 5,
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
  },
  textbox: {
    width: '100%',
  }
})
