<template>
  <div>
    <ReuseableViewNotification
        v-if="isView"
        :notification="selected"
        @close="toggleIsView({})"
      />
    <NuxtLayout name="dashboard">
      <div class="flex flex-col m-2 rounded caret-transparent">

        <div class="relative flex flex-col bg-white p-2 p-b-3">
          <label class="text-[1rem] text-center p-b-2 w-100% text-0.8rem text-#525252">Notifications</label>
          <div class="flex">
            <input type="text" required class="w-100% caret-black p-2 bg-#0001 text-[0.9rem] <smw-full border-width-0  text-black"/>
            <button @click="getSearchResults">
              <i class="i-mdi-magnify text-[1.2rem] text-black"></i>
            </button>
          </div>
        </div>

        <div class="flex flex-col lg:px-6 p-2">
          <div v-if="searchResults?.length == 0" class="flex  justify-center text-sm pt-2 text-#E34E3B">
            <small class=""><i> No Notification added </i></small>
          </div>
          <div v-else class="flex flex-col text-4 items-center">
            <div class="flex text-4 p-3 w-100% bg-white m-y-1 cursor-pointer caret-transparent" v-for="(notification, index) in searchResults" :key="index">
            
                <div class="w-100% text-ellipsis">
                  <i class="i-mdi-eye-outline" @click="toggleIsView(notification)"></i >
                  <small class="p-l-1"> {{ notification?.subject }} </small>
                </div>
                <div class="w-20% text-right">
                  <small> {{ notification?.workflow }} </small>
                </div>
            </div>

          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup>
  const selected = ref({})
  const isView = ref(false)
  const isLoading = ref(false)
  const initialstate = reactive({ workflow:'', typeof:'', fullname: '', email: '', mobile:'', country:'', page:0, limit: 50 })
  let searchParams = reactive({ ...initialstate })
  const resetSearchParams = () => {
    selected.value = {}
    searchParams = reactive({ ...initialstate })
    searchParams.workflow = workflowfilter
    searchResults.value = []
  }

  let searchtext = reactive("")
  let searchfilter = reactive("")
  let workflowfilter = reactive("")
  let searchResults = ref([])
  let pendingMetrics = ref({requests:0, kycaml:0, notifications:0})

  let showActionIndex = ref(null)

  onBeforeMount( async ()   => {
     await getSearchResults()
  })

  const toggleIsView = (record) => {
    showActionIndex.value = null
    isView.value = !isView.value
    selected.value = (isView.value) ? record : {}
    if (!isView.value) {
      getSearchResults()
    }
  }

  const pressEnter = (event) => {
    if (event.code === "Enter") {
      getSearchResults();
    }
  };

  const getSearchResults = async () => {
    resetSearchParams()
    isLoading.value = true
    searchResults.value = []
    switch (searchfilter){
      case "subject":
        searchParams.subject = searchtext
        break
      case "message":
        searchParams.message = searchtext
        break
      default:
        searchParams.typeof = searchtext
        break
    }
    
    const response = await HTTP().post('/api/notifications/search', searchParams).then(
      (response) => {
        return response;
      }).catch((error) => {
        return error.response;
      })
    searchResults.value = (response.status === 200) ? response.data : []
    isLoading.value = false
    if (response.status !== 200){
      showAlert({
        titleText: 'Failed',
        text: response?.data?.error,
        icon: 'error',
      })
    }
  }

  const updateWorkflow = async (id, status) => {
    showActionIndex.value = null
    let response = await HTTP().put('/api/notification/'+id, {workflow: status}).then(
      (response) => {
        return response;
      }).catch((error) => {
        return error.response;
      }
    );  
    showAlert({
      titleText: (response.status == 200 ? 'Success' : 'Failed'),
      text: (response.status == 200 ? response?.data?.message : response?.data?.error),
      icon: (response.status == 200 ? 'success' : 'error'),
    })
    isLoading.value = false;
    getSearchResults()
  }
</script>
