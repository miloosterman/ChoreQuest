// SessionProvider.tsx
import { createContext, useContext, PropsWithChildren, useEffect } from 'react';
import { Alert } from 'react-native';
import { useStorageState, setStorageItemAsync } from './useStorageState';
import { router } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { signIn, register, signOutUser } from './authService';

const AuthContext = createContext<{
    signIn: (email: string, password: string) => void;
    signOut: () => void;
    register: (email: string, password: string) => void;
    session?: string | null;
    isLoading: boolean;
}>({
    signIn: async () => { },
    signOut: () => { },
    register: async () => { },
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
            setSession(user ? user.uid : null);
        });

        return () => unsubscribe();
    }, []);

    const handleSignIn = async (email: string, password: string) => {
        try {
            const userCredential = await signIn(email, password);
            await setStorageItemAsync('user_session', userCredential.user.uid);
            setSession(userCredential.user.uid);
            router.replace('/(tabs)');
        } catch (error: any) {
            Alert.alert('Login Error', error.message);
        }
    };

    const handleRegister = async (email: string, password: string) => {
        try {
            const userCredential = await register(email, password);
            await setStorageItemAsync('user_session', userCredential.user.uid);
            setSession(userCredential.user.uid);
            router.replace('/(tabs)');
            Alert.alert('Registration successful!');
        } catch (error: any) {
            Alert.alert('Registration Error', error.message);
        }
    };

    const handleSignOut = async () => {
        await setStorageItemAsync('user_session', null);
        setSession(null);
        await signOutUser();
    };

    return (
        <AuthContext.Provider value={{ signIn: handleSignIn, signOut: handleSignOut, register: handleRegister, session, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}
