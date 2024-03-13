<template>
  <div>
  <NuxtLayout name="default">
    <div class="flex flex-col items-center text-black justify-center w-full h-screen">
      <img src="~/assets/img/logo.svg" class="h-10 caret-transparent" alt="" />

      <div class="p-t-10 p-b-3 text-left font-bold w-60 text-[1.3rem]">
        Sign In
      </div>

      <div class="flex flex-row items-center p-y-2 caret-transparent">
          <input type="text" required @keyup="pressEnter" v-model.trim="form.username" placeholder="Username / Email" 
            class="caret-black p-2 w-60 bg-#0001 text-[0.9rem] <smw-full border-solid border-t-0 border-r-0 border-l-0 border-b-0 text-black border-coolgray" />
      </div>

      

      <div class="flex flex-row items-center p-y-2 caret-transparent relative">
        <i @click="showPassword = !showPassword" class="i-mdi-eye-outline text-gray cursor-pointer absolute right-2 bottom-4"></i>
        <input :type="showPassword ? 'text' : 'password'" required @keyup="pressEnter" v-model.trim="form.password" placeholder="Password" 
          class="caret-black p-2 w-60 bg-#0001 text-[0.9rem] <smw-full border-solid border-t-0 border-r-0 border-l-0 border-b-0 text-black border-coolgray" />
      </div>

      <div class="text-right w-60 text-[0.7rem] p-b-3">
        Trouble loggin in? <NuxtLink to="/auth/reset" class="text-orange font-bold">Recover your account</NuxtLink>
      </div>
      
      
      <div class="flex flex-row items-center p-y-3">
        <div @click.prevent="isLoading ? false : handleSubmit()" class="w-60 bg-black p-y-3 text-[1rem] cursor-pointer caret-transparent readonly font-semibold text-white text-center">
          <span :class="isLoading ? 'text-blur-out' : ''">
              {{ !isLoading ? 'Sign in' : 'Signing you in' }}
          </span>
        </div>
      </div>

      <div class="text-gray text-[0.7rem]">
        Don't have an account? <NuxtLink to="/auth/signup" class="text-orange font-bold">Sign up</NuxtLink>
      </div>
    </div>
  </NuxtLayout>
  </div>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/store/auth";
import { showAlert } from '~/plugins/sweetalert';

const { authenticateUser } = useAuthStore();
const { authenticated } = storeToRefs(useAuthStore());

let isLoading = ref(false);
let showPassword = ref(false);

const initialState = reactive({
  username: "",
  password: "",
});

useAuthStore().logUserOut()

const pressEnter = (event) => {
  if (event.code === "Enter") {
    handleSubmit();
  }
};

let form = reactive({ ...initialState });

const resetForm = () => {
  isLoading.value = false;
  form = reactive({ ...initialState });
};

const handleSubmit = async () => {

  if (!form.username || !form.password) {
    showAlert({
      titleText: "Error",
      text: "Please fill all fields",
      icon: "error",
    });
    return;
  }
  
  isLoading.value = !isLoading.value;
  
  let response = await authenticateUser(form)
  if(response?.error){
    showAlert({
      titleText: (authenticated.value ? 'Success' : 'Failed'),
      text: (authenticated.value ? response?.message : response?.error),
      icon: (authenticated.value ? 'success' : 'error'),
    })
  }
  
  isLoading.value = !isLoading.value;

  if (authenticated.value){
    resetForm();
    setTimeout(() => {
      navigateTo("/dashboard");
    }, 250);
  }
};

</script>
