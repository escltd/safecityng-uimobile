<template>
  <div>
    <Modal class="bg-zinc-100">
      <div class="flex flex-row items-center w-100% justify-between">
        <div class="font-extrabold text-1rem pb-1">View Request</div>
        <div class="text-3 bg-neutral-300 rounded-full flex justify-center items-center w-5 h-5 cursor-pointer"
             @click="close">
          <i class="i-mdi-close"></i>
        </div>
      </div>


      <div class="flex flex-row justify-between gap-3">
        <div class="relative flex flex-col mt-4">
          <label class="font-medium text-0.8rem text-#525252">Workflow:</label>
      <div  class="font-extrabold case-upper" :class="(requestDetail?.workflow == 'approved'?'text-green-9':'text-red')"> {{requestDetail?.workflow}} </div>
        </div>
        <div class="relative flex flex-col mt-4">
          <label class="font-medium text-0.8rem text-#525252">Typeof</label>
          <div class=""> {{requestDetail?.typeof}} </div>
        </div>
      </div>

      <div class="max-h-[500px] flex flex-col overflow-y-scroll">
        <div v-if="requestDetail?.typeof === 'outflow'" class="relative flex flex-col mt-4">
          <label class="font-medium text-0.8rem text-#525252">Beneficiary</label>
          <div class=""> {{requestDetail?.beneficiary}} </div>
        </div>

        <div v-if="requestDetail?.typeof === 'inflow'" class="relative flex flex-col mt-4">
          <label class="font-medium text-0.8rem text-#525252">Funded Source</label>
          <div class=""> {{requestDetail?.profilebank}} </div>
        </div>
        <div v-if="requestDetail?.typeof === 'inflow'" class="relative flex flex-col mt-4">
          <label class="font-medium text-0.8rem text-#525252">Bank account you paid to</label>
          <div class=""> {{requestDetail?.allocatedbank}} </div>
        </div>

        <div class="relative flex flex-col mt-4">
          <label class="font-medium text-0.8rem text-#525252">Amount</label>
          <div class=""> {{ requestDetail.amounttarget }}</div>
        </div>
      </div>

      <div v-if="requestDetail?.workflow === ('pending' || 'draft')" class="text-right pt-4">
        <button @click.prevent="isLoading ? false : handleUpdate()"
          class="bg-red-5 text-white p-2 rounded-md border-none font-semibold cursor-pointer active:scale-95">
          <i class="i-mdi-close text-white text-[1rem] m-r-1"></i>
          <span :class="isLoading ? 'text-blur-out' : ''">
            {{ !isLoading ? 'Cancel' : 'Cancelling...' }}
          </span>
        </button>
      </div>

    </Modal>
  </div>
</template>

<script setup>
  import { showAlert } from '~/plugins/sweetalert';
  const props = defineProps(["request"]);
  const emit = defineEmits(["close"]);
  const isLoading = ref(false)
  const requestDetail = props.request

  const close = () => {
    emit("close");
  };

  const initialState = reactive({
    allocatedbankid: props?.request?.allocatedbankid,
    amountsource: props?.request?.amountsource,
    amounttarget: props?.request?.amounttarget,
    beneficiaryid: props?.request?.beneficiaryid,
    currencysource: props?.request?.currencysource,
    currencytarget: props?.request?.currencytarget,
    profilebankid: props?.request?.profilebankid,
    typeof: props?.request?.typeof,
    workflow: props?.request?.workflow,
  });

  let formData = reactive({ ...initialState });

  const handleUpdate = async () => {
    isLoading.value = true;

    formData.workflow = 'cancel'

    let response = await HTTP().put(`/api/request/${requestDetail?.id}`, formData).then(
      (response) => {
        return response;
      }).catch((error) => {
        return error.response;
      }
    );  

    showAlert({
      titleText: (response.status == 200 ? 'Success' : 'Failed'),
      text: (response.status == 200 ? "Request has been cancelled" : response?.data?.error),
      icon: (response.status == 200 ? 'success' : 'error'),
    })
    isLoading.value = false;
    
    if (response.status == 200){
      resetForm();
      close();
    }
  };
</script>