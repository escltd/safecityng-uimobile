import { defineStore } from 'pinia';
import type { IBeneficiary } from '~/models/beneficiary.model';


export const useMyBeneficiaryStore = defineStore('mybeneficiarys', {
  state: () => ({
    myBeneficiarys: [] as IBeneficiary[],
  }),
  actions: {
    clearMyBeneficiarys() {
      this.myBeneficiarys = [] as IBeneficiary[];
    },
    async getMyBeneficiarys() {
      if (this.myBeneficiarys.length == 0) {
        await this.getMyBeneficiarysApiCall();
      }
      return readonly(this.myBeneficiarys);
    },
    async getMyBeneficiarysApiCall() {
      const apiCall = HTTP();
      const response = await apiCall.get('/api/beneficiarys/mine');
      switch (response.status) {
        case 200:
          this.myBeneficiarys = response.data;
          break;
        default:
          break;
      }
    }
  },
});