<template>
  <div class="flex md:w-20% w-48% bg-zomp rounded-2 pb-1 m-2">
    <div class="flex flex-col text-center w-100% bg-white rounded-2 p-5" >
      <div class="font-semibold text-sm">{{name}}</div>
      <div class="text-13 font-bold py-3">
        {{ value > 0 ? value : 0 }}
      </div>
      <NuxtLink :to="link">
        <div class="flex flex-row justify-center items-center">
          <span class="text-4 font-semibold underline mr2">
            {{action}}
          </span>
          <span
            class="bg-zomp text-white text-5 flex item-center h-4 rounded px-1 flex items-center justify-center"
          >
            +
          </span>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const { name, link, action, value } = defineProps(["name", "link", "action", "value"]);
// const { name, link, action, value } = ["name", "link", "action", "value"];
</script>