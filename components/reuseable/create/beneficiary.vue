<template>
  <div>
    <Modal class="bg-zinc-100">
      <div class="flex flex-row items-center w-100% justify-between">
        <div class="font-extrabold text-1rem pb-1">Add Beneficiary</div>
        <div
          class="text-3 bg-neutral-300 rounded-full flex justify-center items-center w-5 h-5 cursor-pointer"
          @click="close"
        >
          <i class="i-mdi-close"></i>
        </div>
      </div>

      <div class="max-h-[500px] flex flex-col overflow-y-scroll">
          <div class="relative flex flex-col mt-4">
            <label class="font-medium text-0.8rem text-#525252">Beneficiary Name <i class="i-mdi-asterisk text-0.6rem text-red-4 -mt-2"></i></label>
            <input v-model="formData.name" type="text" required class="caret-black p-2 bg-#0001 text-[0.9rem] <smw-full border-width-0  text-black"/>
          </div>

          <div class="relative flex flex-col mt-4">
            <label class="font-medium text-0.8rem text-#525252">Beneficiary Mobile <i class="i-mdi-asterisk text-0.6rem text-red-4 -mt-2"></i></label>
            <input v-model="formData.mobile" type="text" required class="caret-black p-2 bg-#0001 text-[0.9rem] <smw-full border-width-0  text-black"/>
          </div>

          <div class="relative flex flex-col mt-4">
            <label class="font-medium text-0.8rem text-#525252">Beneficiary Email <i class="i-mdi-asterisk text-0.6rem text-red-4 -mt-2"></i></label>
            <input v-model="formData.email" type="text" required class="caret-black p-2 bg-#0001 text-[0.9rem] <smw-full border-width-0  text-black"/>
          </div>

          <div class="flex gap-1">
            <div class="relative flex flex-col mt-4 w-49%">
              <label class="font-medium text-0.8rem text-#525252">Bank Country <i class="i-mdi-asterisk text-0.6rem text-red-4 -mt-2"></i></label>
              <select v-model="formData.country" class="text-ellipsis caret-black p-2 bg-#0001 text-[0.9rem] <smw-full border-solid border-t-0 border-r-0 border-l-0 border-b-0 text-black border-coolgray">
                <option value="" class="text-gray" disabled selected></option>
                <option v-for="(country, index) in isoCountryCurrencies" :key="index" :value="country.countryName">{{ country.countryName }}</option>
              </select>
            </div>

            <div class="relative flex flex-col mt-4 w-49%">
              <label class="font-medium text-0.8rem text-#525252">Currency <i class="i-mdi-asterisk text-0.6rem text-red-4 -mt-2"></i></label>
              <select v-model="formData.currency" class="text-ellipsis caret-black p-2 bg-#0001 text-[0.9rem] <smw-full border-solid border-t-0 border-r-0 border-l-0 border-b-0 text-black border-coolgray">
                <option value="" class="text-gray" disabled selected></option>
                <option v-for="(country, index) in uniqueCurrencies" :key="index" :value="country.currencyCode">{{ country.currencyCode }}</option>
              </select>
            </div>
          </div>
          
          <div class="relative flex flex-col mt-4">
            <label class="font-medium text-0.8rem text-#525252">Bank Name <i class="i-mdi-asterisk text-0.6rem text-red-4 -mt-2"></i></label>
            <input v-model="formData.bankname" type="text" required class="caret-black p-2 bg-#0001 text-[0.9rem] <smw-full border-width-0  text-black"/>
          </div>

          <div class="relative flex flex-col mt-4">
            <label class="font-medium text-0.8rem text-#525252">Account Name <i class="i-mdi-asterisk text-0.6rem text-red-4 -mt-2"></i></label>
            <input v-model="formData.accountname" type="text" required class="caret-black p-2 bg-#0001 text-[0.9rem] <smw-full border-width-0  text-black"/>
          </div>

          <div class="relative flex flex-col mt-4">
            <label class="font-medium text-0.8rem text-#525252">Account Number <i class="i-mdi-asterisk text-0.6rem text-red-4 -mt-2"></i></label>
            <input v-model="formData.accountnumber" type="text" required class="caret-black p-2 bg-#0001 text-[0.9rem] <smw-full border-width-0  text-black"/>
          </div>

          <div class="relative flex flex-col mt-4">
            <label class="font-medium text-0.8rem text-#525252">IBAN</label>
            <input v-model="formData.iban" type="text" required class="caret-black p-2 bg-#0001 text-[0.9rem] <smw-full border-width-0  text-black"/>
          </div>

          <div class="relative flex flex-col mt-4">
            <label class="font-medium text-0.8rem text-#525252">Bank Code (BIC / SWIFT code)</label>
            <input v-model="formData.swift" type="text" required class="caret-black p-2 bg-#0001 text-[0.9rem] <smw-full border-width-0  text-black"/>
          </div>

          <div class="relative flex flex-col mt-4">
            <label class="font-medium text-0.8rem text-#525252">Bank Address</label>
            <input v-model="formData.bankaddress" type="text" required class="caret-black p-2 bg-#0001 text-[0.9rem] <smw-full border-width-0  text-black"/>
          </div>    
        </div> 

        <div class="text-right pt-4">
          <button @click.prevent="isLoading ? false : handleSubmit()"
                  class="bg-dark text-white p-2 rounded-md border-none font-semibold cursor-pointer active:scale-95">
              <i class="i-mdi-plus-circle text-white text-[1rem] m-r-1"></i>
              <span :class="isLoading ? 'text-blur-out' : ''">
                {{ !isLoading ? 'Save' : 'Saving...' }}
              </span>
          </button>
        </div>
      
    </Modal>
  </div>
