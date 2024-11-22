import { useState, useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import Header from '@/components/Header';
import NewHeroModal from '@/components/NewHeroModal';
import { listenToHeroes } from '@/firebase/databaseService';
import HeroListItem from '@/components/HeroListItem';
import { useSession } from '@/firebase/SessionProvider';

type Hero = {
  id: string;
  name: string;
};

export default function App() {
  const [heroNames, setHeroNames] = useState<Hero[]>([]);
  const { session } = useSession();

  useEffect(() => {
    if (!session) {
      console.log('User is not signed in');
      return;
    }

    // Set up the listener for real-time updates
    const unsubscribe = listenToHeroes(session, (heroes) => {
      setHeroNames(heroes); // Update state with the hero list
    });

    // Clean up the listener on component unmount
    return () => unsubscribe;
  }, [session]);

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.section}>
        <NewHeroModal />
      </View>
      <View style={styles.heroSection}>
        <FlatList
          data={heroNames}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <HeroListItem id={item.id} name={item.name} />
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
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  heroSection: {
    flex: 1,
  },
});
