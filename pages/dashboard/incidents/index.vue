<template>
  <div>
    <NuxtLayout name="dashboard">
      <ReuseableViewIncident
        v-if="viewIncident"
        :incident="selectedIncident"
        @close="toggleViewIncident({})"
      />

      <ReuseableCreateIncident
        v-if="createIncident"
        @close="toggleCreateIncident()"
      />
      <div class="flex flex-col m-1 rounded caret-transparent">
        <div class="relative flex flex-col bg-white p-2 p-b-3 text-3 b-rounded">
            Sharing your experience helps us identify and help prevent future incidents.
            Your information remains anonymous
            <br/><br/>
            <div @click="toggleCreateIncident" class="bg-red-6 text-center text-light p-x-2 py-1 text-4 cursor-pointer rounded items-center">
              Share Incident Anonymously
            </div>
        </div>

        <div class="flex flex-col p-y-1">

            <div class="relative flex flex-col bg-white p-2 b-rounded m-b-1">
              <label class="text-[1rem] text-center p-b-2 w-100% text-#525252">search my incidents</label>
              <div class="flex bg-#0001 b-rounded">
                <input type="text" required class="w-100% caret-black p-2 bg-transparent  text-[0.9rem] <smw-full border-width-0  text-black"/>
                <button class="b-0 bg-transparent">
                  <i class="i-mdi-magnify text-[1.2rem] text-black"></i>
                </button>
              </div>
            </div>

            <div v-if="searchIncidents?.length == 0" class="flex  justify-center text-sm pt-2 text-#E34E3B">
              <small class=""><i> No Incident found </i></small>
            </div>
            <div v-else class="flex flex-col text-4 items-center ">
              <div class="flex text-4  w-100% bg-white m-b-1 b-rounded cursor-pointer caret-transparent" 
                v-for="(incident, index) in searchIncidents" :key="index" @click="toggleViewIncident(incident)">
                
                <div class="p-2 text-3">

                  Status: {{incident?.workflow}}<br/>
                  Type: {{incident?.category?.title}} <br/>
                  Location:  {{incident?.city}} {{incident?.state}}<br/>
                  Date & Time: {{dateTimeConvert(incident?.createdate)}}<br/>
                  
                </div>
              </div>

            </div>
          </div>

      </div>
    </NuxtLayout>
  </div>
</template>
<script setup>
  
  let viewIncident = ref(false);
  let editIncident = ref(false);
  let createIncident = ref(false);

  let searchIncidents = ref([])
  let selectedIncident = ref({});

  const initialstate = reactive({ workflow:'', title:'',  page:0, limit:20 })
  let searchParams = reactive({ ...initialstate })

  const toggleCreateIncident = () => {
    createIncident.value = !createIncident.value;
    if (!createIncident.value) {
      getSearchIncidents();
    }
  };
  
  const toggleViewIncident = (value) => {
    viewIncident.value = !viewIncident.value;
    if (viewIncident.value) {
      selectedIncident = value;
    } else {
      selectedIncident = {};
    }
  };
  
  const toggleEditIncident = (value) => {
    editIncident.value = !editIncident.value;
    if (editIncident.value) {
      selectedIncident = value;
    } else {
      getSearchIncidents();
    }
  };

  onBeforeMount( async ()   => {
    await getSearchIncidents()
  })

  const getSearchIncidents = async () => {
    // resetSearchParams()    
    const response = await HTTP().post('/api/incidents/search', searchParams).then(
      (response) => {
        return response;
      }).catch((error) => {
        return error.response;
      })

    searchIncidents.value = (response.status === 200) ? response.data : []
    if (response.status !== 200){
      showAlert({
        titleText: 'Failed',
        text: response?.data?.error,
        icon: 'error',
      })
    }
  }
</script>