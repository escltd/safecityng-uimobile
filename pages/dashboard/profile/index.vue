<template>
  <div>
    <NuxtLayout name="dashboard">
      <div class="flex flex-col m-2 p-2 rounded bg-white caret-transparent">

        <div class="flex ">
          <div class="flex justify-start text-0.8rem w-100%">
            <label class="font-medium  text-#525252">Verification: :</label>
            <label  class="font-extrabold case-upper" :class="(myProfile?.workflow == 'approved' ? 'text-green-9' : 'text-red')"> {{ myProfile?.workflow }} </label>
          </div>

          <div class="flex justify-end w-100%">
            <NuxtLink to="/dashboard/profile/edit">
                <div
                  class="bg-zinc-100 flex flex-row text-dark p-x-2 py-1 text-3 cursor-pointer rounded items-center"
                >
                  <span class="font-semibold"> Edit </span>
                  <i class="i-mdi-account-edit pl2"></i>
                </div>
              </NuxtLink>
          </div>
        </div>

        <div class="h50 w-50 flex items-center justify-center text-black text-xs cursor-pointer font-bold bg-black rounded-full">
          <img
            :src="'../../../' + myProfile?.image"
            @error="$event.target.src = profileImage"
            class="rounded-full h50 w50 cursor-pointer"
            alt="" 
          />
        </div>
        
        <div class="flex flex-row text-6 items-center capitalize p-x-2">
          <div class="font-bold text-lg">
            {{ myProfile?.firstname }}
            {{ myProfile?.lastname }}
          </div>
        </div>
        <div class="flex flex-row text-sm pt-2 items-center p-x-2">
          {{ myProfile?.email || "Add Your Email" }}
        </div>
        <div class="flex flex-row text-sm pt-2 items-center p-x-2">
          {{ myProfile?.mobile || "Add Your Mobile" }}
        </div>
        <NuxtLink
          v-if="myProfile?.country?.trim() == ''"
          to="/dashboard/profile/edit"
          class="flex flex-row text-sm pt-2 p-x-2 items-center text-#E34E3B"
        >
          <small><i> Country is missing </i></small>
        </NuxtLink>
        <div v-else class="flex flex-row text-4 pt-2 items-center p-x-2">
          {{ myProfile?.country }}
        </div>

        <div class="mt-4">
          <div class="rounded-md text-sm items-center font-semibold bg-#F6F6F6 p-2 px-4 flex justify-between items-center cursor-pointer"
            @click="showPersonal = !showPersonal"> 
            Personal Details <i class="text-[1.5em] cursor-pointer " :class="showPersonal ? 'i-mdi-chevron-down' : 'i-mdi-arrow-right-thin'"></i> 
          </div>
          <div v-if="showPersonal" class="flex flex-col lg:px-6 px-4 py-2">
            <NuxtLink v-if="myProfile?.dob?.trim() == ''"
              to="/dashboard/profile/edit"
              class="flex flex-row text-sm pt-2 items-center text-#E34E3B"
            >
              <small><i> Add date of birth </i></small>
            </NuxtLink>
            <div v-else class="flex flex-row text-sm pt-2 items-center">
              {{ myProfile?.dob }}
            </div>

            <NuxtLink v-if="myProfile?.dob?.trim() == ''"
              to="/dashboard/profile/edit"
              class="flex flex-row text-sm pt-2 items-center text-#E34E3B"
            >
              <small><i> Add gender </i></small>
            </NuxtLink>
            <div v-else class="flex flex-row text-sm pt-2 items-center">
              {{ myProfile?.gender }}
            </div>

            <NuxtLink
              v-if="myProfile?.street.trim() == '' ||
                myProfile?.city.trim() == '' ||
                myProfile?.state.trim() == ''
                "
              to="/dashboard/profile/edit"
              class="flex flex-row text-sm pt-2 items-center text-#E34E3B"
            >
              <small><i> Full address information is missing </i></small>
            </NuxtLink>
            <div v-else class="flex flex-row text-sm pt-2 items-center">
              {{ myProfile?.street }}, {{ myProfile?.city }},
              {{ myProfile?.state }}
            </div>
        
          </div>
        </div>
        
        <ProfileKycDocuments />
        <ProfileBankAccounts />

      </div>

      <div class="flex flex-row justify-center items-center">
        <div class="p-1 rounded bg-white text-dark m-y-5">
            <div @click="logout" class="text-[0.8rem] text-center p-2">
              <i class="text-[2em] i-mdi-exit-to-app cursor-pointer"></i> SIGN OUT
            </div>
        </div>
      </div>

    </NuxtLayout> 
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useAuthStore } from '~/store/auth';
import { useMyProfileStore } from "~/store/myprofile";
import profileImage from "~/assets/img/profile.jpg";

const { logUserOut } = useAuthStore();
const myProfile = computed(() => {
  return useMyProfileStore().myProfile;
});

let showPersonal = ref(false);

const logout = () => {
  logUserOut();
  navigateTo("/auth/signin");
};
</script>