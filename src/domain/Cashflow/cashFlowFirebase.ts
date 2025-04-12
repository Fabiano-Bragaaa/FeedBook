import {auth, db} from '@services';
import {addDoc, collection, getDocs} from 'firebase/firestore';

import {cashFlowListMock} from './cashFlowMock';
import {CashFlow} from './cashFlowTypes';

async function getList(): Promise<CashFlow[]> {
  const querySnapshot = await getDocs(collection(db, 'Transactions'));

  const cashFlowList: CashFlow[] = querySnapshot.docs.map(doc => ({
    id: doc.id,
    type: doc.data().type,
    amount: doc.data().amount,
    description: doc.data().description,
    date: doc.data().date?.toDate?.() ?? new Date(),
  }));

  return cashFlowList;
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
