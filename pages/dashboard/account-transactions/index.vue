<template>
  <div>
    <NuxtLayout name="dashboard">
      <ReuseableViewTransaction
        v-if="viewTransaction"
        :transaction="selectedTransaction"
        @close="toggleViewTransaction({})"
      />
      <div class="flex flex-col m-2 rounded caret-transparent">
        <div class="relative flex flex-col bg-white p-2 p-b-3">
          <label class="text-[1rem] text-center p-b-2 w-100% text-0.8rem text-#525252">Transactions</label>
          <div class="flex justify-end">
            <div @click="togglePickCurrency" class="rounded-4 border-width-1 border-solid p-x-3 p-y-1 bg-#f3f3f3 font-extrabold caret-transparent cursor-pointer">
              <span v-if="defaultAccount?.currency == null">Select Currency</span>
              <span v-else>{{defaultAccount?.currency}} <i class="text-[0.7rem] i-mdi-chevron-down"></i></span>
            </div>
          </div>
        </div>

        <div class="flex flex-col lg:px-6 p-2">

            <div class="w-100% flex text-white">
              <div class="w-4/12 overflow-hidden text-ellipsis whitespace-nowrap text-1rem font-semibold p-2 bg-dark border-solid border-zinc-100 border-1">
                Debit
              </div>
              <div class="w-4/12 overflow-hidden text-ellipsis whitespace-nowrap text-1rem font-semibold p-2 bg-dark border-solid border-zinc-100 border-1">
                Credit
              </div>
              <div class="w-4/12 overflow-hidden text-ellipsis whitespace-nowrap text-1rem font-semibold p-2 bg-dark border-solid border-zinc-100 border-1">
                Balance
              </div>
            </div>

            <div v-if="searchTransactions?.length == 0" class="flex  justify-center text-sm pt-2 text-#E34E3B">
              <small class=""><i> No Transaction found </i></small>
            </div>
            <div v-else class="flex flex-col text-4 items-center">
              <div class="flex text-4  w-100% bg-white cursor-pointer caret-transparent" 
                v-for="(transaction, index) in searchTransactions" :key="index" @click="toggleViewTransaction(transaction)">
                <div class="w-4/12 overflow-hidden text-ellipsis whitespace-nowrap text-1rem font-semibold p-2 border-solid border-zinc-100 border-1 cursor-pointer capitalize">
                    {{ humanNumber(transaction?.debit,2) }} 
                </div>
                <div class="w-4/12 overflow-hidden text-ellipsis whitespace-nowrap text-1rem font-semibold p-2 border-solid border-zinc-100 border-1 cursor-pointer capitalize">
                    {{ humanNumber(transaction?.credit,2) }} 
                </div>
                <div class="w-4/12 overflow-hidden text-ellipsis whitespace-nowrap text-1rem font-semibold p-2 border-solid border-zinc-100 border-1 cursor-pointer capitalize">
                    {{ humanNumber(transaction?.balance,2) }} 
                  </div>
              </div>

            </div>
          </div>

      </div>
    </NuxtLayout>
  </div>
</template>
<script setup>
  import { useMyAccountsStore } from '~/store/myaccounts';
  const defaultAccount = computed(() => {
    return useMyAccountsStore().defaultAccount;
  });

  let pickCurrency = ref(false);
  let viewTransaction = ref(false);
  let searchTransactions = ref([])
  let selectedTransaction = ref({});

  const initialstate = reactive({ workflow:'', currency: defaultAccount.value?.currency, transtype: '',  page:0, limit:20 })
  let searchParams = reactive({ ...initialstate })

  const resetSearchParams = () => {
    // selected.value = {}
    searchParams = reactive({ ...initialstate })
  }

  const toggleViewTransaction = (value) => {
    viewTransaction.value = !viewTransaction.value;
    if (viewTransaction.value) {
      selectedTransaction = value;
    } else {
      selectedTransaction = {};
    }
  };

  const togglePickCurrency = () => {
    pickCurrency.value = !pickCurrency.value;
    if (!pickCurrency.value) {
    
    }
  };

  onBeforeMount( async ()   => {
    await getSearchTransactions()
  })

  const getSearchTransactions = async () => {
    // resetSearchParams()    
    const response = await HTTP().post('/api/transactions/search', searchParams).then(
      (response) => {
        return response;
      }).catch((error) => {
        return error.response;
      })

    searchTransactions.value = (response.status === 200) ? response.data : []
    if (response.status !== 200){
      showAlert({
        titleText: 'Failed',
        text: response?.data?.error,
        icon: 'error',
      })
    }
  }
</script>