<template>
  <div>
    <Modal class="bg-zinc-100">
      <div class="flex flex-row items-center w-100% justify-between">
        <div class="font-extrabold text-1rem pb-1">Fund Your Wallet</div>
        <div
          class="text-3 bg-neutral-300 rounded-full flex justify-center items-center w-5 h-5 cursor-pointer"
          @click="close"
        >
          <i class="i-mdi-close"></i>
        </div>
      </div>
      
      <div v-if="!isSubmit" class="max-h-[500px] flex flex-col relative overflow-y-scroll">
        <div class="relative flex gap-1 mt-4">
          <ReuseablePickerSelectAccount class="w-49%" v-model="formData.currencysource" label="Currency" />
  
          <div class="relative flex flex-col mt-4 w-49%">
            <label class="font-medium text-0.8rem text-#525252">Amount</label>
            <input v-model="formData.amount" type="number" required class="caret-black p-2 bg-#0001 text-[0.9rem] <smw-full border-width-0  text-black"/>
          </div>
        </div>

        <ReuseablePickerSelectBankaccount v-model="fundingbankaccount" :currency="formData.currencysource" label="Funding Source" />        
        <div v-if="fundingbankaccount.id !== undefined" class="relative flex flex-col gap-1 mt-4 text-sm">
          <b class="border-dark border-b-solid border-1">Your Bank Details:</b>
          <span>Bank: {{fundingbankaccount?.bankname}} </span>
          <span>Account: {{ fundingbankaccount?.accountnumber }} </span>
          <span>Country: {{ fundingbankaccount?.country }} </span>
        </div>
        <ReuseablePickerSelectAllocatedbankaccount v-model="allocatedbankaccount" :currency="formData.currencysource" label="Pay into Bank Account" />        
        <div class="relative flex flex-col gap-1 mt-4 text-sm">
          <b class="border-dark border-b-solid border-1">Please make payment to the Bank Details Below:</b>
          <span>Bank: {{allocatedbankaccount?.bankname}} </span>
          <span>Account: {{ allocatedbankaccount?.accountnumber }} </span>
          <span>Narration: {{ paymentNarration }}</span>
          <span>Country: {{ allocatedbankaccount?.country }} </span>
        </div>
        
      </div>
      <div v-if="isSubmit" class="max-h-[500px] flex flex-col gap-4 overflow-y-scroll">
        <div  class="relative flex flex-col gap-1 mt-4 text-sm">
          <b class="border-dark border-b-solid border-1">Please make payment to the Bank Details Below:</b>
          <span>Bank: {{allocatedbankaccount?.bankname}} </span>
          <span>Account: {{ allocatedbankaccount?.accountnumber }} </span>
          <span>Currency: {{ allocatedbankaccount?.currency }} </span>
          <span>Narration: {{ paymentNarration }}</span>
          <span>Country: {{ allocatedbankaccount?.country }} </span>
          <b class="border-dark border-b-solid border-1">Please be advised that it may take up to 24 hours for the money to show up in your wallet.</b>
        </div>
        
      </div>
      
      <div class="text-right pt-4">
        <button v-if="!isSubmit" @click.prevent="isLoading ? false : handleSubmit()"
          class="bg-dark text-white p-2 rounded-md border-none font-semibold cursor-pointer active:scale-95">
          <i class="i-mdi-plus-circle text-white text-[1rem] m-r-1"></i>
          <span :class="isLoading ? 'text-blur-out' : ''">
            {{ !isLoading ? 'Submit' : 'Submitting...' }}
          </span>
        </button>
        <button v-if="isSubmit" @click.prevent="close()"
          class="bg-dark text-white p-2 rounded-md border-none font-semibold cursor-pointer active:scale-95">
          <i class="i-mdi-close text-white text-[1rem] m-r-1"></i>
          <span>
            Close
          </span>
        </button>
      </div>

    </Modal>
  </div>
</template>

<script setup>
  const props = defineProps(["currency"]);
  import { showAlert } from '~/plugins/sweetalert';
  const emit = defineEmits(["close"]);
  const close = () => {
    emit("close");
  };

  let fundingbankaccount = ref({});
  let allocatedbankaccount = ref({});
  let paymentNarration = ref('');
  let isLoading = ref(false); 
  let isSubmit = ref(false); 
  const initialState = reactive({
    typeof: "inflow",
    allocatedbankid: "",
    beneficiaryid: "",
    profilebankid: "",
    currencysource: props?.currency,
    currencytarget: props?.currency,
    amount: 0,
    workflow: "pending"
  });
  let formData = reactive({ ...initialState });

  watchEffect(() => {
    if (allocatedbankaccount.value.id !== undefined){
      paymentNarration.value = generateReferenceCode()
    }
  });

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

    if(formData.currencysource === ""){
      if (errorMsg !== "") {
        errorMsg += "<br/>"
      }
      errorMsg += "<b>Currency</b> is required"
    }
    
    if(formData.amount < 1  || isNaN(formData.amount)){
      if (errorMsg !== "") {
        errorMsg += "<br/>"
      }
      errorMsg += "<b>Amount</b> is required " 
    }
    
    if(fundingbankaccount?.value?.id === "" || fundingbankaccount?.value?.id == undefined){
      if (errorMsg !== "") {
        errorMsg += "<br/>"
      }
      errorMsg += "<b>Funding Source </b> is required "
    }
    
    if(allocatedbankaccount?.value?.id === "" || allocatedbankaccount?.value?.id == undefined){
      if (errorMsg !== "") {
        errorMsg += "<br/>"
      }
      errorMsg += "<b>Allocated bank account </b> is required "
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
    formData.currencytarget = formData.currencysource
    formData.amountsource = formData.amount
    formData.amounttarget = formData.amount
    formData.profilebankid = fundingbankaccount?.value?.id
    formData.allocatedbankid = allocatedbankaccount?.value?.id

    let response = await HTTP().post('/api/request', formData).then(
      (response) => {
        return response;
      }).catch((error) => {
        return error.response;
      }
    );  

    showAlert({
      titleText: (response.status == 200 ? 'Success' : 'Failed'),
      text: (response.status == 200 ? "Request has been created" : response?.data?.error),
      icon: (response.status == 200 ? 'success' : 'error'),
    })
    isLoading.value = false;
    
    if (response.status == 200){
      isSubmit.value = true;
      resetForm();
      // close();
    }

  };
</script>