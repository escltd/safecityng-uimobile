<template>
  <div>
    <NuxtLayout name="dashboard">

      
      <MapsCurrentPosition />

            
    </NuxtLayout>
  </div>
</template>

<script setup>
  import { useMyAccountsStore } from '~/store/myaccounts';
  import { showAlert } from '~/plugins/sweetalert';

  const defaultAccount = computed(() => {
    return useMyAccountsStore().defaultAccount;
  });

  const selected = ref({})
  const initialstate = reactive({ workflow:'', typeof: '', profile: '', currencysource: '', currencytarget: '',  page:0, limit:20 })
  let searchParams = reactive({ ...initialstate })
  const resetSearchParams = () => {
    selected.value = {}
    searchParams = reactive({ ...initialstate })
  }

  let searchRequests = ref([])

  let pickCurrency = ref(false);
  let showCreateConvertFund = ref(false);
  let showCreateFundWallet = ref(false);
  let showCreateSendMoney = ref(false);
  let showBalance = ref(true);
  let viewRequest = ref(false);
  let request = ref({});

  onBeforeMount( async ()   => {
    await getSearchResults()
  })

  const toggleViewRequest = (value) => {
    viewRequest.value = !viewRequest.value;
    if (viewRequest.value) {
      request = value;
    } else {
      request = {};
      getSearchResults()
    }
  };

  const togglePickCurrency = () => {
    pickCurrency.value = !pickCurrency.value;
    if (!pickCurrency.value) {
    
    }
  };
  
  const referesh = () => {
    window.location.reload(true)
  }
  const toggleShowCreateFundWallet = () => {
    getSearchResults()
    showCreateFundWallet.value = !showCreateFundWallet.value;
  };

  const toggleShowCreateSendMoney = () => {
    getSearchResults()
    showCreateSendMoney.value = !showCreateSendMoney.value;
  };

  const toggleShowCreateConvertFund = () => {
    getSearchResults()
    showCreateConvertFund.value = !showCreateConvertFund.value;
  };

  const getSearchResults = async () => {
    resetSearchParams()
    
    const response = await HTTP().post('/api/requests/search', searchParams).then(
      (response) => {
        return response;
      }).catch((error) => {
        return error.response;
      })
    searchRequests.value = (response.status === 200) ? response.data : []
    if (response.status !== 200){
      showAlert({
        titleText: 'Failed',
        text: response?.data?.error,
        icon: 'error',
      })
    }
  }
</script>