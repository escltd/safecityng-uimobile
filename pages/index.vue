<template> 
<div>
  <NuxtLayout name="default">
    <div class="flex flex-col items-center text-black justify-center w-full h-screen">
      <div class="flex w-3/5 items-center <md:w-5/5 justify-between p-y-3">
        <img src="~/assets/img/icon.svg" class="m-l-2 h-10 lg:hidden" alt="" />
        <img src="~/assets/img/logo.svg" class="m-l-2 h-10 <lg:hidden" alt="" />
        
        <input type="text" placeholder="Search area" class="m-r-2 caret-black p-2 <md:w-60  w-80 b-rounded bg-#0001 text-[1.1rem] <smw-full border-solid border-t-0 border-r-0 border-l-0 border-b-0 text-black border-coolgray"/>
        
      </div>

      <div class="flex h-full w-full bg-pink-100 items-center justify-center b-rounded">
        
        <MapsCurrentPosition />

      </div>
      

      <div class="flex w-3/5 items-center <sm:w-5/5 justify-between">
        <div class="flex w-full items-center <lg:justify-center lg:justify-between p-y-5 gap-10">
          <NuxtLink to="/auth/signup" class="m-l-2 b-rounded lg:w-1/3 w-1/2  bg-zinc-200 py-2 text-[1.4rem] <sm:text-[1.2rem] cursor-pointer caret-transparent font-semibold text-black text-center">
            Sign up
          </NuxtLink>

          <NuxtLink to="/auth/signin" class="m-r-2 b-rounded lg:w-1/3 w-1/2 bg-black py-2 text-[1.4rem] <sm:text-[1.2rem] cursor-pointer caret-transparent font-semibold text-white text-center">
            Sign in
          </NuxtLink>
        </div>
      </div>
    </div>
  </NuxtLayout>
</div>
</template>
<script setup lang="ts">
  
</script>
