<template>
  <div>
    <Modal class="bg-zinc-100">
      <div class="flex flex-row items-center w-100% justify-between">
        <div class="font-extrabold text-1rem pb-1">View Beneficiary</div>
        <div class="text-3 bg-neutral-300 rounded-full flex justify-center items-center w-5 h-5 cursor-pointer"
             @click="close">
          <i class="i-mdi-close"></i>
        </div>
      </div>


      <label class="font-medium text-0.8rem text-#525252">Verification: :</label>
      <div  class="font-extrabold case-upper" :class="(beneficiary?.workflow == 'approved'?'text-green-9':'text-red')"> {{beneficiary?.workflow}} </div>

      <div class="relative flex flex-col mt-4">
        <label class="font-medium text-0.8rem text-#525252">Beneficiary Name</label>
        <div class=""> {{ beneficiary?.name }} </div>
      </div>
      
      <div class="relative flex flex-col mt-4">
        <label class="font-medium text-0.8rem text-#525252">Beneficiary Mobile</label>
        <div class=""> {{ beneficiary?.mobile }} </div>
      </div>
      
      <div class="relative flex flex-col mt-4">
        <label class="font-medium text-0.8rem text-#525252">Beneficiary Email</label>
        <div class=""> {{ beneficiary?.email }} </div>
      </div>


      <div class="relative flex flex-col mt-4">
        <label class="font-medium text-0.8rem text-#525252">Bank Country</label>
        <div class=""> {{beneficiary?.country}} </div>
      </div>
      
      <div class="relative flex flex-col mt-4">
        <label class="font-medium text-0.8rem text-#525252">Bank Name</label>

        <div class=""> {{beneficiary?.bankname}} </div>
      </div>

      <div class="relative flex flex-col mt-4">
        <label class="font-medium text-0.8rem text-#525252">Account Name</label>
        <div class=""> {{ beneficiary?.accountname }} </div>
      </div>
      
      <div class="relative flex flex-col mt-4">
        <label class="font-medium text-0.8rem text-#525252">Account Currency</label>
        <div class=""> {{ beneficiary?.currency }} </div>
      </div>

      <div class="relative flex flex-col mt-4">
        <label class="font-medium text-0.8rem text-#525252">IBAN</label>
        <div class=""> {{ beneficiary?.iban }} </div>
      </div>

      <div class="relative flex flex-col mt-4">
        <label class="font-medium text-0.8rem text-#525252">Bank Code (BIC / SWIFT code)</label>
        <div class=""> {{ beneficiary?.swift }} </div>
      </div>


      <div class="relative flex flex-col mt-4">
        <label class="font-medium text-0.8rem text-#525252">Bank Address</label>
        <div class=""> {{ beneficiary?.bankaddress }} </div>
      </div>

    </Modal>
  </div>
</template>

<script setup>
import { showAlert } from '~/plugins/sweetalert';
defineProps(["beneficiary"]);
const emit = defineEmits(["close"]);

const close = () => {
  emit("close");
};



</script>