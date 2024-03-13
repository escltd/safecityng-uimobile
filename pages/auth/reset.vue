<template>
  <div>
    <NuxtLayout name="default">
      <div class="flex flex-col items-center text-black justify-center w-full h-screen">
        <img src="~/assets/img/logo.svg" class="h-10 caret-transparent" alt="" />

        <div class="p-t-10 p-b-3 text-left font-bold w-60 text-[1rem]">
          Reset Your Password

          <div class="text-gray text-[0.7rem]">
            OTP Code will be sent to your mail.
          </div>
        </div>

        <div class="flex flex-row items-center p-y-2 caret-transparent">
          <input type="text" required @keyup="pressEnter" v-model="form.username" placeholder="Username / Email" 
            class="caret-black p-2 w-60 bg-#0001 text-[0.9rem] <smw-full border-solid border-t-0 border-r-0 border-l-0 border-b-0 text-black border-coolgray" />
        </div>

        <div class="text-right w-60 text-[0.7rem] p-b-3">
          <NuxtLink to="/auth/signin" class="text-orange font-bold">Back to Sign In</NuxtLink>
        </div>


        <div class="flex flex-row items-center p-y-3">
          <div @click.prevent="isLoading ? false : handleSubmit()"
               class="w-60 bg-black p-y-3 text-[1rem] cursor-pointer caret-transparent readonly font-semibold text-white text-center">
            <span :class="isLoading ? 'text-blur-out' : ''">
              {{ !isLoading ? 'Reset' : 'Reseting...' }}
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

let isLoading = ref(false);

const initialState = reactive({
  username: "",
  password: "",
});

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
  if (!form.username) {
    showAlert({
      titleText: "Error",
      text: "Please provide Username / Email",
      icon: "error",
    });
    return;
  }
  
  isLoading.value = !isLoading.value;
  let response = await HTTP().post('/api/auth/reset', form).then(
    (response) => {
      return response;
    }).catch((error) => {
      return error.response;
    }
  );
    
  showAlert({
    titleText: ('Success'),
    text: (response.status == 200 ? response?.data?.message : response?.data?.error),
    icon: ('success'),
  })
  isLoading.value = !isLoading.value;

  resetForm();
  setTimeout(() => {
    navigateTo("/auth/otp");
  }, 500);
  
};

</script>
