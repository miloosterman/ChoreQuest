import { createContext, useContext, PropsWithChildren, useEffect } from 'react';
import { Alert } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { useStorageState, setStorageItemAsync } from './useStorageState'; // Assume this is your custom hook

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBE4m1T7SY2wPsFQN7BcWfbt-gsOC5Vkas",
    authDomain: "chorequest-eaed6.firebaseapp.com",
    projectId: "chorequest-eaed6",
    storageBucket: "chorequest-eaed6.appspot.com",
    messagingSenderId: "126755794853",
    appId: "1:126755794853:web:0607b2438c9f5b2296424c",
    measurementId: "G-T6ZRJMFJZJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


// Create Auth Context
const AuthContext = createContext<{
    signIn: (email: string, password: string) => void;
    signOut: () => void;
    session?: string | null;
    isLoading: boolean;
  }>({
    signIn: async () => {},
    signOut: () => {},
    session: null,
    isLoading: false,
});

export function useSession() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useSession must be used within an AuthProvider');
    }
    return context;
}

export function SessionProvider({ children }: PropsWithChildren) {
    const [[isLoading, session], setSession] = useStorageState('session');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setSession(user.uid); // Store user ID or any relevant session info
            } else {
                setSession(null); // Clear session if user is signed out
            }
        });

        return () => unsubscribe(); // Clean up the subscription
    }, []);

    const signIn = async (email: string, password: string) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Store user ID in SecureStore
            await setStorageItemAsync('user_session', user.uid);
            setSession(user.uid); // Store user ID or any relevant session info
        } catch (error: any) {
            const errorCode = error.code;
            const errorMessage = error.message;
            Alert.alert(errorCode, errorMessage);
        }
    };

    const signOutUser = async () => {
        await setStorageItemAsync('user_session', null); // Clear user session
        setSession(null); // Clear session
        await signOut(auth); // Sign out from Firebase
    };

    return (
        <AuthContext.Provider value={{ signIn, signOut: signOutUser, session, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}
