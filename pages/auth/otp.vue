<template>
  <div>
    <NuxtLayout name="default">
      <div class="flex flex-col items-center text-black justify-center w-full h-screen">
        <img src="~/assets/img/logo.svg" class="h-10 caret-transparent" alt="" />

        <div class="p-t-10 p-b-3 text-left font-bold w-60 text-[1rem]">
          Enter OTP and New Password

          <div class="text-gray text-[0.7rem]">
            If the username exists an OTP will have been sent to your email.
          </div>
        </div>

        <div class="flex flex-row items-center p-y-2 caret-transparent">
          <input type="text" required @keyup="pressEnter" v-model="form.otp" placeholder="OTP Code"
            class="caret-black p-2 w-60 bg-#0001 text-[0.9rem] <smw-full border-solid border-t-0 border-r-0 border-l-0 border-b-0 text-black border-coolgray" />
        </div>

        <div class="items-center caret-transparent p-y-2 relative">
            <i @click="showPassword = !showPassword" class="i-mdi-eye-outline text-gray cursor-pointer absolute right-2 bottom-4"></i>
            <input :type="showPassword ? 'text' : 'password'" required @keyup="isErrorPassword = !isPasswordStrong(form.password), pressEnter" v-model="form.password" placeholder="New Password" min-length="8" 
              :class="isErrorPassword ? 'border-width-1 border-red' : 'border-t-0 border-r-0 border-l-0 border-b-0'"
                class="caret-black p-2 w-60 bg-#0001 text-[0.9rem] <smw-full border-solid text-black" />
        </div>
        <div v-if="isErrorPassword" class="w-60 text-red text-[0.6rem]"> 
            <span :class="(form.password.length > 7) ? 'text-green-9' : ''"> Password must be at least 8 characters </span> <br/>
            <span :class="containsUppercase(form.password) ? 'text-green-9' : ''"> Password must contain at least 1 uppercase </span> <br/>
            <span :class="containsNumber(form.password) ? 'text-green-9' : ''"> Password must contain 1 number </span> <br/>
            <span :class="containsSpecialChar(form.password) ? 'text-green-9' : ''"> Password must contain special character </span>
        </div>

        <div class="items-center caret-transparent p-y-2 relative">
          <i @click="showPassword = !showPassword" class="i-mdi-eye-outline text-gray cursor-pointer absolute right-2 bottom-4"></i>
          <input :type="showPassword ? 'text' : 'password'" required @keyup="isErrorCPassword = !isPasswordStrong(form.confirmpassword), pressEnter" v-model="form.confirmpassword" placeholder="Confirm Password" min-length="8" 
                :class="isErrorCPassword ? 'border-width-1 border-red' : 'border-t-0 border-r-0 border-l-0 border-b-0'"
                class="caret-black p-2 w-60 bg-#0001 text-[0.9rem] <smw-full border-solid text-black" />
        </div>


        <div class="flex flex-row items-center p-y-3">
          <div @click.prevent="isLoading ? false : handleSubmit()"
               class="w-60 bg-black p-y-3 text-[1rem] cursor-pointer caret-transparent readonly font-semibold text-white text-center">
            <span :class="isLoading ? 'text-blur-out' : ''">
              {{ !isLoading ? 'Change Password' : 'Pls Wait....' }}
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
let showPassword = ref(false);

const initialState = reactive({
  otp: "",
  password: "",
  confirmpassword: "",
});

let isErrorPassword = false;
let isErrorCPassword = false;

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

const containsUppercase = (str) => {
  return /[A-Z]/.test(str);
}
const containsNumber = (str) => {
  return /[0-9]/.test(str);
}
const containsSpecialChar = (str) => {
  return /\W|_/g.test(str);
}

const isPasswordStrong = (password) => {
  return (password.length > 7) && containsUppercase(password) && containsNumber(password) && containsSpecialChar(password);
}

const handleSubmit = async () => {

  let errorMsg = ""
  if (!form.otp || form.otp == "") {
    if (errorMsg !== "") {
      errorMsg += "<br/>"
    }
    errorMsg += "Please provide OTP Code"
  }

  if(isPasswordStrong(form.password) === false){
    if (errorMsg !== "") {
      errorMsg += "<br/>"
    }
    errorMsg += "<b>Password</b> is not strong enough"
  }

  if (errorMsg !== "") {
    showAlert({
      titleText: "",
      html: errorMsg,
      icon: "error",
    });
    return;
  }

  if (form.password !== form.confirmpassword) {
    if (errorMsg !== "") {
      errorMsg += "<br/>"
    }
    errorMsg += "<b>Passwords do not match!<b>"
  }

  if (errorMsg !== "") {
    showAlert({
      titleText: "",
      html: errorMsg,
      icon: "error",
    });
    return;
  }
  
  isLoading.value = !isLoading.value;
  let response = await HTTP().put('/api/auth/reset-password', form).then(
    (response) => {
      return response;
    }).catch((error) => {
      return error.response;
    }
  );
    

  showAlert({
    titleText: (response.status == 200 ? 'Success' : 'Failed'),
    text: (response.status == 200 ? response?.data?.message : response?.data?.error),
    icon: (response.status == 200 ? 'success' : 'error'),
  })
  isLoading.value = !isLoading.value;

  if (response.status == 200){
    resetForm();
    setTimeout(() => {
      navigateTo("/auth/signin");
    }, 500);
  }
  
};

</script>
