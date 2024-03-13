<template>
  <div
    class="w-full flex flex-col mt-20 justify-between items-center bg-#333860"
  >
    <div class="w-3/5 -mt-30 py-10 flex flex-col items-center rounded-05 bg-white border border-coolgray">
      <div class="w-2/3 text-[2.5rem] leading-tight font-maven font-bold text-center">In an instant send support, feed a passion, or strengthen a bond</div>
      <div class="flex flex-row items-center gap-3 justify-center">
        <div class="flex flex-row mt-5 gap-5 text-white">
          <div class="flex flex-row items-center rounded-[.7rem] px-5 py-2 bg-#333860 gap-3">
            <span class="i-mdi-apple text-[2rem]"></span>
            <div class="flex flex-col">
              <div class="text-xs">Download on the</div>
              <div class="text-lg font-maven font-medium">App Store</div>
            </div>
          </div>
          <div class="flex flex-row items-center rounded-[.7rem] px-5 py-2 bg-#333860 gap-3">
            <span class="i-mdi-google-play text-[2rem]"></span>
            <div class="flex flex-col">
              <div class="text-xs">Get it on</div>
              <div class="text-lg font-maven font-medium">Gooogle Play</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-3/5 my-10 flex flex-col items-center">
      <div class="flex flex-row w-full border-solid border-b pb-5 border-t-0 border-r-0 border-l-0 border-white items-center justify-between gap-3">
        <div class="flex flex-col w-1/2 items-start gap-3">
          <img src="~/assets/img/logo.svg" class="h6 bg-white px-5 py-1" alt="" />
          <div class="flex flex-row text-white items-center gap-3">
            <div class="">Products</div>
            <div class="">Support</div>
            <div class="">Careers</div>
            <div class="">Terms</div>
          </div>
        </div>
        <div class="flex flex-col w-1/2 items-end gap-3">
          <div class="text-[1.5rem] font-maven text-white">How Can We help?</div>
          <div class="flex flex-row text-white items-center gap-3">
            <div class="">Help Docs & FAQs</div> |
            <div class="">Support via In-app-Chat</div>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-3 py-5 w-full">
        <div class="flex flex-col text-white items-start gap-3">
          <div class="flex flex-row items-center">
            <span class="i-mdi-copyright"></span> {{ date }}, All rights reserved
          </div>
        </div>
        <div class="flex flex-col text-white items-center gap-3">
          Product availability may vary by market.
        </div>
        <div class="flex flex-col text-white items-end gap-3">
          <div class="flex flex-row text-white items-center gap-3">
            <div class="">Follow us: </div>
            <div class="flex flex-row gap-3 items-center">
              <span class="i-mdi-facebook-box"></span>
              <span class="i-mdi-twitter"></span>
              <span class="i-mdi-instagram"></span>
              <span class="i-mdi-youtube-play"></span>
            </div>
          </div>
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
