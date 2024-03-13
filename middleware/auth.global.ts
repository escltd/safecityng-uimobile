import { storeToRefs } from "pinia";
import { useAuthStore } from '~/store/auth';
import { useCurrencyStore } from "~/store/currency";
import { useMyAccountsStore } from "~/store/myaccounts";  
import { useMyBankaccountStore } from "~/store/mybankaccounts";
import { useMyBeneficiaryStore } from "~/store/mybeneficiarys";
import { useMyDocumentStore } from "~/store/mydocuments";
import { useMyProfileStore } from "~/store/myprofile";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive
  
  const token = useCookie('token')
  console.log("token.value")
  console.log(token.value)
  if (token.value) {
    authenticated.value = true;
  }
  // if token exists and url is /login redirect to homepage
  if (authenticated.value && to?.path.startsWith('/auth')) {
    return navigateTo("/dashboard", { external: true });
  }

  // // // if token doesn't exist when accessing the dashboard redirect to log in
  if (!authenticated.value && to?.path.startsWith('/dashboard')) {
    return navigateTo('/auth/signin');
  }
  
  if (authenticated.value && to?.path.startsWith('/dashboard')){
    // useCurrencyStore().getCurrencysApiCall();
    useMyDocumentStore().getMyDocuments();
    // useMyBankaccountStore().getMyBankaccounts();
    // useMyBeneficiaryStore().getMyBeneficiarys();
    // useMyAccountsStore().getMyAccountsApiCall()
    await useMyProfileStore().getMyProfile();
  }
})