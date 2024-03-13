<template>
  <div>
    <Modal class="bg-zinc-100">
      <div class="flex flex-row items-center w-100% justify-between">
        <div class="font-extrabold text-center w-100% text-1rem pb-1">Select Currency Account</div>
        <div class="text-3 bg-neutral-300 rounded-full flex justify-center items-center w-5 h-5 cursor-pointer"
             @click="isLoading ? false : close()">
          <i class="i-mdi-close"></i>
        </div>
      </div>

      <div class="max-h-[250px] flex flex-col overflow-y-scroll p-2">
        <div v-if="isLoading" class="flex flex-col justify-center items-center w-100% p-y-5">
          <i class="i-mdi-loading animate-spin text-dark"></i>
          <small><i>please wait...</i></small>
        </div>

        <div v-if="!isLoading && searchResults.length>0">
          <div v-for="(result, index) in searchResults" :key="index" class="text-[1.5rem] flex flex-row items-center justify-center p-2 cursor-pointer hover:bg-neutral-100"
          @click="togglePickCurrency(result)">
            {{result.code}}
          </div>
            
        </div>
      </div>

      </Modal>
    </div>
</template>

<script setup>
const emit = defineEmits(["close"]);

const close = () => {
  emit("close");
};

import { showAlert } from '~/plugins/sweetalert';
import { useCurrencyStore } from '~/store/currency';
import { useMyAccountsStore } from '~/store/myaccounts';

const initialstate = reactive({ workflow:'enabled', name: "", page:0, limit: 100 })
let searchParams = reactive({ ...initialstate })
let searchResults = ref([])

let isLoading = ref(false)
onMounted( async() => {
  await getSearchResults()
})

const getSearchResults = async () => {
  if(isLoading.value) return

  isLoading.value = true
  
  searchResults.value =[]
  searchResults.value = await useCurrencyStore().getCurrencys()

  isLoading.value = false
}


const togglePickCurrency = async (value) => {
  if(isLoading.value) return
  isLoading.value = true

  //make api call to createAccountIfExists

  const formData = { currency: value.code, isdefault: true, workflow: 'approved' }
  const response = await HTTP().post('/api/account', formData).then(
    (response) => {
      return response;
    }).catch((error) => {
      return error.response;
    }
  );  

  if (response?.status !== 200) {
    showAlert({
      titleText: (response?.status == 200 ? 'Success' : 'Failed'),
      text: (response?.status == 200 ? "Currency account selected" : response?.data?.error),
      icon: (response?.status == 200 ? 'success' : 'error'),
    }) 
  }

  if (response?.status == 200) {
    await useMyAccountsStore().getMyAccountsApiCall()
  }

  emit("close");
  isLoading.value = false
};
</script>