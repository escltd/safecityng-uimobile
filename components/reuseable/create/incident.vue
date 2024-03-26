<template>
  <div>
    <Modal class="bg-zinc-100">
      <div class="flex flex-row items-center w-100% justify-between">
        <div class="font-extrabold text-1rem pb-1">Incident Reporting</div>
        <div
          class="text-3 bg-neutral-300 rounded-full flex justify-center items-center w-5 h-5 cursor-pointer"
          @click="close"
        >
          <i class="i-mdi-close"></i>
        </div>
      </div>

      <div class="max-h-[500px] flex flex-col overflow-y-scroll p-b-3">

        <div v-if="stage==1" class="text-3">
          We understand that it is difficult to recall one's traumatic experiences. 
          However, if you feel uncomfortable at any time, know that you can exit. 
          If you have not hit the submit button, your data will not be saved. <br/> <br/>

          Even though you are sharing your experience anonymously, we need your consent to include your experience in our database of crowdsourced data.
           <br/> <br/>

           <div class="items-center flex">
             <input type="checkbox" value="consent" class="cursor-pointer" v-model="formData.consent" /> I consent
           </div>

           <br/> <br/>

           <span @click="toggleCreateIncident" class="bg-red-6 text-center text-light p-x-2 py-1 text-4 cursor-pointer rounded items-center">
            Next
          </span>
        </div>



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

let stage = ref(1); 

let selectedCountry = ref({});
let isLoading = ref(false); 
const initialState = reactive({
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


  let response = await HTTP().post('/api/incident', formData).then(
    (response) => {
      return response;
    }).catch((error) => {
      return error.response;
    }
  );  

  showAlert({
    titleText: (response.status == 200 ? 'Success' : 'Failed'),
    text: (response.status == 200 ? "Bank account has been added" : response?.data?.error),
    icon: (response.status == 200 ? 'success' : 'error'),
  })
  isLoading.value = false;
  
  if (response.status == 200){
    resetForm();
    close();
  }

};
</script>