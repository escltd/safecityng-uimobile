import { defineStore } from 'pinia';
import type { IBankaccount } from '~/models/bankaccount.model';


export const useMyBankaccountStore = defineStore('mybankaccounts', {
  state: () => ({
    myBankaccounts: [] as IBankaccount[],
  }),
  actions: {
    clearMyBankaccounts() {
      this.myBankaccounts = [] as IBankaccount[];
    },
    async getMyBankaccounts() {
      if (this.myBankaccounts.length == 0) {
        await this.getMyBankaccountsApiCall();
      }
      return readonly(this.myBankaccounts);
    },
    async getMyBankaccountsApiCall() {
      const apiCall = HTTP();
      const response = await apiCall.get('/api/bankaccounts/mine');

      switch (response.status) {
        case 200:
          this.myBankaccounts = response.data;
          break;
        default:
          break;
      }
    }
  },
});