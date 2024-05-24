<script setup>
defineProps({
  size: { default: 25 },
  color: { default: "grey" }
})
</script>
<template>
<svg :width="size" :height="size" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 27 27">
  <path d="M11.5757 1.42426C11.81 1.18995 12.1899 1.18995 12.4243 1.42426L22.5757 11.5757C22.81 11.81 22.8101 12.1899 22.5757 12.4243L12.4243 22.5757C12.19 22.81 11.8101 22.8101 11.5757 22.5757L1.42426 12.4243C1.18995 12.19 1.18995 11.8101 1.42426 11.5757L11.5757 1.42426Z" :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M8 12H17L12 7M17 12L12 16 " :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</template>