</template>

<script setup>
import { showAlert } from '~/plugins/sweetalert';

const emit = defineEmits(["close"]);
const close = () => {
  emit("close");
};

let isLoading = ref(false); 
const initialState = reactive({
  name: "",
  mobile: "",
  email: "",
  country: "",
  bankname: "",
  accountname: "",
  accountnumber: "",
  currency: "",
  iban: "",
  swift: "",
  bankaddress: "",
  workflow: "approved",
});
let formData = reactive({ ...initialState });



const pressEnter = (event) => {
  if (event.code === "Enter") {
    handleSubmit();
  }
};


const resetForm = () => {
  isLoading.value = false;
  formData = reactive({ ...initialState });
};

const handleSubmit = async () => {
  
  let errorMsg = ""
  isLoading.value = true;

  if(formData.name === ""){
    if (errorMsg !== "") {
      errorMsg += "<br/>"
    }
    errorMsg += "<b>Name</b> is required"
  }
 
  if(formData.mobile === "" && formData.email === ""){
    if (errorMsg !== "") {
      errorMsg += "<br/>"
    }
    errorMsg += "<b>Mobile or Email</b> is required"
  }

  if(formData.country === ""){
    if (errorMsg !== "") {
      errorMsg += "<br/>"
    }
    errorMsg += "<b>Country</b> is required"
  }

  if(formData.bankname === ""){
    if (errorMsg !== "") {
      errorMsg += "<br/>"
    }
    errorMsg += "<b>Bank name</b> is required"
  }

  if(formData.accountname === ""){
    if (errorMsg !== "") {
      errorMsg += "<br/>"
    }
    errorMsg += "<b>Account name</b> is required"
  }

  if(formData.accountnumber === ""){
    if (errorMsg !== "") {
      errorMsg += "<br/>"
    }
    errorMsg += "<b>Account number</b> is required"
  }

  if(formData.currency === ""){
    if (errorMsg !== "") {
      errorMsg += "<br/>"
    }
    errorMsg += "<b>Currency</b> is required"
  }

  if (errorMsg !== "") {
    isLoading.value = false;
    showAlert({
      titleText: "",
      html: errorMsg,
      icon: "error",
    });
    return;
  }


  let response = await HTTP().post('/api/beneficiary', formData).then(
    (response) => {
      return response;
    }).catch((error) => {
      return error.response;
    }
  );  

  showAlert({
    titleText: (response.status == 200 ? 'Success' : 'Failed'),
    text: (response.status == 200 ? "Beneficiary has been added" : response?.data?.error),
    icon: (response.status == 200 ? 'success' : 'error'),
  })
  isLoading.value = false;
  
  if (response.status == 200){
    resetForm();
    close();
  }

};
</script>