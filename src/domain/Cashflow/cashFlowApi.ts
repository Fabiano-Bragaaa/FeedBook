import {cashFlowListMock} from './cashFlowMock';
import {CashFlow} from './cashFlowTypes';

async function getList(): Promise<CashFlow[]> {
  return cashFlowListMock;
}

export const cashFlowApi = {
  getList,
};
