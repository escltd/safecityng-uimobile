<template>
  <div class="flex flex-col mt-4">
    <label class="font-medium text-0.8rem text-#525252">{{label}} <i class="i-mdi-asterisk text-0.6rem text-red-4 -mt-2"></i></label>
    <div class="flex flex-row gap-3 rounded-lg text-gray items-center relative">
      <input v-model="searchParams.accountname" @click="clickSearch" readonly type="text" required class="caret-black p-2 bg-#0001 text-[0.9rem] <smw-full border-width-0 w-100% text-black"/>
      <img @click="clickSearch" src="~/assets/img/search.png" class="w-3 absolute right-0 pr-1" alt="" />
    </div>
    <div class="cursor-pointer caret-transparent relative w-100% z-99">
      <div class="absolute w-full text-dark bg-zinc-100 max-h-[70px] overflow-y-scroll rounded-b"
      :class="searchResults.length>0?'min-h-[25px]':''">
        <div v-if="isLoading" class="flex justify-center w-100% p-y-2 bg-dark">
          <i class="i-mdi-loading animate-spin text-white"></i>
        </div>
        <div v-for="(result, index) in searchResults" :key="index" class="p-y-1 w-100% flex hover:text-white hover:bg-dark cursor-pointer rounded-b" @click="setValue(result)">
          <span class="p-x-2">{{ result.accountname }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { showAlert } from '~/plugins/sweetalert';
  const props = defineProps(["label","value","currency",]);
  const emits = defineEmits(["pressenter", "update"]);
  const model = defineModel()

  let selected = ref({})
  let searchResults = ref([])
  let isLoading = ref(false)
  const initialstate = reactive({ workflow:'approved', accountname: '', 
  currency: props?.currency, page:0, limit: 50 })

  let searchParams = reactive({ ...initialstate })
  const resetSearchParams = () => {
    selected.value = {}
    searchParams = reactive({ ...initialstate })
  }

  watch(() => props.currency, (newVal, oldVal) => {
    if (newVal){
      searchParams.currency = props.currency
      searchParams.accountname = ""
      selected.value = {}
      searchResults.value = []
    }
  }, { immediate: true });

  const setValue = (value) => {
    selected.value = value
    searchParams.accountname = value.accountname
    searchResults.value = []
    model.value = value
  }

  const pressEnter = (event) => {
    if (event.code === "Enter") {
      emit("pressenter", event)
    } else {
      delayKeyup(getSearchResults(), 500)
    }
  };

  const clickSearch = () => {
    if(searchParams.accountname!=='') {
      searchParams.accountname = ''
    }
    getSearchResults()
  }

  const getSearchResults = async () => {
    if(isLoading.value) return
    
    if (!props.currency) {
      return showAlert({
        titleText:'Failed',
        text:"Please select an account",
        icon:'error',
      })
    }

    isLoading.value = true
    searchResults.value =[]
    const response = await HTTP().post('/api/beneficiarys/search', searchParams).then(
    (response) => {
      return response
    }).catch((error) => {
      return error.response
    })

    searchResults.value = (response.status === 200) ? response.data : []
    isLoading.value = false
    if (response.data.length === 0) {
      showAlert({
        titleText:'Create Beneficiary Account',
        text:"You have not created "+props.currency+" Beneficiary account.",
        icon:'info',
      })
    }
  }
</script>