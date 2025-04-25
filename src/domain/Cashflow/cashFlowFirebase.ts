import {db} from '@services';
import {startOfDay, endOfDay} from 'date-fns';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDocs,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  startAfter,
  where,
} from 'firebase/firestore';

import {CashFlow} from './cashFlowTypes';

async function getList(
  pageLimit: number,
  lastVisible?: QueryDocumentSnapshot<DocumentData>,
  date?: Date,
): Promise<{
  data: CashFlow[];
  lastVisible?: QueryDocumentSnapshot<DocumentData>;
  hasNextPage: boolean;
}> {
  const targetDate = date ?? new Date();

  const transactionsQuery = query(
    collection(db, 'transactions'),
    where('date', '>=', startOfDay(targetDate)),
    where('date', '<=', endOfDay(targetDate)),
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

async function create(cashFlow: Omit<CashFlow, 'id'>): Promise<CashFlow> {
  const docRef = await addDoc(collection(db, 'transactions'), {
    ...cashFlow,
    date: cashFlow.date ?? new Date(),
  });

  return {
    id: docRef.id,
    ...cashFlow,
    date: cashFlow.date ?? new Date(),
  };
}

async function remove(id: string): Promise<void> {
  const docRef = doc(db, 'transactions', id);
  await deleteDoc(docRef);
}

async function getTotalExpenses(date?: Date): Promise<number> {
  const targetDate = date ?? new Date();

  const queryExpenses = query(
    collection(db, 'transactions'),
    where('type', '==', 'expense'),
    where('date', '>=', startOfDay(targetDate)),
    where('date', '<=', endOfDay(targetDate)),
  );

  const querySnapshot = await getDocs(queryExpenses);

  const total = querySnapshot.docs.reduce((sum, doc) => {
    console.log('summ', sum);

    const amount = doc.data().amount || 0;
    return sum + amount;
  }, 0);

  return total;
}

async function getTotalIncome(date?: Date): Promise<number> {
  const targetDate = date ?? new Date();

  const queryIncome = query(
    collection(db, 'transactions'),
    where('type', '==', 'income'),
    where('date', '>=', startOfDay(targetDate)),
    where('date', '<=', endOfDay(targetDate)),
  );

  const querySnapshot = await getDocs(queryIncome);

  const total = querySnapshot.docs.reduce((sum, doc) => {
    const amount = doc.data().amount || 0;
    return sum + amount;
  }, 0);

  return total;
}

export const cashFlowFirebase = {
  getList,
  create,
  remove,
  getTotalExpenses,
  getTotalIncome,
};
