<template>
  <div>
    <NuxtLayout name="dashboard">
      <ReuseableCreateBeneficiary
        v-if="createBeneficiary"
        @close="toggleCreateBeneficiary"
      />
      <ReuseableViewBeneficiary
          v-if="viewBeneficiary"
          :beneficiary="curBeneficiarby"
          @close="toggleViewBeneficiary({})"
        />
      <ReuseableEditBeneficiary
          v-if="editBeneficiary"
          :beneficiary="curBeneficiarby"
          @close="toggleEditBeneficiary({})"
        />
        
      <div class="flex flex-col m-2 rounded caret-transparent">

        <div class="relative flex flex-col bg-white p-2 p-b-3">
          <label class="text-[1rem] text-center p-b-2 w-100% text-0.8rem text-#525252">Manage Beneficiaries</label>
          <div class="flex">
            <button @click="toggleCreateBeneficiary">
                <i class="i-mdi-plus text-[1.2rem] text-black"></i>
              </button>
            <input type="text" required class="w-100% caret-black p-2 bg-#0001 text-[0.9rem] <smw-full border-width-0  text-black"/>
            <button>
              <i class="i-mdi-magnify text-[1.2rem] text-black"></i>
            </button>
          </div>
        </div>

        <div class="flex flex-col lg:px-6 p-2">
            <div v-if="myBeneficiarys?.length == 0" class="flex  justify-center text-sm pt-2 text-#E34E3B">
              <small class=""><i> No Beneficiary added </i></small>
            </div>
            <div v-else class="flex flex-col text-4 items-center">
              <div class="flex text-4 p-3 w-100% bg-white m-y-1 cursor-pointer caret-transparent" v-for="(beneficiary, index) in myBeneficiarys" :key="index">
              
                  <div class="w-100% text-ellipsis" @click="toggleViewBeneficiary(beneficiary)">
                    <i class="i-mdi-eye-outline"></i >
                    <small class="p-l-1"> {{ beneficiary?.accountname }}  <i><small>({{ beneficiary?.bankname }} - {{ beneficiary?.country }})</small></i></small>
                  </div>
                  <div class="w-20% text-right">
                    <small> {{ beneficiary?.currency }} </small>
                  </div>
                  <div class="w-2 text-right font-bold" @click="toggleEditBeneficiary(beneficiary)">
                    <i class="i-mdi-square-edit-outline "></i >
                  </div>
              
              </div>

            </div>
          </div>

      </div>
    </NuxtLayout>
  </div>
</template>
<script setup>
  import { useMyBeneficiaryStore } from "~/store/mybeneficiarys";
  const myBeneficiarys = computed(() => {
    return useMyBeneficiaryStore().myBeneficiarys;
  });

  let curBeneficiarby = ref({})

  let viewBeneficiary = ref(false);
  let editBeneficiary = ref(false);
  let createBeneficiary = ref(false);

  const toggleCreateBeneficiary = () => {
    createBeneficiary.value = !createBeneficiary.value;
    if (!createBeneficiary.value) {
      useMyBeneficiaryStore().getMyBeneficiarysApiCall();
    }
  };
  
  const toggleViewBeneficiary = (beneficiary) => {
    viewBeneficiary.value = !viewBeneficiary.value;
    if (viewBeneficiary.value) {
      curBeneficiarby = beneficiary;
    } else {
      useMyBeneficiaryStore().getMyBeneficiarysApiCall();
    }
  };
  
  const toggleEditBeneficiary = (beneficiary) => {
    editBeneficiary.value = !editBeneficiary.value;
    if (editBeneficiary.value) {
      curBeneficiarby = beneficiary;
    } else {
      useMyBeneficiaryStore().getMyBeneficiarysApiCall();
    }
  };
</script>