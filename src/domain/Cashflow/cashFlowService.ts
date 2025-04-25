import {DocumentData, QueryDocumentSnapshot} from 'firebase/firestore';

import {cashFlowFirebase} from './cashFlowFirebase';
import {CashFlow} from './cashFlowTypes';

const PAGE_LIMIT = 10;

async function getList(
  lastVisible?: QueryDocumentSnapshot<DocumentData>,
  date?: Date,
): Promise<{
  data: CashFlow[];
  lastVisible?: QueryDocumentSnapshot<DocumentData>;
  hasNextPage: boolean;
}> {
  const cashFlowList = await cashFlowFirebase.getList(
    PAGE_LIMIT,
    lastVisible,
    date,
  );

  return cashFlowList;
}

async function getTotalExpenses(date?: Date): Promise<number> {
  const totalExpenses = await cashFlowFirebase.getTotalExpenses(date);

  return totalExpenses;
}

async function getTotalIncome(date?: Date): Promise<number> {
  const totalIncome = await cashFlowFirebase.getTotalIncome(date);

  return totalIncome;
}

async function create(cashFlow: Omit<CashFlow, 'id'>): Promise<CashFlow> {
  const created = await cashFlowFirebase.create(cashFlow);
  return created;
}

async function remove(id: string): Promise<void> {
  const removed = await cashFlowFirebase.remove(id);

  return removed;
}

async function getItemById(id: string): Promise<CashFlow> {
  const data = await cashFlowFirebase.getItemById(id);

  return data;
}

export const cashFlowService = {
  getList,
  create,
  remove,
  getTotalExpenses,
  getTotalIncome,
  getItemById,
};
