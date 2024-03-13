<template>
  <div class="w-full flex flex-col justify-between items-center static bg-#333860">
    <div class="w-3/5 py-10 flex flex-row items-center justify-between">
      <img src="~/assets/img/logo.svg" class="h6 bg-white px-5 py-1" alt="" />
      <div class="flex flex-col items-end">
        <div class="flex flex-row text-white items-center gap-5">
          <div class="flex flex-row items-center cursor-pointer">Products <span class="i-mdi-chevron-down"></span></div>
          <div class="flex flex-row items-center cursor-pointer">Company <span class="i-mdi-chevron-down"></span></div>
          <div class="cursor-pointer">Blog</div>
          <div class="cursor-pointer">Support</div>
          <div class="border-1 border-solid p-2 rounded-[.7rem] cursor-pointer">Download</div>
        </div>

    </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      date: new Date().getFullYear(),
    };
  },
};
</script>
