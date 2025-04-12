import {cashFlowFirebase} from './cashFlowFirebase';
import {CashFlow} from './cashFlowTypes';

async function getList(): Promise<CashFlow[]> {
  const cashFlowList = await cashFlowFirebase.getList();

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
