import { defineStore } from 'pinia';
import { useMyProfileStore } from '~/store/myprofile';  

interface LoginPayLoadInterface {
  username: string;
  password: string;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authenticated: false,
    loading: false,
  }),
  actions: {
    async authenticateUser(reqBody: LoginPayLoadInterface ) {
      useMyProfileStore().clearMyProfile();
      this.authenticated = false;
      
        const response = await HTTP().post('/api/auth/login', reqBody).then(
          (response: any) => {
            return response;
          }).catch((error: any) => {
            return error.response;
          }
        );

      const token = useCookie('token', { maxAge: 60 * 60 * 4 }); // useCookie new hook in nuxt 3
      switch (response.status) {
        case 200:
          this.authenticated = true;
          token.value = 'true'; // set the token cookie
          break;
        default:
          this.authenticated = false;
          token.value = null; // clear the token cookie
          break;
      }
      return response.data;
    },
    logUserOut() {
      const token = useCookie('token')
      token.value = null; // clear the token cookie
      this.authenticated = false; // set authenticated  state value to false
      useMyProfileStore().clearMyProfile();
    },
  }
});