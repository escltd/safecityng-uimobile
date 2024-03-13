import { defineStore } from 'pinia';
import type { IAccount } from '~/models/account.model';


export const useMyAccountsStore = defineStore('myaccountsstore', {
  state: () => ({
    myAccounts: [] as IAccount[],
    defaultAccount: {} as IAccount,
  }),
  actions: {
    clearMyAccounts() {
      this.myAccounts = [] as IAccount[];
    },
    async getMyAccounts() {
      if (this.myAccounts.length == 0) {
        await this.getMyAccountsApiCall();
      }
      return readonly(this.myAccounts);
    },
    async getMyAccountsApiCall() {
      const apiCall = HTTP();
      const response = await apiCall.get('/api/accounts/mine');

      switch (response.status) {
        case 200:
          this.myAccounts = response.data;
          response.data.forEach((account: IAccount) => {
            if (account.isdefault) {
              this.defaultAccount = account;
            }
          })
          break;
        default:
          break;
      }
    }
  },
});