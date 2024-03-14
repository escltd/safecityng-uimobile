<template>
  <div>
    <NuxtLayout name="default">
      <div class="flex flex-col items-center text-black justify-center w-full h-screen">
        <img src="~/assets/img/logo.svg" class="h-10 caret-transparent" alt="" />

        <div class="p-y-3 text-left font-bold w-60 text-[1rem]">
          Great news! <br/><br/> 
          We've just sent an activation email to the address you provided <br/><br/>

          Click on the activation link in the email to complete the registration process <br/><br/>
          
          
          Thank you for joining us!<br/><br/>

          <div class="text-gray text-[0.7rem]">
            Please check your inbox (and don't forget to look in your spam folder, just in case). <br/><br/>

            If you haven't received the email within a few minutes, you can request a new one by signing in with your login details.
          </div>
        </div>

        
        <div class="flex flex-row items-center p-y-3">
          <NuxtLink  to="/auth/signin"
               class="b-rounded w-60 bg-black p-y-3 text-[1rem] cursor-pointer caret-transparent readonly font-semibold text-white text-center">
              Sign In
          </NuxtLink>
        </div>

      </div>
    </NuxtLayout>
  </div>
</template>
<script setup>

</script>
