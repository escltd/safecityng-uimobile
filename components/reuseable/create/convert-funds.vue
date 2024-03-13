<template>
  <div>
    <Modal class="bg-zinc-100">
      <div class="flex flex-row items-center w-100% justify-between">
        <div class="font-extrabold text-1rem pb-1">Instant Conversion</div>
        <div
          class="text-3 bg-neutral-300 rounded-full flex justify-center items-center w-5 h-5 cursor-pointer"
          @click="close"
        >
          <i class="i-mdi-close"></i>
        </div>
      </div>


      <div class="flex flex-col relative">
        <div class="relative flex gap-1 mt-4">
          <div class="relative flex flex-col mt-4 w-49%">
            <label class="font-medium text-0.8rem text-#525252">Buy or Sell {{ exchangeRate?.currencypair?.substring(0, 3) }} </label>
            <select v-model="exchangeAction" @change="recalculateAmounts()" required class="caret-black p-2 bg-#0001 text-[0.9rem] <smw-full border-width-0  text-black">
              <option value="buy">Buy</option>
              <option value="sell">Sell</option>
            </select>
          </div>
          <ReuseablePickerSelectExchangeRate class="w-49%" v-model="exchangeRate" :value="currency" label="Currency Pair" />
        </div>  

       
       <br/>

        <b class="border-dark border-b-solid border-1">
          Conversion Rate 
          
        </b>
        {{ humanNumber(formData.currencyrate,2)}} {{exchangeRate?.currencypair?.substring(3, 6)}} = 1 {{exchangeRate?.currencypair?.substring(0, 3)}}
        
        

        <div class="relative flex gap-1 mt-4">
          
          <div class="relative flex flex-col mt-4 w-49%">
            <label class="font-medium text-0.8rem text-#525252">Amount in {{ exchangeRate?.currencypair?.substring(0, 3) }}</label>
            <input v-model="exchangeAmountSource" type="number" required class="caret-black p-2 bg-#0001 text-[0.9rem] <smw-full border-width-0  text-black"/>
          </div>

          <div class="relative flex flex-col mt-4 w-49%">
            <label class="font-medium text-0.8rem text-#525252">Amount in {{ exchangeRate?.currencypair?.substring(3, 6) }}</label>
            <input :value="exchangeAmountTarget" type="number" readonly class="caret-black p-2 bg-#0001 text-[0.9rem] <smw-full border-width-0  text-black"/>
          </div>
        </div>
        
        <div v-if="false" class="pt-5 gap-1 flex"> 
          <div class="bg-gray w-50% text-center">SOURCE</div> 
          <div class="bg-gray w-50% text-center">TARGET</div>
        </div>
        <div v-if="false" class=" gap-1 flex"> 
            <div class=" w-50% text-center"> {{ formData.currencysource }}</div> 
            <div class=" w-50% text-center">{{ formData.currencytarget }}</div>
        </div>
        <div v-if="false" class=" gap-1 flex"> 
          <div class=" w-50% text-center">{{ formData.amountsource }}</div> 
          <div class=" w-50% text-center">{{ formData.amounttarget }}</div>
        </div>

      </div>
      
      <div class="text-right pt-4">
        <button @click.prevent="isLoading ? false : handleSubmit()"
          class="bg-dark text-white p-2 rounded-md border-none font-semibold cursor-pointer active:scale-95">
          <i class="i-mdi-plus-circle text-white text-[1rem] m-r-1"></i>
          <span :class="isLoading ? 'text-blur-out' : ''">
            {{ !isLoading ? 'Submit' : 'Submitting...' }}
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

  let exchangeRate = ref({});
  let exchangeAmountSource = ref(0);
  let exchangeAmountTarget = ref(0);

  let exchangeAction = ref('buy');
  let isLoading = ref(false); 
  let isconvertRate = ref(false); 
  const initialState = reactive({
    typeof: "convert",
    allocatedbankid: "",
    beneficiaryid: "",
    profilebankid: "",
    currencysource: props?.currency,
    currencytarget: "",
    amounttarget: 0,
    amountsource: 0,
    workflow: "approved"
  });
  let formData = reactive({ ...initialState });

  let searchParams = reactive({ workflow:'enabled',  profile: '', currencypair: '',  page:0, limit:20 })

  const recalculateAmounts = () => {
    formData.currencypair = exchangeRate?.value?.currencypair
    exchangeAmountTarget.value = truncateNumber(exchangeAmountSource?.value*formData.currencyrate,2)
    switch (exchangeAction?.value) {
      case 'buy':
        formData.currencysource = exchangeRate?.value?.currencypair?.substring(3, 6);
        formData.currencytarget = exchangeRate?.value?.currencypair?.substring(0, 3);
        formData.currencyrate = exchangeRate?.value?.rate;
        formData.amountsource = exchangeAmountTarget?.value
        formData.amounttarget = exchangeAmountSource?.value
        break;
      case 'sell':
        formData.currencysource = exchangeRate?.value?.currencypair?.substring(0, 3);
        formData.currencytarget = exchangeRate?.value?.currencypair?.substring(3, 6);
        formData.currencyrate = exchangeRate?.value?.ratereversed;
        formData.amountsource = exchangeAmountSource?.value
        formData.amounttarget = exchangeAmountTarget?.value
        break;
      default:
        break;
    }
  }

  watchEffect(() => {
    // if (exchangeRate?.value?.id !== undefined) {
      recalculateAmounts()
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
      errorMsg += "<b>Base Currency</b> is required"
    }
    
    if(formData.currencytarget === ""){
      if (errorMsg !== "") {
        errorMsg += "<br/>"
      }
      errorMsg += "<b>Target Currency</b> is required"
    }
    
    if(formData.currencypair === ""){
      if (errorMsg !== "") {
        errorMsg += "<br/>"
      }
      errorMsg += "<b>Currency Pair</b> is required"
    }
    
    if(formData.currencyrate === 0){
      if (errorMsg !== "") {
        errorMsg += "<br/>"
      }
      errorMsg += "<b>Currency Rate</b> is required"
    }
    
    if(formData.amountsource === ""){
      if (errorMsg !== "") {
        errorMsg += "<br/>"
      }
      errorMsg += "<b>Amount Source</b> is required"
    }
    
    if(formData.amounttarget === 0){
      if (errorMsg !== "") {
        errorMsg += "<br/>"
      }
      errorMsg += "<b>Amount Target</b> is required"
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
      window.location.reload(true)
      resetForm();
      close();
    }
  };

  // const getExchangeRate = async () => {    
  //   exchangeRatePair.value = searchParams.currencypair
  //   const response = await HTTP().post('/api/exchangerates/search', searchParams).then(
  //     (response) => {
  //       return response;
  //     }).catch((error) => {
  //       return error.response;
  //     })
  //   exchangeRate.value = (response.status === 200) ? response.data?.[0] : {}
  //   searchParams.currencypair = ''
  //   if (response.status !== 200){
  //     showAlert({
  //       titleText: 'Failed',
  //       text: response?.data?.error,
  //       icon: 'error',
  //     })
  //   }
  // }

</script>