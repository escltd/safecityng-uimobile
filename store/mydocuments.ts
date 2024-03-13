import { defineStore } from 'pinia';
import type { IDocument } from '~/models/document.model';


export const useMyDocumentStore = defineStore('mydocumentstore', {
  state: () => ({
    myDocuments: [] as IDocument[],
  }),
  actions: {
    clearMyDocuments() {
      this.myDocuments = [] as IDocument[];
    },
    async getMyDocuments() {
      if (this.myDocuments.length == 0) {
        await this.getMyDocumentsApiCall();
      }
      return readonly(this.myDocuments);
    },
    async getMyDocumentsApiCall() {
      const apiCall = HTTP();
      const response = await apiCall.get('/api/documents/mine');
      switch (response.status) {
        case 200:
          this.myDocuments = response.data;
          break;
        default:
          break;
      }
    }
  },
});