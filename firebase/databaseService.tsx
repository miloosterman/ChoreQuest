import { getDatabase, ref, push, set, get, child, remove, onValue, update } from 'firebase/database';

const database = getDatabase();
type Hero = {
  id: string;
  name: string;
};

type Quest = {
  id: string;
  name: string;
  timeReward: number;
  goldReward: number;
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
    name: heroName,
    completedQuests: 0,
    level: 1,
    gold: 0,
    screentime: 0,
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

export const listenToHeroes = (session: string, callback: (heroes: Hero[]) => void) => {
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

export const listenToQuests = (heroId: string, session: string, callback: (quests: Quest[]) => void) => {
  const questRef = ref(database, `parents/${session}/heroes/${heroId}/quests`);
  onValue(questRef, (snapshot) => {
    const quests: Quest[] = [];
    snapshot.forEach((childSnapshot) => {
      quests.push({ id: childSnapshot.key, ...childSnapshot.val() });
    });
    console.log(quests)
    callback(quests);
  });
};

export const completeQuest = async (heroId: string, questId: string, session: string) => {
  const questRef = ref(database, `parents/${session}/heroes/${heroId}/quests/${questId}`);
  const heroRef = ref(database, `parents/${session}/heroes/${heroId}`);

  try {
    const questSnapshot = await get(questRef);
    if (!questSnapshot.exists()) {
      throw new Error("Quest not found");
    }
    const questData = questSnapshot.val();
    const { goldReward, timeReward } = questData;

    const heroSnapshot = await get(heroRef);
    if (!heroSnapshot.exists()) {
      throw new Error("Hero not found");
    }
    
    const heroData = heroSnapshot.val()
    const completedQuestsCount = heroData.completedQuests || 0;
    const baseLevel = 1; // Starting level
    const newLevel = baseLevel + Math.floor((completedQuestsCount + 1) / 3);
    const heroGold = heroData.gold || 0;
    const heroTime = heroData.screentime || 0;

    await remove(questRef);

    await update(heroRef, {
      completedQuests: completedQuestsCount + 1,
      level: newLevel,
      gold: heroGold + goldReward,
      screentime: heroTime + timeReward,
    });

    console.log("Quest completed successfully");
  } catch (error) {
    console.error("Error completing quest:", error);
    throw error;
  }
};

export const getHeroDetails = async (heroId: string, session: string) => {
  try {
    const heroRef = ref(database, `parents/${session}/heroes/${heroId}`);
    const questsRef = ref(database, `parents/${session}/heroes/${heroId}/quests`);

    const heroSnapshot = await get(heroRef);
    if (!heroSnapshot.exists()) {
      throw new Error("Hero not found");
    }

    const heroData = heroSnapshot.val();

    const questsSnapshot = await get(questsRef);
    const quests = [];
    questsSnapshot.forEach((childSnapshot) => {
      quests.push(childSnapshot.val());
    });

    const remainingQuests = quests.length;

    return {
      name: heroData.name,
      level: heroData.level,
      completedQuests: heroData.completedQuests || 0,
      gold: heroData.gold || 0,
      screentime: heroData.screentime || 0,
      remainingQuests,
    };
  } catch (error) {
    console.error("Error fetching hero details:", error);
    throw error;
  }
};

