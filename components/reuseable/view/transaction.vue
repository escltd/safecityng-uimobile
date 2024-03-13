<template>
  <div>
    <Modal class="bg-zinc-100">
      <div class="flex flex-row items-center w-100% justify-between">
        <div class="font-extrabold text-1rem pb-1">View Transaction</div>
        <div class="text-3 bg-neutral-300 rounded-full flex justify-center items-center w-5 h-5 cursor-pointer"
             @click="close">
          <i class="i-mdi-close"></i>
        </div>
      </div>


      <div class="flex flex-row justify-between gap-3">
        <div class="relative flex flex-col mt-4">
          <label class="font-medium text-0.8rem text-#525252">Workflow:</label>
          <div class="font-extrabold case-upper" :class="(transaction?.workflow == 'approved'?'text-green-9':'text-red')"> {{transaction?.workflow}} </div>
        </div>
        <div class="relative flex flex-col mt-4">
          <label class="font-medium text-0.8rem text-#525252">Type</label>
          <div class=""> {{transaction?.transtype}} </div>
        </div>
        <div class="relative flex flex-col mt-4">
          <label class="font-semibold text-0.8rem text-#525252">Currency</label>
          <div class=""> {{ transaction.currency }}</div>
        </div>
      </div>

      <div class="max-h-[500px] flex flex-col gap-4 overflow-y-scroll">
        <div class="relative flex flex-row justify-between gap-5 mt-4">

          <div v-if="transaction?.transtype === 'outflow'" class="relative flex flex-col">
            <label class="font-semibold text-0.8rem text-#525252">Debit Amount</label>
            <div class=""> {{ transaction.debit }}</div>
          </div>
          
          <div v-if="transaction?.transtype === 'inflow'" class="relative flex flex-col">
            <label class="font-semibold text-0.8rem text-#525252">Credit Amount</label>
            <div class=""> {{ transaction.credit }}</div>
          </div>

          <div class="relative flex flex-col">
            <label class="font-semibold text-0.8rem text-#525252">Balance</label>
            <div class=""> {{ transaction.debit }}</div>
          </div>
        </div>

        <div class="relative flex flex-col">
          <label class="font-semibold text-0.8rem text-#525252">Narration</label>
          <div class=""> {{transaction?.narration}} </div>
        </div>

        <div class="relative flex flex-col">
          <label class="font-semibold text-0.8rem text-#525252">Date</label>
          <div v-if="transaction?.transtype === 'inflow'" class=""> {{ dateTimeConvert(transaction.transdate) }}</div>
        </div>
      </div>

    </Modal>
  </div>
</template>

<script setup>
import { showAlert } from '~/plugins/sweetalert';
defineProps(["transaction"]);
const emit = defineEmits(["close"]);

const close = () => {
  emit("close");
};



</script>