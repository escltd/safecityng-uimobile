<template>
  <div>
    <ReuseableCreateBankAccount
        v-if="createBankAccount"
        @close="toggleCreateBankAccount"
      />
      <ReuseableViewBankAccount
            v-if="viewBankAccount"
            :bankaccount="bankaccount"
            @close="toggleViewBankAccount({})"
          />
        <ReuseableEditBankAccount
            v-if="editBankAccount"
            :bankaccount="bankaccount"
            @close="toggleEditBankAccount({})"
          />
    <div class="mt-4">
      <div class="rounded-md text-sm items-center font-semibold bg-#F6F6F6 p-2 px-4 flex justify-between items-center cursor-pointer"
        @click="toggleShowBankAccounts"> 
        Bank Accounts <i class="text-[1.5em] cursor-pointer " :class="showBankAccounts ? 'i-mdi-chevron-down' : 'i-mdi-arrow-right-thin'"></i> 
      </div>
      <div v-if="showBankAccounts" class="flex flex-col ">
        <div class="flex flex-col lg:px-6 px-4 py-2">
          <div v-if="myBankaccounts?.length == 0" class="flex  justify-center text-sm pt-2 text-#E34E3B">
            <small class=""><i> No Bank accounts added </i></small>
          </div>
          <div v-else class="flex flex-col text-4 items-center">
            <div class="flex text-4 p-2 w-100% cursor-pointer caret-transparent" v-for="(account, index) in myBankaccounts" :key="index" 
            :class="(account?.workflow == 'approved' ? 'text-green-9' : 'text-red')">
            
                <div class="w-100% text-ellipsis flex items-start " >
                  <i class="i-mdi-eye-outline" @click="toggleViewBankAccount(account)"></i>
                  <div class="w-100% flex flex-col">
                    <small class="p-l-1"> 
                      <small>({{ account?.currency }})</small>
                      {{ account?.accountname }} - {{ account?.accountnumber }}
                    </small>
                    <small><small> {{ account?.bankname }} - {{ account?.country }} </small></small>
                  </div>
                  <div class="w-2 text-right font-bold" @click="toggleEditBankAccount(account)">
                    <i class="i-mdi-square-edit-outline "></i >
                  </div>
                </div>
            
            </div>

          </div>
        </div>

        <small class="text-right">
          <button @click="toggleCreateBankAccount" class="bg-#E34E3B text-white p-1 rounded-md border-none font-semibold cursor-pointer active:scale-95">
            <i class="i-mdi-plus-circle text-white"></i>
            Add
          </button>
        </small>
      </div>  
    </div>
  </div>
</template>
<script setup>
  import { useMyBankaccountStore } from "~/store/mybankaccounts";
  const myBankaccounts = computed(() => {
    return useMyBankaccountStore().myBankaccounts;
  });

  let showBankAccounts = ref(false);
  let viewBankAccount = ref(false);
  let editBankAccount = ref(false);
  let createBankAccount = ref(false);
  let bankaccount = ref({});

  const toggleShowBankAccounts = () => {
    showBankAccounts.value = !showBankAccounts.value;
    if (showBankAccounts.value) {
      useMyBankaccountStore().getMyBankaccountsApiCall();
    }
  };

  const toggleCreateBankAccount = () => {
    createBankAccount.value = !createBankAccount.value;
    if (!createBankAccount.value) {
      useMyBankaccountStore().getMyBankaccountsApiCall();
    }
  };
  
  const toggleViewBankAccount = (account) => {
    viewBankAccount.value = !viewBankAccount.value;
    if (viewBankAccount.value) {
      bankaccount = account;
    } else {
      useMyBankaccountStore().getMyBankaccountsApiCall();
    }
  };
  
  
  const toggleEditBankAccount = (account) => {
    editBankAccount.value = !editBankAccount.value;
    if (editBankAccount.value) {
      bankaccount = account;
    } else {
      useMyBankaccountStore().getMyBankaccountsApiCall();
    }
  };
</script>
