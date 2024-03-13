<template>
  <div>
    <Modal class="bg-zinc-100">
      <div class="flex flex-row items-center w-100% justify-between">
        <div class="font-extrabold text-1rem pb-1">View Notification</div>
        <div class="text-3 bg-neutral-300 rounded-full flex justify-center items-center w-5 h-5 cursor-pointer"
             @click="close">
          <i class="i-mdi-close"></i>
        </div>
      </div>

      <div class="flex gap-1">
        <div class="relative flex flex-col mt-4">
          <label class="font-medium text-#525252">Status:</label>
          <div  class=" case-upper bg-zinc-100 p-2"> {{ notification?.workflow }} </div>
        </div>
      </div>

      <div class="relative flex flex-col mt-4">
        <label class="font-medium text-#525252">Type:</label>
        <div class=" case-upper bg-zinc-100 p-2"> {{ notification?.typeof }} </div>
      </div>
      
      <div class="relative flex flex-col mt-4">
        <label class="font-medium text-#525252">Subject:</label>
        <div class=" bg-zinc-100 p-2"> {{ notification?.subject }} </div>
      </div>
      
      <div class="relative flex flex-col mt-4">
        <label class="font-medium text-#525252">Message:</label>
        <div class=" bg-zinc-100 p-2"> {{ notification?.message }} </div>
      </div>



      <div v-if="!isLoading" class="relative flex flex-col mt-4">
          <div class="text-right pt-4">
          <button @click="handleSubmit" class="bg-dark text-white p-2 rounded-md border-none font-semibold cursor-pointer active:scale-95">
              <i class="i-mdi-plus-circle text-white text-[1rem] m-r-1"></i>
              <span :class="isLoading ? 'text-blur-out' : ''">
                {{ notification?.workflow == 'unread' ? 'Mark as Read' : 'Marked as Unread' }}
              </span>
          </button>
        </div>
      </div>

    </Modal>
  </div>
</template>

<script setup>
let props = defineProps(["notification"]);
const emit = defineEmits(["close"]);

const close = () => {
  emit("close");
};

let isLoading = ref(false); 
const handleSubmit = async () => {
  isLoading.value = true;
  const workfow = props?.notification?.workflow == 'unread' ? 'read' : 'unread';
  await HTTP().put('/api/notification/'+props?.notification?.id, {workflow:workfow})
  isLoading.value = false;
  close();
};

</script>