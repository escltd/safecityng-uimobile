<template>
  <div class="w-full h-full">
    <GoogleMap :key="center.lng"
      :api-key="config.public.GOOGLE_MAPS_API_KEY"
      mapTypeId="terrain"
      style="width: 100%; height: 100%;"
      :center="center"
      :zoom="12"
      :disableDefaultUi="true"
    >
    
    <Marker v-for="(marker,index) in markers" :key="index" :options="marker">
      <InfoWindow v-model="marker.show" :position="marker.position">
        <div>
          <h1>{{ marker.title }}</h1>
        </div>
      </InfoWindow>
    </Marker>
    </GoogleMap>
  </div>
</template>
<script setup>
  import { GoogleMap, Marker, InfoWindow } from 'vue3-google-map'
  const config = useRuntimeConfig()

  let markers = reactive([]) 
  let center = reactive({ lat: 9.0563, lng: 7.491302 })

  const getLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        center.lat = position.coords.latitude
        center.lng = position.coords.longitude

        markers.push({
          id: 1,
          position: center,
          title: 'You are here!',
          position: center,
          show: true
        })
      })
    }
  }

  
  getLocation()
  

</script>