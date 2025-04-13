import {auth, db} from '@services';
import {
  addDoc,
  collection,
  DocumentData,
  getDocs,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  startAfter,
} from 'firebase/firestore';

import {CashFlow} from './cashFlowTypes';

async function getList(
  pageLimit: number,
  lastVisible?: QueryDocumentSnapshot<DocumentData>,
): Promise<{
  data: CashFlow[];
  lastVisible?: QueryDocumentSnapshot<DocumentData>;
  hasNextPage: boolean;
}> {
  const transactionsQuery = query(
    collection(db, 'Transactions'),
    orderBy('date', 'desc'),
    limit(pageLimit),
    ...(lastVisible ? [startAfter(lastVisible)] : []),
  );

  const querySnapshot = await getDocs(transactionsQuery);

  const data: CashFlow[] = querySnapshot.docs.map(doc => ({
    id: doc.id,
    type: doc.data().type,
    amount: doc.data().amount,
    description: doc.data().description,
    date: doc.data().date?.toDate?.() ?? new Date(),
  }));

  return {
    data,
    lastVisible: querySnapshot.docs[querySnapshot.docs.length - 1],
    hasNextPage: querySnapshot.docs.length === pageLimit,
  };
}

async function createTransactions(
  cashFlow: Omit<CashFlow, 'id'>,
): Promise<CashFlow> {
  const docRef = await addDoc(collection(db, 'Transactions'), {
    ...cashFlow,
    date: cashFlow.date ?? new Date(),
  });

  return {
    id: docRef.id,
    ...cashFlow,
    date: cashFlow.date ?? new Date(),
  };
}
export const cashFlowFirebase = {
  getList,
  createTransactions,
};
