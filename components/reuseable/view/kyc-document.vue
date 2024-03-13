<template>
  <div>
    <Modal class="bg-zinc-100">
      <div class="flex flex-row items-center w-100% justify-between">
        <div class="font-extrabold text-1rem pb-1">View KYC Document</div>
        <div class="text-3 bg-neutral-300 rounded-full flex justify-center items-center w-5 h-5 cursor-pointer"
             @click="close">
          <i class="i-mdi-close"></i>
        </div>
      </div>


      <div class="flex flex-col justify-center items-center p-t-5">
        <a download :href="'../../'+kycDocument?.filepath" target="_blank" class="p-1 rounded text-dark cursor-pointer">
          <div class="p-1 rounded bg-zinc-100 text-dark cursor-pointer">
              <i class="text-[5em] i-mdi-download-box-outline "></i> 
          </div>
          <label class="font-medium text-0.7rem text-#525252">click to download</label>
        </a>
      </div>
      <label class="font-medium text-0.8rem text-#525252">Verification: :</label>
      <div  class="font-extrabold case-upper" :class="(kycDocument?.workflow == 'approved'?'text-green-9':'text-red')"> {{kycDocument?.workflow}} </div>


      <div class="relative flex flex-col mt-4">
        <label class="font-medium text-0.8rem text-#525252">Document Type</label>

        <div class=""> {{kycDocument?.doctype}} </div>
      </div>

      <div class="relative flex flex-col mt-4">
        <label class="font-medium text-0.8rem text-#525252">Document Number</label>
        <div class=""> {{ kycDocument?.code }} </div>
      </div>


      <div class="relative flex flex-col mt-4">
        <label class="font-medium text-0.8rem text-#525252">Issuing Country</label>
        <div class=""> {{ kycDocument?.issuedby }} </div>
      </div>

      <div class="relative flex flex-col mt-4">
        <label class="font-medium text-0.8rem text-#525252">Expires On</label>
        <div class=""> {{ kycDocument?.validuntil }} </div>
      </div>

    </Modal>
  </div>
</template>

<script setup>
import { showAlert } from '~/plugins/sweetalert';
defineProps(["kycDocument"]);
const emit = defineEmits(["close"]);

const close = () => {
  emit("close");
};



</script>