<template>
  <div>
    <NuxtLayout name="dashboard">
      <div class="flex flex-col m-2 p-2 rounded bg-white">

        
        <div class="flex ">
          <div class="flex justify-start text-0.8rem w-100%">
            <label class="font-medium  text-#525252">Verification: :</label>
            <label  class="font-extrabold case-upper" :class="(myProfile?.workflow == 'approved' ? 'text-green-9' : 'text-red')"> {{ myProfile?.workflow }} </label>
          </div>

          <div class="flex justify-end w-100%">
            <NuxtLink to="/dashboard/profile">
              <div class="bg-zinc-100 flex flex-row text-dark p-x-2 py-1 text-3 cursor-pointer rounded items-center">
                <i class="i-mdi-chevron-left"></i>
                <span class="font-semibold"> Back </span>
              </div>
            </NuxtLink>
          </div>
        </div>

        <div class="flex gap-2">
            <div @click="uploadImageClick" class="relative">
              <div
                class="h50 w-50 flex items-center justify-center text-black text-xs cursor-pointer hover:bg-opacity-30 font-bold bg-black absolute rounded-full bg-opacity-60"
              >
                <p><img :src="cameraIcon" class="" /></p>
              </div>
              <img
                :src="'../../../' + formData?.image"
                @error="$event.target.src = profileImage"
                class="rounded-full h50 w50 cursor-pointer"
                alt="" 
              />
            </div>

            <input
              class="hidden"
              accept="image/png, image/jpeg, image/jpg"
              @change="updateImage"
              ref="uploadImage"
              type="file"
              id="image"
              placeholder="placeholder"
            />
        </div>  


        <div class="flex gap-2">
          <div class="relative flex flex-col mt-4 w-50%">
            <label class="font-medium text-0.8rem text-#525252">First name</label>
            <input v-model="formData.firstname" type="text" required class="caret-black p-2 bg-#0001 text-[0.9rem] <smw-full border-width-0  text-black"/>
          </div>

          <div class="relative flex flex-col mt-4 w-50%">
            <label class="font-medium text-0.8rem text-#525252">Last Name</label>
            <input v-model="formData.lastname" type="text" required class="caret-black p-2 bg-#0001 text-[0.9rem] <smw-full border-width-0  text-black"/>
          </div>
        </div>

        <div class="flex gap-2">
          <div class="relative flex flex-col mt-4 w-50%">
            <label class="font-medium text-0.8rem text-#525252">Country</label>
            <select v-model="formData.country" class="text-ellipsis caret-black p-2 bg-#0001 text-[0.9rem] <smw-full border-solid border-t-0 border-r-0 border-l-0 border-b-0 text-black border-coolgray">
              <option value="" class="text-gray" disabled selected></option>
              <option v-for="(country, index) in isoCountries" :key="index" :value="country.country">{{ country.country }}</option>
            </select>
          </div>

          <div class="relative flex flex-col mt-4 w-50%">
            <label class="font-medium text-0.8rem text-#525252">Mobile</label>
            <input v-model="formData.mobile" type="text" required class="caret-black p-2 bg-#0001 text-[0.9rem] <smw-full border-width-0  text-black"/>
          </div>
        </div>

        <div class="flex gap-2">
          <div class="relative flex flex-col mt-4 w-100%">
            <label class="font-medium text-0.8rem text-#525252">Email</label>
            <input v-model="formData.email" type="text" required class="caret-black p-2 bg-#0001 text-[0.9rem] <smw-full border-width-0  text-black"/>
          </div>
        </div>

        <div class="flex gap-2">
          <div class="relative flex flex-col mt-4 w-50%">
            <label class="font-medium text-0.8rem text-#525252">Date of birth <i class="i-mdi-asterisk text-0.6rem text-red-4 -mt-2"></i></label>
            <input v-model="formData.dob" type="date" required class="caret-black p-2 bg-#0001 text-[0.9rem] <smw-full border-width-0  text-black"/>
          </div>

          <div class="relative flex flex-col mt-4 w-50%">
            <label class="font-medium text-0.8rem text-#525252">Gender <i class="i-mdi-asterisk text-0.6rem text-red-4 -mt-2"></i></label>
            <select v-model="formData.gender" class="text-ellipsis caret-black p-2 bg-#0001 text-[0.9rem] <smw-full border-solid border-t-0 border-r-0 border-l-0 border-b-0 text-black border-coolgray">
              <option value="" class="text-gray" disabled selected></option>
              <option value="female" class="text-gray">Female</option>
              <option value="male" class="text-gray">Male</option>
              <option value="non-binary" class="text-gray">Non-binary</option>
              <option value="other" class="text-gray">other</option>
            </select>
          </div>
        </div>  
          
        <div class="flex gap-2">
          <div class="relative flex flex-col mt-4 w-100%">
            <label class="font-medium text-0.8rem text-#525252">Street <i class="i-mdi-asterisk text-0.6rem text-red-4 -mt-2"></i></label>
            <input v-model="formData.street" type="text" required class="caret-black p-2 bg-#0001 text-[0.9rem] <smw-full border-width-0  text-black"/>
          </div>
        </div>
        

        <div class="flex gap-2">
          <div class="relative flex flex-col mt-4 w-50%">
            <label class="font-medium text-0.8rem text-#525252">City <i class="i-mdi-asterisk text-0.6rem text-red-4 -mt-2"></i></label>
            <input v-model="formData.city" type="text" required class="caret-black p-2 bg-#0001 text-[0.9rem] <smw-full border-width-0  text-black"/>
          </div>

          <div class="relative flex flex-col mt-4 w-50%">
            <label class="font-medium text-0.8rem text-#525252">State <i class="i-mdi-asterisk text-0.6rem text-red-4 -mt-2"></i></label>
            <input v-model="formData.state" type="text" required class="caret-black p-2 bg-#0001 text-[0.9rem] <smw-full border-width-0  text-black"/>
          </div>
        </div>


        <div class="text-right pt-4">
          <button @click.prevent="isLoading ? false : handleSubmit()"
                  class="bg-dark text-white p-2 rounded-md border-none font-semibold cursor-pointer active:scale-95">
              <i class="i-mdi-plus-circle text-white text-[1rem] m-r-1"></i>
              <span :class="isLoading ? 'text-blur-out' : ''">
                {{ !isLoading ? 'Save' : 'Saving...' }}
              </span>
          </button>
        </div>
        
      </div>

    </NuxtLayout>
  </div>
