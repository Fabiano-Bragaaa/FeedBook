import {cashFlowApi} from './cashFlowApi';
import {CashFlow} from './cashFlowTypes';

async function getList(): Promise<CashFlow[]> {
  const cashFlowList = await cashFlowApi.getList();

  return cashFlowList;
}

export const cashFlowService = {
  getList,
};
