import {db, useAuthCredentials} from '@services';
import {convertToUtc} from '@utils';
import {startOfDay, endOfDay} from 'date-fns';
import {toZonedTime, format} from 'date-fns-tz';
import {
  addDoc,
  collection,
  deleteDoc,
  doc as docFirebase,
  DocumentData,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  startAfter,
  updateDoc,
  where,
} from 'firebase/firestore';

import {CashFlow} from './cashFlowTypes';

async function getList(
  pageLimit: number,
  userId: string,
  lastVisible?: QueryDocumentSnapshot<DocumentData>,
  date?: Date,
): Promise<{
  data: CashFlow[];
  lastVisible?: QueryDocumentSnapshot<DocumentData>;
  hasNextPage: boolean;
}> {
  const targetDate = date ?? new Date();

  const zonedDate = convertToUtc(targetDate, 'America/Sao_Paulo');

  const transactionsQuery = query(
    collection(db, 'transactions'),
    where('userId', '==', userId),
    where('date', '>=', startOfDay(zonedDate)),
    where('date', '<=', endOfDay(zonedDate)),
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
    userId: doc.data().userId,
  }));

  return {
    data,
    lastVisible: querySnapshot.docs[querySnapshot.docs.length - 1],
    hasNextPage: querySnapshot.docs.length === pageLimit,
  };
}

async function create(cashFlow: Omit<CashFlow, 'id'>): Promise<CashFlow> {
  const date = cashFlow.date
    ? convertToUtc(cashFlow.date, 'America/Sao_Paulo')
    : new Date();

  const docRef = await addDoc(collection(db, 'transactions'), {
    ...cashFlow,
    date,
  });

  return {
    id: docRef.id,
    ...cashFlow,
    date,
  };
}

async function remove(id: string): Promise<void> {
  const docRef = docFirebase(db, 'transactions', id);
  await deleteDoc(docRef);
}

async function getTotalExpenses(userId: string, date?: Date): Promise<number> {
  const targetDate = date ?? new Date();

  const zonedDate = convertToUtc(targetDate, 'America/Sao_Paulo');

  const queryExpenses = query(
    collection(db, 'transactions'),
    where('userId', '==', userId),
    where('type', '==', 'expense'),
    where('date', '>=', startOfDay(zonedDate)),
    where('date', '<=', endOfDay(zonedDate)),
  );

  const querySnapshot = await getDocs(queryExpenses);

  const total = querySnapshot.docs.reduce((sum, doc) => {
    console.log('summ', sum);

    const amount = doc.data().amount || 0;
    return sum + amount;
  }, 0);

  return total;
}

async function getTotalIncome(userId: string, date?: Date): Promise<number> {
  const targetDate = date ?? new Date();

  const zonedDate = convertToUtc(targetDate, 'America/Sao_Paulo');

  const queryIncome = query(
    collection(db, 'transactions'),
    where('userId', '==', userId),
    where('type', '==', 'income'),
    where('date', '>=', startOfDay(zonedDate)),
    where('date', '<=', endOfDay(zonedDate)),
  );

  const querySnapshot = await getDocs(queryIncome);

  const total = querySnapshot.docs.reduce((sum, doc) => {
    const amount = doc.data().amount || 0;
    return sum + amount;
  }, 0);

  return total;
}

async function getItemById(id: string): Promise<CashFlow> {
  const docRef = docFirebase(db, 'transactions', id);
  const docSnap = await getDoc(docRef);

  const data = await docSnap.data()!;

  return {
    id: docSnap.id,
    type: data.type,
    amount: data.amount,
    description: data.description,
    userId: data.userId,
    date: data.date.toDate(),
  };
}

async function update(
  id: string,
  updatedData: {
    description: string;
    amount: number;
    type: 'expense' | 'income';
  },
): Promise<CashFlow> {
  const docRef = docFirebase(db, 'transactions', id);

  await updateDoc(docRef, updatedData);

  const updatedDoc = await getDoc(docRef);

  const data = updatedDoc.data()!;

  return {
    id: updatedDoc.id,
    type: data.type,
    amount: data.amount,
    description: data.description,
    userId: data.userId,
    date: data.date.toDate(),
  };
}

async function getTransactionDates(userId: string): Promise<string[]> {
  const transactionsQuery = await query(
    collection(db, 'transactions'),
    where('userId', '==', userId),
  );

  const snapshot = await getDocs(transactionsQuery);

  const dateSet = new Set<string>();

  snapshot.forEach(doc => {
    const date = doc.data().date?.toDate?.();
    if (date) {
      const zonedDate = toZonedTime(date, 'America/Sao_Paulo');

      const formatted = format(zonedDate, 'yyyy-MM-dd', {
        timeZone: 'America/Sao_Paulo',
      });
      dateSet.add(formatted);
    }
  });

  return Array.from(dateSet);
}

export const cashFlowFirebase = {
  getList,
  create,
  remove,
  update,
  getTotalExpenses,
  getTotalIncome,
  getItemById,
  getTransactionDates,
};
