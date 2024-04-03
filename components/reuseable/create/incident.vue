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

        <div v-if="stage==0" class="text-3">
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

        <div v-if="stage==1" class="text-3 flex flex-col gap-2">
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

         <div v-if="stage==2" class="text-3 flex flex-col gap-2">
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

        <div v-if="stage==3" class="text-3 flex flex-col gap-2">
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

        <div v-if="stage==4" class="text-3 flex flex-col gap-2">
          <div class="">
            Please tell us your experience <span class="text-red">*</span>
          </div>

          <div class="flex flex-col ">
            <input v-model="formData.experience" type="text"
            class="caret-black p-2 bg-#0001 text-2 <smw-full border-width-0  text-black b-rounded"/>
          </div>


          <div class="flex justify-between items-center">
            <div @click="prevStage()"
             class="w-10 text-center p-x-2 py-1 cursor-pointer rounded items-center bg-#0001 text-red">
              Back
            </div>

            <div @click.prevent="formData.experience=='' ? false : nextStage()" 
             :class="formData.experience=='' ? 'bg-light text-red-100' : 'bg-red-6 text-light'"
             class="w-10  text-center p-x-2 py-1 cursor-pointer rounded items-center">
              Next
            </div>

          </div>
        </div>

        <div v-if="stage==5" class="text-3 flex flex-col gap-2">
          <div class="">
            Please select date the incident occured<span class="text-red">*</span>
          </div>

          <div class="flex flex-col ">
            <input v-model="formData.date" type="date"
            class="caret-black p-2 bg-#0001 text-2 <smw-full border-width-0  text-black b-rounded"/>
          </div>


          <div class="flex justify-between items-center">
            <div @click="prevStage()"
             class="w-10 text-center p-x-2 py-1 cursor-pointer rounded items-center bg-#0001 text-red">
              Back
            </div>

            <div @click.prevent="formData.date=='' ? false : nextStage()" 
             :class="formData.date=='' ? 'bg-light text-red-100' : 'bg-red-6 text-light'"
             class="w-10  text-center p-x-2 py-1 cursor-pointer rounded items-center">
              Next
            </div>

          </div>
        </div>

        <div v-if="stage==6" class="text-3 flex flex-col gap-2">
          <div class="">
            Please select time range the incident occured<span class="text-red">*</span>
          </div>

          <div class="flex flex-row w-full justify-between items-center">
            <div class="flex flex-col w-49%">
              <div class="text-2">
                Start time
              </div>
              <input v-model="formData.start_time" type="time"
              class="caret-black p-2 bg-#0001 text-2 <smw-full border-width-0  text-black b-rounded"/>
            </div>
            
            <div class="flex flex-col w-49%">
              <div class="text-2">
                End time
              </div>
              <input v-model="formData.end_time" type="time"
              class="caret-black p-2 bg-#0001 text-2 <smw-full border-width-0  text-black b-rounded"/>
            </div>
          </div>
          <div class="flex flex-row w-full justify-center items-center">
            <div class="text-red-6 text-2.5 hover:bg-light rounded p-2 cursor-pointer"> CLEAR TIME RANGE</div>
          </div>


          <div class="flex justify-between items-center pt-3">
            <div @click="prevStage()"
             class="w-10 text-center p-x-2 py-1 cursor-pointer rounded items-center bg-#0001 text-red">
              Back
            </div>

            <div @click.prevent="formData.start_time=='' ? false : nextStage()" 
             :class="formData.start_time=='' ? 'bg-light text-red-100' : 'bg-red-6 text-light'"
             class="w-10  text-center p-x-2 py-1 cursor-pointer rounded items-center">
              Next
            </div>
          </div>
        </div>
        
        <div v-if="stage==7" class="text-3 flex flex-col gap-2">
          <div class="">
            Have you reported the incident to the relevant authorities?<span class="text-red">*</span>
          </div>

          <div class="flex flex-col gap-2">
            <div class="flex bg-#0001 b-rounded p-2 items-center cursor-pointer" @click="formData.reporting = 'Yes I did'">
              <span class="w-100%">Yes I did</span>
              <i v-if="formData.reporting == 'Yes I did'" class="i-mdi-check text-black"></i>
            </div>
            <div class="flex bg-#0001 b-rounded p-2 items-center cursor-pointer" @click="formData.reporting = 'I will, in the future'">
              <span class="w-100%">I will, in the future</span>
              <i v-if="formData.reporting == 'I will, in the future'" class="i-mdi-check text-black"></i>
            </div>
            <div class="flex bg-#0001 b-rounded p-2 items-center cursor-pointer" @click="formData.reporting = 'I’m not sure if I want to'">
              <span class="w-100%">I’m not sure if I want to</span>
              <i v-if="formData.reporting == 'I’m not sure if I want to'" class="i-mdi-check text-black"></i>
            </div>
            <div class="flex bg-#0001 b-rounded p-2 items-center cursor-pointer" @click="formData.reporting = 'No'">
              <span class="w-100%">No</span>
              <i v-if="formData.reporting == 'No'" class="i-mdi-check text-black"></i>
            </div>
            <div class="flex bg-#0001 b-rounded p-2 items-center cursor-pointer" @click="formData.reporting = 'I tried'">
              <span class="w-100%">I tried</span>
              <i v-if="formData.reporting == 'I tried'" class="i-mdi-check text-black"></i>
            </div>
          </div>


          <div class="flex justify-between items-center">
            <div @click="prevStage()"
             class="w-10 text-center p-x-2 py-1 cursor-pointer rounded items-center bg-#0001 text-red">
              Back
            </div>

            <div @click.prevent="formData.reporting=='' ? false : nextStage()" 
             :class="formData.reporting=='' ? 'bg-light text-red-100' : 'bg-red-6 text-light'"
             class="w-10  text-center p-x-2 py-1 cursor-pointer rounded items-center">
              Next
            </div>

          </div>
        </div>

        <div v-if="stage==8" class="text-3 flex flex-col w-100% gap-2">
          <div class="">
            What category would you classify the incident<span class="text-red">*</span>
          </div>

          <div class="flex flex-col gap-2 w-100% ">
            <div v-for="(category, index) in searchCategories" :key="index" class="flex flex-col bg-#0001 b-rounded p-2 items-center cursor-pointer" @click="formData.category = category.title">
              <span class="w-100%">{{category.title}}</span>
              <i v-if="formData.category == category.title" class="i-mdi-check text-black"></i>
            </div>
          </div>

          <div class="flex flex-row justify-between w-100% items-center">
            <div @click="prevStage()"
             class="w-10 text-center p-x-2 py-1 cursor-pointer rounded items-center bg-#0001 text-red">
              Back
            </div>

            <div @click.prevent="formData.category=='' ? false : nextStage()" 
              :class="formData.category=='' ? 'bg-light text-red-100' : 'bg-red-6 text-light'"
              class="w-10  text-center p-x-2 py-1 cursor-pointer rounded items-center">
                Next
            </div>
          </div>
        </div>

        <div v-if="stage==9" class="text-3 flex flex-col gap-2">
          <div class="">
            Would you like to add anything else about your experience?<span class="text-red">*</span>
          </div>

          <div class="flex flex-col ">
            <input v-model="formData.addtional_detail" type="text"
            class="caret-black p-2 bg-#0001 text-2 <smw-full border-width-0  text-black b-rounded"/>
          </div>


          <div class="flex justify-between items-center">
            <div @click="prevStage()"
             class="w-10 text-center p-x-2 py-1 cursor-pointer rounded items-center bg-#0001 text-red">
              Back
            </div>

            <div @click.prevent="formData.addtional_detail=='' ? false : nextStage()" 
              :class="formData.addtional_detail=='' ? 'bg-light text-red-100' : 'bg-red-6 text-light'"
              class="w-10  text-center p-x-2 py-1 cursor-pointer rounded items-center">
                Next
            </div>

          </div>
        </div>
        
        <div v-if="stage==10" class="text-3 flex flex-col gap-2">
          <div class="">
            Please tell us where the incident took place<span class="text-red">*</span>

            <div class="text-2">
              Locate address on map*
            </div>
          </div>

          <div class="flex flex-col ">
            <span class="text-2">
              Start typing and select your location/nearest location from suggestions
            </span>
            <input v-model="formData.location" type="text"
            class="caret-black p-2 bg-#0001 text-2 <smw-full border-width-0  text-black b-rounded"/>
          </div>

          <div class="flex flex-col ">
            <span class="text-2">
              Enter Building/Street/Locality
            </span>
            <input v-model="formData.location" type="text"
            class="caret-black p-2 bg-#0001 text-2 <smw-full border-width-0  text-black b-rounded"/>
          </div>

          <div class="text-2 font-semibold">
            The information that you share with us anonymously helps shape policy and decision making. Please confirm that you are submitting information true to your knowledge. You can go back and edit your answers before submitting, if needed.
          </div>

          <div class="flex flex-row items-center">
            <div class="flex flex-col">
              <input type="checkbox"
              class="caret-black p-2 bg-#0001 text-2 <smw-full border-width-0  text-black b-rounded"/>
            </div>
            <div class="p-3">I confirm</div>
          </div>


          <div class="flex justify-between items-center">
            <div @click="prevStage()"
             class="w-10 text-center p-x-2 py-1 cursor-pointer rounded items-center bg-#0001 text-red">
              Back
            </div>

            <div @click.prevent="formData.addtional_detail=='' ? false : nextStage()" 
              :class="formData.addtional_detail=='' ? 'bg-light text-red-100' : 'bg-red-6 text-light'"
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
let stage = ref(0);
let searchCategories = ref([])

let isLoading = ref(false); 
const initialState = reactive({
  consent: false,
  victim: "",
  age: 0,
  gender: "",
  date: "",
  start_time: "",
  end_time: "",
  experience: "",
  violence: "",
  reporting: "",
  category: "",
  addtional_detail: "",

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
let searchParams = reactive({ workflow:'', title: '', description: '', page:0, limit:20 })

onBeforeMount( async ()   => {
    await getSearchCategories()
  })

  const getSearchCategories = async () => {
    // resetSearchParams()    
    const response = await HTTP().post('/api/categorys/search', searchParams).then(
      (response) => {
        return response;
      }).catch((error) => {
        return error.response;
      })

    searchCategories.value = (response.status === 200) ? response.data : []
    if (response.status !== 200){
      showAlert({
        titleText: 'Failed',
        text: response?.data?.error,
        icon: 'error',
      })
    }
  }


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