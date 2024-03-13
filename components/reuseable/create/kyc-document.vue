<template>
  <div>
    <Modal class="bg-zinc-100">
      <div class="flex flex-row items-center w-100% justify-between">
        <div class="font-extrabold text-1rem pb-1">Add KYC Document</div>
        <div class="text-3 bg-neutral-300 rounded-full flex justify-center items-center w-5 h-5 cursor-pointer"
             @click="close">
          <i class="i-mdi-close"></i>
        </div>
      </div>


      <div class="flex flex-row justify-center items-center p-t-5">
        <div class="p-1 rounded bg-zinc-100 text-dark cursor-pointer" @click="fileUploader.click()">
            <input class="hidden" accept="image/png, image/jpeg, image/jpg,"
                @change="uploadFile" ref="fileUploader" type="file" placeholder="placeholder"/>
            <i class="text-[5em] i-mdi-upload-box-outline "></i> 
          
        </div>
      </div>

      <div class="relative flex flex-col mt-4">
        <label class="font-medium text-0.8rem text-#525252">Document Type</label>

        <select v-model="formData.doctype"  class="text-ellipsis caret-black p-2 bg-#0001 text-[0.9rem] <smw-full border-solid border-t-0 border-r-0 border-l-0 border-b-0 text-black border-coolgray">
          <option value="" class="text-gray"></option>
          <option value="National ID" class="text-gray">National ID</option>
          <option value="Residence Card" class="text-gray">Residence Card</option>
          <option value="Drivers License" class="text-gray">Drivers License</option>
          <option value="International Passport" class="text-gray">International Passport</option>
          
        </select>
      </div>

      <div class="relative flex flex-col mt-4">
        <label class="font-medium text-0.8rem text-#525252">Document Number</label>
        <input v-model="formData.code" type="text" required
                class="caret-black p-2 bg-#0001 text-[0.9rem] <smw-full border-width-0  text-black" />
      </div>


      <div class="relative flex flex-col mt-4">
        <label class="font-medium text-0.8rem text-#525252">Issuing Country</label>
        <select v-model="formData.issuedby" class="text-ellipsis caret-black p-2 bg-#0001 text-[0.9rem] <smw-full border-solid border-t-0 border-r-0 border-l-0 border-b-0 text-black border-coolgray">
          <option value="" class="text-gray" disabled selected></option>
          <option v-for="(country, index) in isoCountries" :key="index" :value="country.country">{{ country.country }}</option>
        </select>
      </div>

      <div class="relative flex flex-col mt-4">
        <label class="font-medium text-0.8rem text-#525252">Expires On</label>
        <input v-model="formData.validuntil" type="date" required
              class="caret-black p-2 bg-#0001 text-[0.9rem] <smw-full border-width-0  text-black" />
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

    </Modal>
  </div>
</template>

<script setup>
import { showAlert } from '~/plugins/sweetalert';

const fileUploader = ref();
const emit = defineEmits(["close"]);

const close = () => {
  emit("close");
};

let isLoading = ref(false); 
const initialState = reactive({
  code: "",
  doctype: "",
  filename: "",
  filepath: "",
  filesize: 0,
  filetype: "",
  issuedby: "",
  validuntil: "",
  workflow: "pending",
});
let formData = reactive({ ...initialState });


const uploadFile = () => {
  const reader = new FileReader();
  const selectedFile = event.target.files[0];
  event.target.value = "";
  reader.readAsDataURL(selectedFile);
  reader.onload = function readerOnLoad() {
    if (selectedFile.size > 10240000) {
      showAlert({
        titleText: 'Failed',
        text: "File must be less than 10MB",
        icon: 'error',
      })
    } else {
      formData.filepath = reader.result;
      formData.filesiize = selectedFile.size;
      formData.filename = selectedFile.name;
      formData.filetype = selectedFile.type;
      formData.title = selectedFile.name;
    }
    console.log(formData);
  };
  reader.onerror = function readerOnerror(error) {
    showAlert({
        titleText: 'Failed',
        text: `File Error:${error}`,
        icon: 'error',
      })
  };
};


const pressEnter = (event) => {
  if (event.code === "Enter") {
    handleSubmit();
  }
};


const resetForm = () => {
  isLoading.value = false;
  formData = reactive({ ...initialState });
};

const handleSubmit = async () => {
  
  let errorMsg = ""
  isLoading.value = true;
  if(formData.doctype === ""){
    if (errorMsg !== "") {
      errorMsg += "<br/>"
    }
    errorMsg += "<b>Document type</b> is required"
  }


  if(formData.code === ""){
    if (errorMsg !== "") {
      errorMsg += "<br/>"
    }
    errorMsg += "<b>Document number</b> is required"
  }

  if(formData.issuedby === ""){
    if (errorMsg !== "") {
      errorMsg += "<br/>"
    }
    errorMsg += "<b>Issuing country</b> is required"
  }

  if(formData.validuntil === ""){
    if (errorMsg !== "") {
      errorMsg += "<br/>"
    }
    errorMsg += "<b>Expiry date</b> is required"
  }

  if(formData.filepath === ""){
    if (errorMsg !== "") {
      errorMsg += "<br/>"
    }
    errorMsg += "<b>File</b> is required"
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


  let response = await HTTP().post('/api/document', formData).then(
    (response) => {
      return response;
    }).catch((error) => {
      return error.response;
    }
  );  

  showAlert({
    titleText: (response.status == 200 ? 'Success' : 'Failed'),
    text: (response.status == 200 ? "KYC Document has been added" : response?.data?.error),
    icon: (response.status == 200 ? 'success' : 'error'),
  })
  isLoading.value = false;
  
  if (response.status == 200){
    resetForm();
    close();
  }

};



</script>