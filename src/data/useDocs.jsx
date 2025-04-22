import { useContext } from 'react';
import DataContext from './DataContext';
import { getDocs, collection } from 'firebase/firestore';
import { db } from './firebase';

export const useDocs = () => useContext(DataContext);

export function useDoc(id) {
  const docs = useDocs();
  return docs?.find(doc => doc.id === id);
}

export async function fetchAllDocs() {
  const snapshot = await getDocs(collection(db, 'public'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
