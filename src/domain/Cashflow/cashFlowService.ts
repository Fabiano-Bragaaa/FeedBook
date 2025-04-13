import {DocumentData, QueryDocumentSnapshot} from 'firebase/firestore';

import {cashFlowFirebase} from './cashFlowFirebase';
import {CashFlow} from './cashFlowTypes';

const PAGE_LIMIT = 10;

async function getList(
  lastVisible?: QueryDocumentSnapshot<DocumentData>,
): Promise<{
  data: CashFlow[];
  lastVisible?: QueryDocumentSnapshot<DocumentData>;
  hasNextPage: boolean;
}> {
  const cashFlowList = await cashFlowFirebase.getList(PAGE_LIMIT, lastVisible);

  return cashFlowList;
}

async function create(cashFlow: Omit<CashFlow, 'id'>): Promise<CashFlow> {
  const created = await cashFlowFirebase.createTransactions(cashFlow);
  return created;
}

export const cashFlowService = {
  getList,
  create,
};
