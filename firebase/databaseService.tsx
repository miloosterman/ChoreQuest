import { getDatabase, ref, push, set, get, child, remove, onValue } from 'firebase/database';

const database = getDatabase();
type Hero = {
  id: string;
  name: string;
};

export const addQuest = async (questName: string, time: number, gold: number, heroId: string, session: string) => {
  const newQuestRef = push(ref(database, `parents/${session}/heroes/${heroId}/quests`));
  await set(newQuestRef, {
    name: questName,
    timeReward: time,
    goldReward: gold,
  });
  console.log('Quest successfully added to Firebase');
};

export const addHero = async (heroName: string, session: string) => {
  const newHeroRef = push(ref(database, `parents/${session}/heroes`));
  await set(newHeroRef, {
    name: heroName
  });
  console.log('Hero successfully added to Firebase');
}
export const deleteHero = async (heroId: string, session: string) => {
  const heroRef = ref(database, `parents/${session}/heroes/${heroId}`);
  try {
    await remove(heroRef);
    console.log('Hero successfully deleted');
  } catch (error) {
    console.error('Error deleting hero:', error);
  }
}

export const getHeroNames = async (session: string) => {
  return await get(ref(database, `parents/${session}/heroes`));
}

export const listenToHeroes = (session: string, callback: (heroes: any[]) => void) => {
  const heroesRef = ref(database, `parents/${session}/heroes`);
  onValue(heroesRef, (snapshot) => {
    const heroes: Hero[] = [];
    snapshot.forEach((childSnapshot) => {
      heroes.push({ id: childSnapshot.key, ...childSnapshot.val() });
    });
    callback(heroes);
  });
};

export const getQuests = async (heroId: string, session: string) => {
  return await get(ref(database, `parents/${session}/heroes/${heroId}/quests`));
};
