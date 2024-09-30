<script setup lang="js">
import { useCounterStore } from "@/stores/counter";

const store = useCounterStore();

defineProps({
  reply: {
    type: String,
    required: true
  }
})
</script>

<template>
  <p>FORM ELEMENT</p>
  <p>The temreture is {{ store.todayWeather.temp }}</p>
</template>
