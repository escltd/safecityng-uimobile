<template>
  <div class="w-100% h-screen z-10 flex items-center bg-modal absolute top-0 left-0 right-0 overflow-y-scroll">
    <div class="mx-auto md:max-w-100 md:min-w-80 w-70% max-h-[600px] rounded-6 bg-white p-8 overflow-y-scroll caret-transparent">
      <slot />
    </div>
  </div>
</template>
