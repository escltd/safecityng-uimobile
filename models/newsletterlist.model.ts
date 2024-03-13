import { defineStore } from 'pinia';
import type { IProfile } from '~/models/profile.models';

export const useMyProfileStore = defineStore('myprofile', {
  state: () => ({
    myProfile: {} as IProfile,
  }),
  actions: {
    setMyProfile() {
      this.myProfile = {} as IProfile;
    },
    async getMyProfile() {
      if (this.myProfile.ID === undefined) {
        await this.getMyProfileApiCall();
      }
      return readonly(this.myProfile);
    },
    async getMyProfileApiCall() {
      const apiCall = HTTP();
      const response = await apiCall.get('/api/profile/mine');

      switch (response.status) {
        case 200:
          this.myProfile = response.data;
          break;
        default:
          break;
      }
    }
  },
});