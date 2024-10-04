<script setup lang="js">
defineProps({
  forecast: {
    type: Object,
    required: true,
  },
  todayWeather: {
    type: Object,
    required: true,
  },
  titles: {
    type: Array,
    required: true,
  },
  afterTitles: {
    type: Array,
    required: true,
  }
})
</script>

<template>
  <p class="form-element__date">{{ new Date(forecast.dt * 1000).toLocaleDateString() }}</p>
  <div class="form-element__titles">
    <div v-for="title in titles" v-bind:key="title.id" class="form-element__title">
      <h5>{{ title }}</h5>
    </div>
  </div>
  <div class="form-element__datas">
    <div class="form-element__data">
      <h5>{{ forecast.main.temp }}</h5>
      <h5>{{ forecast.main.humidity }}</h5>
    </div>
  </div>
  <div class="form-element__metrics">
    <div v-for="afterTitle in afterTitles" v-bind:key="afterTitle.id" class="form-element__metric">
      <h5>{{ afterTitle }}</h5>
    </div>
  </div>
</template>
