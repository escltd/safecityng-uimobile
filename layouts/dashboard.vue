<template>
  <div class="h-screen bg-#f3f3f3 font-maven relative">
    <div class="2xl:max-w-[1800px] 2xl:m-auto flex md:flex-row flex-col bg-#f3f3f3 font-raleway">

      <div class="flex items-center justify-between font-bold h-10 p-3 bg-white">
        <NuxtLink  to="/dashboard/profile" >
          <div class="rounded-4 border-width-1 border-solid border-zinc-200 p-1">
            <i class="text-[1.5em] i-mdi-account-outline cursor-pointer "></i> 
          </div>
        </NuxtLink>

        <input type="text" placeholder="Search area" :class="route.endsWith('dashboard')? '' : 'hidden'"
        class="m-r-2 caret-black p-2 <md:w-60  w-80 b-rounded bg-#0001 text-center text-[1.1rem] <smw-full border-solid border-t-0 border-r-0 border-l-0 border-b-0 text-black border-coolgray"/>
            
        <NuxtLink to="/dashboard/notifications" class="flex relative m-r-1">
          <i class="text-[1.7em] i-mdi-bell-outline cursor-pointer "></i> 
          <strong class="bg-#E34E3B notification text-[10px] p-1 text-white flex justify-center items-center text-center rounded-4 absolute left-4 top--1">
            {{ pendingMetrics.notifications}}
          </strong>
        </NuxtLink>
      </div>

      <!-- Right  -->
      <div class="w-full h-screen overflow-y-scroll md:ml-auto m-auto md:m-0 md:w-77% xl:w-79% 2xl:w-81% md:p-4 md:p-10">
        <slot />
        <div class="h-30"></div>
      </div>

      <div class="flex w-screen bg-white bottom-0 fixed text-zinc-300 font-bold p-t-1">
          <NuxtLink to="/dashboard" class="text-[0.8rem] text-center p-2 w-100 text-ellipsis"
            :class="route.endsWith('dashboard') ? 'text-dark-50' : ''">
            <i class="text-[2em] i-mdi-home-account cursor-pointer"></i> <br/> Home
          </NuxtLink>
          <NuxtLink to="/dashboard/account-transactions" class="text-[0.8rem] text-center p-2 w-100 text-ellipsis"
          :class="route.includes('account-transactions') ? 'text-dark-50' : ''">
            <i class="text-[2em] i-mdi-flash-triangle-outline cursor-pointer"></i> <br/> Incidents
          </NuxtLink>
          <NuxtLink to="/dashboard/beneficiaries" class="text-[0.8rem] text-center p-2 w-100 text-ellipsis"
          :class="route.includes('beneficiaries') ? 'text-dark-50' : ''">
            <i class="text-[2em] i-mdi-safety-belt cursor-pointer"></i> <br/> Safety Tips
          </NuxtLink>
          <div class="text-[0.8rem] text-center p-2 w-100 text-ellipsis"
          :class="route.includes('help') ? 'text-dark-50' : ''">
            <i class="text-[2em] i-mdi-help-circle-outline cursor-pointer"></i> <br/> Help
          </div>
      </div>

    </div>
  </div>
</template>
<script setup>
const route = useRoute().name;

let pendingMetrics = ref({requests:0, kycaml:0, notifications:0})

onBeforeMount( async ()   => {
    await getMetrics()
})

const getMetrics = async () => {
  const response = await HTTP().get('/api/metrics').then(
    (response) => {
      return response;
    }).catch((error) => {
      return error.response;
    })
  pendingMetrics.value = (response?.status === 200) ? response?.data : {requests:0, kycaml:0, notifications:0}
}

const logout = () => {
  // logUserOut();
  navigateTo("/auth/login");
};
</script>