<template>
  <div>
    <NuxtLayout name="default">
      <div class="flex flex-col items-center text-black justify-center w-full h-screen p-b-10">
        <img src="~/assets/img/logo.svg" class="h-10 caret-transparent" alt="" />

        <div class="p-y-3 text-left font-bold w-60 text-[1.3rem]">
          Sign Up

          <div class="text-gray text-[0.7rem]">
            Get started with your free account
          </div>
        </div>

        
          <div class="items-center caret-transparent p-y-2">
            <input type="text" required @keyup="pressEnter" v-model="form.firstname" placeholder="First Name"
                   class="caret-black p-2 w-60 bg-#0001 text-[0.9rem] <smw-full border-solid border-t-0 border-r-0 border-l-0 border-b-0 text-black border-coolgray" />
          </div>

          <div class="items-center caret-transparent p-y-2">
            <input type="text" required @keyup="pressEnter" v-model="form.lastname" placeholder="Last Name"
                    class="caret-black p-2 w-60 bg-#0001 text-[0.9rem] <smw-full border-solid border-t-0 border-r-0 border-l-0 border-b-0 text-black border-coolgray" />
          </div>
        
          <div class="items-center caret-transparent p-y-2">
            <select v-model="form.phonecode" @change="updateCountry" class="text-ellipsis caret-black p-2 w-60 bg-#0001 text-[0.9rem] <smw-full border-solid border-t-0 border-r-0 border-l-0 border-b-0 text-black border-coolgray">
              <option value="" class="text-gray" disabled selected>Country</option>
              <option v-for="(country, index) in isoCountries" :key="index" :value="country.code">{{ country.country }} - (+{{ country.code }})</option>
            </select>
          </div>
        
          <div class="items-center caret-transparent p-y-2">
            <input type="text" required @keyup="isErrorMobile = !validMobile(form.mobile), pressEnter" v-model="form.mobile" placeholder="Mobile" 
            :class="isErrorMobile ? 'border-width-1 border-red' : 'border-t-0 border-r-0 border-l-0 border-b-0'"
                    class="caret-black p-2 w-60 bg-#0001 text-[0.9rem] <smw-full border-solid text-black" />
              <br/>
              <div class="text-gray text-[0.7rem] w-60"> e.g  +10000000000 </div>
          </div>

            <div class="items-center caret-transparent p-y-2">
              <input type="email" required @keyup="isErrorEmail = !validEmail(form.email), pressEnter" v-model="form.email" placeholder="Email" 
              :class="isErrorEmail ? 'border-width-1 border-red' : 'border-t-0 border-r-0 border-l-0 border-b-0'"
                      class="caret-black p-2 w-60 bg-#0001 text-[0.9rem] <smw-full border-solid  text-black"/>
            </div>
            
            <div class="items-center caret-transparent p-y-2 relative">
              <i @click="showPassword = !showPassword" class="i-mdi-eye-outline text-gray cursor-pointer absolute right-2 bottom-4"></i>
              <input :type="showPassword ? 'text' : 'password'" required @keyup="isErrorPassword = !isPasswordStrong(form.password), pressEnter" v-model="form.password" placeholder="Password" min-length="8" 
                    :class="isErrorPassword ? 'border-width-1 border-red' : 'border-t-0 border-r-0 border-l-0 border-b-0'"
                     class="caret-black p-2 w-60 bg-#0001 text-[0.9rem] <smw-full border-solid text-black" />
            </div>
            <div v-if="isErrorPassword" class="w-60 text-red text-[0.6rem]"> 
                <span :class=" (form.password.length > 7) ? 'text-green-9':''"> Password must be at least 8 characters </span> <br/>
                <span :class=" containsUppercase(form.password) ? 'text-green-9':''"> Password must contain at least 1 uppercase </span> <br/>
                <span :class=" containsNumber(form.password) ? 'text-green-9':''"> Password must contain 1 number </span> <br/>
                <span :class=" containsSpecialChar(form.password) ? 'text-green-9':''"> Password must contain special character </span>
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
              {{ !isLoading ? 'Sign up' : 'Signing you up' }}
            </span>
          </div>
        </div>

        <div class="text-gray text-[0.7rem]">
          Already have an account? <NuxtLink to="/auth/signin" class="text-orange font-bold">Sign in</NuxtLink>
        </div>
      </div>
    </NuxtLayout>
</div>
</template>
<style>
option:not(:first-of-type) {
  color: #fff;
}
</style>
<script setup>
import { validMobile } from '~/composables/common';
import { showAlert } from '~/plugins/sweetalert';

let isLoading = ref(false); 
let showPassword = ref(false);
const initialState = reactive({
  firstname: "",
  lastname: "",
  email: "",
  country: "",
  mobile: "",
  phonecode: "",
  password: "",
  confirmpassword: "",
});

let isErrorEmail = false;
let isErrorMobile = false;
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

const updateCountry = () => {
  for (let i = 0; i < isoCountries.length; i++) {
    if (isoCountries[i].code === form.phonecode) {
      form.country = isoCountries[i].country;
      form.mobile = '+'+isoCountries[i].code;
      break;
    }
  }
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
  if(form.firstname === ""){
    if (errorMsg !== "") {
      errorMsg += "<br/>"
    }
    errorMsg += "<b>First name</b> is required"
  }

  if(form.lastname === ""){
    if (errorMsg !== "") {
      errorMsg += "<br/>"
    }
    errorMsg += "<b>Last name</b> is required"
  }

  if(form.country === ""){
    if (errorMsg !== "") {
      errorMsg += "<br/>"
    }
    errorMsg += "<b>Country</b> is required"
  }
  
  if(validMobile(form.mobile) === false){
    if (errorMsg !== "") {
      errorMsg += "<br/>"
    }
    errorMsg += "<b>Mobile</b> is required"
  }
  
  if(validEmail(form.email) === false){
    if (errorMsg !== "") {
      errorMsg += "<br/>"
    }
    errorMsg += "<b>Email</b> is required"
  }

  if(isPasswordStrong(form.password) === false){
    if (errorMsg !== "") {
      errorMsg += "<br/>"
    }
    errorMsg += "<b>Password</b> is not strong enough"
  }

  // if (form.password.length < 8) {
  //   if (errorMsg !== "") {
  //     errorMsg += "<br/>"
  //   }
  //   errorMsg += "<b>Password</b> must be at least 8 characters"
  // }

  // if (!containsUppercase(form.password)) {
  //   if (errorMsg !== "") {
  //     errorMsg += "<br/>"
  //   }
  //   errorMsg += "<b>Password</b> must contain at least 1 uppercase"
  // }

  // if (!containsNumber(form.password)) {
  //   if (errorMsg !== "") {
  //     errorMsg += "<br/>"
  //   }
  //   errorMsg += "<b>Password</b> must contain at least 1 number"
  // }

  // if (!containsSpecialChar(form.password)) {
  //   if (errorMsg !== "") {
  //     errorMsg += "<br/>"
  //   }
  //   errorMsg += "<b>Password</b> must contain at least 1 special character"
  // }

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

  form.firstname = form.firstname.trim();
  form.lastname = form.lastname.trim();
  form.email = form.email.toLowerCase().trim();
  form.mobile = form.mobile.trim();
  form.password = form.password.trim();
  form.confirmpassword = form.confirmpassword.trim();

  
  isLoading.value = !isLoading.value;
  let response = await HTTP().post('/api/auth/signup', form).then(
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
      navigateTo("/auth/signedup");
    }, 250);
  }
  
};

</script>
