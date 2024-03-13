<template>
  <div>
    <Modal class="bg-zinc-100">
      <div class="flex flex-row items-center w-100% justify-between">
        <div class="font-extrabold text-1rem pb-1">View Bank Account</div>
        <div class="text-3 bg-neutral-300 rounded-full flex justify-center items-center w-5 h-5 cursor-pointer"
             @click="close">
          <i class="i-mdi-close"></i>
        </div>
      </div>


      <label class="font-medium text-0.8rem text-#525252">Verification: :</label>
      <div  class="font-extrabold case-upper" :class="(bankaccount?.workflow == 'approved'?'text-green-9':'text-red')"> {{bankaccount?.workflow}} </div>

      <div class="max-h-[500px] flex flex-col overflow-y-scroll">
        <div class="relative flex flex-col mt-4">
          <label class="font-medium text-0.8rem text-#525252">Bank Country</label>

          <div class=""> {{bankaccount?.country}} </div>
        </div>
        
        <div class="relative flex flex-col mt-4">
          <label class="font-medium text-0.8rem text-#525252">Bank Name</label>

          <div class=""> {{bankaccount?.bankname}} </div>
        </div>

        <div class="relative flex flex-col mt-4">
          <label class="font-medium text-0.8rem text-#525252">Account Name</label>
          <div class=""> {{ bankaccount?.accountname }} </div>
        </div>
        
        <div class="relative flex flex-col mt-4">
          <label class="font-medium text-0.8rem text-#525252">Account Currency</label>
          <div class=""> {{ bankaccount?.currency }} </div>
        </div>

        <div class="relative flex flex-col mt-4">
          <label class="font-medium text-0.8rem text-#525252">IBAN</label>
          <div class=""> {{ bankaccount?.iban }} </div>
        </div>

        <div class="relative flex flex-col mt-4">
          <label class="font-medium text-0.8rem text-#525252">Bank Code (BIC / SWIFT code)</label>
          <div class=""> {{ bankaccount?.swift }} </div>
        </div>


        <div class="relative flex flex-col mt-4">
          <label class="font-medium text-0.8rem text-#525252">Bank Address</label>
          <div class=""> {{ bankaccount?.bankaddress }} </div>
        </div>
      </div>

    </Modal>
  </div>
</template>

<script setup>
import { showAlert } from '~/plugins/sweetalert';
defineProps(["bankaccount"]);
const emit = defineEmits(["close"]);

const close = () => {
  emit("close");
};



</script>