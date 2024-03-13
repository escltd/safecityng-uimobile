<template>
  <div>
    <ReuseableCreateKycDocument
        v-if="createKycDocument"
        @close="toggleCreateKycDocument"
      />
      <ReuseableViewKycDocument
          v-if="viewKycDocument"
          :kyc-document="kycDocument"
          @close="toggleViewKycDocument({})"
        />
      <ReuseableEditKycDocument
          v-if="editKycDocument"
          :kyc-document="kycDocument"
          @close="toggleEditKycDocument({})"
        />
    <div class="mt-4">
      <div class="rounded-md text-sm items-center font-semibold bg-#F6F6F6 p-2 px-4 flex justify-between items-center cursor-pointer"
        @click="toggleshowKycDocuments"> 
        KYC Documents <i class="text-[1.5em] cursor-pointer " :class="showKycDocuments ? 'i-mdi-chevron-down' : 'i-mdi-arrow-right-thin'"></i> 
      </div>
      <div v-if="showKycDocuments" class="flex flex-col ">
          
        <div class="flex flex-col lg:px-6 px-4 py-2">
          <div v-if="myDocuments?.length == 0" class="flex  justify-center text-sm pt-2 text-#E34E3B">
            <small class=""><i> No KYC documents added </i></small>
          </div>
          <div v-else class="flex flex-col text-4 items-center">
            <div class="flex text-4 p-2 w-100% cursor-pointer caret-transparent" v-for="(document, index) in myDocuments" :key="index" 
            :class="(document?.workflow == 'approved' ? 'text-green-9' : 'text-red')">
              
                <div class="w-100% text-ellipsis" @click="toggleViewKycDocument(document)">
                  <i class="i-mdi-eye-outline"></i >
                  <small class="p-l-1"> {{ document?.doctype }} <i><small>({{ document?.code }})</small></i></small>
                </div>
                <div class="w-30% text-right">
                  <small> {{ document?.issuedby }} </small>
                </div>
                <div class="w-2 text-right font-bold" @click.prevent="document?.workflow !== 'pending' ? false : toggleEditKycDocument(document)">
                  <i v-if="document?.workflow == 'pending'" class="i-mdi-square-edit-outline "></i >
                </div>
              
            </div>

          </div>
        </div>

        <small class="text-right">
          <button @click="toggleCreateKycDocument" class="bg-#E34E3B text-white p-1 rounded-md border-none font-semibold cursor-pointer active:scale-95">
            <i class="i-mdi-plus-circle text-white"></i>
            Add
          </button>
        </small>
      </div>  
    </div>
  </div>
</template>
<script setup>
  import { useMyDocumentStore } from "~/store/mydocuments";
  const myDocuments = computed(() => {
    return useMyDocumentStore().myDocuments;
  });
  
  let showKycDocuments = ref(false);
  let viewKycDocument = ref(false);
  let editKycDocument = ref(false);
  let createKycDocument = ref(false);
  let kycDocument = ref({});

  const toggleshowKycDocuments = () => {
    showKycDocuments.value = !showKycDocuments.value;
    if (showKycDocuments.value) {
      useMyDocumentStore().getMyDocumentsApiCall();
    }
  };

  const toggleCreateKycDocument = () => {
    createKycDocument.value = !createKycDocument.value;
    if (!createKycDocument.value) {
      useMyDocumentStore().getMyDocumentsApiCall();
    }
  };
  
  const toggleViewKycDocument = (document) => {
    viewKycDocument.value = !viewKycDocument.value;
    if (viewKycDocument.value) {
      kycDocument = document;
    } else {
      useMyDocumentStore().getMyDocumentsApiCall();
    }
  };
  
  const toggleEditKycDocument = (document) => {
    editKycDocument.value = !editKycDocument.value;
    if (editKycDocument.value) {
      kycDocument = document;
    } else {
      useMyDocumentStore().getMyDocumentsApiCall();
    }
  };

</script>
