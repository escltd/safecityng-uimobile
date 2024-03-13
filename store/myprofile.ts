import { defineStore } from 'pinia';
import type { IProfile } from '~/models/profile.model';
import { useAuthStore } from '~/store/auth';


export const useMyProfileStore = defineStore('myprofile', {
  state: () => ({
    myProfile: {} as IProfile,
  }),
  actions: {
    clearMyProfile() {
      this.myProfile = {} as IProfile;
    },
    async getMyProfile() {
      if (this.myProfile.id === undefined) {
        await this.getMyProfileApiCall();
      }
      
      if (this.myProfile.isuser !== true) {
        useAuthStore().logUserOut();
        setTimeout(() => {
          navigateTo('/auth/signin'); 
        }, 250); 
      }
      return readonly(this.myProfile);
    },
    async getMyProfileApiCall() {
      const apiCall = HTTP();
      const response = await apiCall.get('/api/profile/mine').then(
        (response) => {
          return response;
        }).catch((error) => {
          return error.response;
        }
      );
      
      switch (response.status) {
        case 200:
          this.myProfile = response.data;
          if (this.myProfile.isuser !== true) {
            useAuthStore().logUserOut();
            setTimeout(() => {
              navigateTo('/auth/signin');
            }, 250);
          }
          break;
        default:
          break;
      }
    }
  },
});