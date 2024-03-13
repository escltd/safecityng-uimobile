import { defineStore } from 'pinia';

export const useCurrencyStore = defineStore('mycurrencystore', {
  state: () => ({
    currencies: [] as {id:string,code:string}[],
  }),
  actions: {
    clearCurrencys() {
      this.currencies = [] as {id:string,code:string}[];
    },
    async getCurrencys() {
      if (this.currencies.length == 0) {
        await this.getCurrencysApiCall();
      }
      return readonly(this.currencies);
    },
    async getCurrencysApiCall() {
      const apiCall = HTTP();
      const response = await apiCall.post('/api/currencys/search', { workflow: 'enabled', name: "", page: 0, limit: 100 });
      switch (response.status) {
        case 200:
          this.currencies = response.data.sort((a: { code: string; }, b: { code: string; }) => a.code.localeCompare(b.code))
          break;
        default:
          break;
      }
    }
  },
});