</template>
<script setup>
import { ref } from "@vue/composition-api";
import { showAlert } from '~/plugins/sweetalert';
import { useMyProfileStore } from "~/store/myprofile";
import cameraIcon from "~/assets/img/icon-camera.svg";
import profileImage from "~/assets/img/profile.jpg";

const myProfile = computed(() => {
  return useMyProfileStore().myProfile;
});

let isLoading = ref(false); 
let formData = reactive({});


const pressEnter = (event) => {
  if (event.code === "Enter") {
    handleSubmit();
  }
};

onBeforeMount(async () => {
  const newForm = await useMyProfileStore().myProfile;
  formData = reactive({ ...newForm });
});

const uploadImage = ref();

const uploadImageClick = () => {
  uploadImage.value.click();
};

const updateImage = () => {
  const reader = new FileReader();
  const selectedFile = event.target.files[0];
  event.target.value = "";
  reader.readAsDataURL(selectedFile);
  reader.onload = async function readerOnLoad() {
    if (selectedFile.size > 10240000) {
      message = ["File must be less than 10MB"];
    } else {
      formData.image = reader.result;;
    }
  };
  reader.onerror = function readerOnerror(error) {
    message = [`File Error:${error}`];
  };
};

const resetForm = () => {
  isLoading.value = false;
  formData = reactive({ ...initialState });
};


const handleSubmit = async () => {

  let errorMsg = ""
  isLoading.value = true;
  if(formData.firstname === ""){
    if (errorMsg !== "") {
      errorMsg += "<br/>"
    }
    errorMsg += "<b>First name</b> is required"
  }

  if(formData.lastname === ""){
    if (errorMsg !== "") {
      errorMsg += "<br/>"
    }
    errorMsg += "<b>Last name</b> is required"
  }

  if(formData.country === ""){
    if (errorMsg !== "") {
      errorMsg += "<br/>"
    }
    errorMsg += "<b>Country</b> is required"
  }

  if(formData.phone === ""){
    if (errorMsg !== "") {
      errorMsg += "<br/>"
    }
    errorMsg += "<b>Phone</b> is required"
  }

  if(formData.email === ""){
    if (errorMsg !== "") {
      errorMsg += "<br/>"
    }
    errorMsg += "<b>Email</b> is required"
  }


  if(formData.dob === ""){
    if (errorMsg !== "") {
      errorMsg += "<br/>"
    }
    errorMsg += "<b>Date of birth</b> is required"
  }

  if(formData.gender === ""){
    if (errorMsg !== "") {
      errorMsg += "<br/>"
    }
    errorMsg += "<b>Gender</b> is required"
  }

  if(formData.street === ""){
    if (errorMsg !== "") {
      errorMsg += "<br/>"
    }
    errorMsg += "<b>Street</b> is required"
  }

  if(formData.city === ""){
    if (errorMsg !== "") {
      errorMsg += "<br/>"
    }
    errorMsg += "<b>City</b> is required"
  }

  if(formData.state === ""){
    if (errorMsg !== "") {
      errorMsg += "<br/>"
    }
    errorMsg += "<b>State</b> is required"
  }
  

  if (errorMsg !== "") {
    isLoading.value = false;
    showAlert({
      titleText: "",
      html: errorMsg,
      icon: "error",
    });
    return;
  }


  let response = await HTTP().put('/api/profile/mine', formData).then(
    (response) => {
      return response;
    }).catch((error) => {
      return error.response;
    }
  );  

  showAlert({
    titleText: (response.status == 200 ? 'Success' : 'Failed'),
    text: (response.status == 200 ? "Profile has been added" : response?.data?.error),
    icon: (response.status == 200 ? 'success' : 'error'),
  })
  
  if (response.status == 200){
    useMyProfileStore().getMyProfileApiCall();
    navigateTo("/dashboard/profile");
  }
  isLoading.value = false;

};

</script>