<template>
  <div>
    <Modal class="bg-zinc-100">
      <div class="flex flex-row items-start w-100% justify-between">
        <div class="font-extrabold text-1rem pb-1">Incident Reporting</div>
        <div
          class="text-3 bg-neutral-300 rounded-full flex justify-center items-center w-5 h-5 cursor-pointer"
          @click="close"
        >
          <i class="i-mdi-close"></i>
        </div>
      </div>
      <div class="w-100% text-2">
        {{ truncateNumber((stage/maxStage)*100,2) }}% Completed
        <div class="bg-green h1" :style="'width:'+truncateNumber((stage/maxStage)*100,2)+'%'"></div>
      </div>

      <div class="max-h-[500px] flex flex-col overflow-y-scroll p-y-2">

        <div v-if="stage==1" class="text-3">
          We understand that it is difficult to recall one's traumatic experiences. 
          However, if you feel uncomfortable at any time, know that you can exit. 
          If you have not hit the submit button, your data will not be saved. <br/> <br/>

          Even though you are sharing your experience anonymously, we need your consent to include your experience in our database of crowdsourced data.
           <br/> <br/>

           <div class="items-center flex">
             <input type="checkbox" class="cursor-pointer" v-model="formData.consent" /> I consent
           </div>

           <br/>
           
           <div @click.prevent="formData.consent!==true ? false : nextStage()" 
           :class="formData.consent!==true ? 'bg-light text-red-100' : 'bg-red-6 text-light'"
           class="w-10  text-center p-x-2 py-1 cursor-pointer rounded items-center">
            Next
          </div>
        </div>

        <div v-if="stage==2" class="text-3 flex flex-col gap-2">
          <div class="">
            Who are you sharing for?<span class="text-red">*</span>

            <div class="text-2">
              In case you are reporting for someone else, please make sure you answer the questions on their behalf
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <div class="flex bg-#0001 b-rounded p-2 items-center cursor-pointer" @click="formData.victim = 'myself'">
              <span class="w-100%">Myself</span>
              <i v-if="formData.victim == 'myself'" class="i-mdi-check text-black"></i>
            </div>
            <div class="flex bg-#0001 b-rounded p-2 items-center cursor-pointer" @click="formData.victim = 'someone else'">
              <span class="w-100%">Someone else</span>
              <i v-if="formData.victim == 'someone else'" class="i-mdi-check text-black"></i>
            </div>
          </div>


          <div class="flex justify-between items-center">
            <div @click="prevStage()"
             class="w-10 text-center p-x-2 py-1 cursor-pointer rounded items-center bg-#0001 text-red">
              Back
            </div>

            <div @click.prevent="formData.victim=='' ? false : nextStage()" 
             :class="formData.victim=='' ? 'bg-light text-red-100' : 'bg-red-6 text-light'"
             class="w-10  text-center p-x-2 py-1 cursor-pointer rounded items-center">
              Next
            </div>

          </div>
        </div>

         <div v-if="stage==3" class="text-3 flex flex-col gap-2">
          <div class="">
            How old are you?<span class="text-red">*</span>

            <div class="text-2">
              In case you are reporting for someone else, please make sure you answer the questions on their behalf
            </div>
          </div>
          
          <div class="flex flex-col ">
            <span class="text-2">
              Please enter age in years. E.g 22
            </span>
            <input v-model="formData.age" type="number"
            class="caret-black p-2 bg-#0001 text-2 <smw-full border-width-0  text-black b-rounded"/>
          </div>


          <div class="flex justify-between items-center">
            <div @click="prevStage()"
             class="w-10 text-center p-x-2 py-1 cursor-pointer rounded items-center bg-#0001 text-red">
              Back
            </div>

            <div @click.prevent="formData.age==0 ? false : nextStage()" 
             :class="formData.age==0 ? 'bg-light text-red-100' : 'bg-red-6 text-light'"
             class="w-10  text-center p-x-2 py-1 cursor-pointer rounded items-center">
              Next
            </div>
          </div>
        </div>

        <div v-if="stage==4" class="text-3 flex flex-col gap-2">
          <div class="">
            Please tell us your gender?<span class="text-red">*</span>

            <div class="text-2">
              In case you are reporting for someone else, please make sure you answer the questions on their behalf
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <div class="flex bg-#0001 b-rounded p-2 items-center cursor-pointer" @click="formData.gender = 'male'">
              <span class="w-100%">Male</span>
              <i v-if="formData.gender == 'male'" class="i-mdi-check text-black"></i>
            </div>
            <div class="flex bg-#0001 b-rounded p-2 items-center cursor-pointer" @click="formData.gender = 'female'">
              <span class="w-100%">Female</span>
              <i v-if="formData.gender == 'female'" class="i-mdi-check text-black"></i>
            </div>
          </div>


          <div class="flex justify-between items-center">
            <div @click="prevStage()"
             class="w-10 text-center p-x-2 py-1 cursor-pointer rounded items-center bg-#0001 text-red">
              Back
            </div>

            <div @click.prevent="formData.gender=='' ? false : nextStage()" 
             :class="formData.gender=='' ? 'bg-light text-red-100' : 'bg-red-6 text-light'"
             class="w-10  text-center p-x-2 py-1 cursor-pointer rounded items-center">
              Next
            </div>

          </div>
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

let maxStage = ref(11)
let stage = ref(1); 

let isLoading = ref(false); 
const initialState = reactive({
  consent: false,
  victim: "",
  age: 0,
  gender: "",

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

const prevStage = () => {
  stage.value += -1;
  if (stage.value <= 1) {
    stage.value = 1;
  }
};

const nextStage = () => {
  stage.value += 1;
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