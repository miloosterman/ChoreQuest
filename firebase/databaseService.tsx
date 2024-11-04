import { getDatabase, ref, push, set } from 'firebase/database';

const database = getDatabase();

export const addQuest = async (questName: string) => {
  const newQuestRef = push(ref(database, 'quests'));
  await set(newQuestRef, {
    name: questName,
  });
  console.log('Quest successfully added to Firebase');
};
