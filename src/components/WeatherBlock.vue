<script setup lang="js">
defineProps({
  date: {
    type: String,
  },
  forecast: {
    type: Object,
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
  },
  dataAttr: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <p class="form-element__date">{{ dataAttr === "today" ? date : new Date(forecast.dt * 1000).toLocaleDateString() }}</p>
  <div class="form-element__titles">
    <div v-for="title in titles" v-bind:key="title.id" class="form-element__title">
      <h5>{{ title }}</h5>
    </div>
  </div>
  <div class="form-element__datas">
    <div class="form-element__data">
      <template v-if="dataAttr === 'today'">
        <h5>{{ todayWeather.temp }}</h5>
        <h5>{{ todayWeather.humidity }}</h5>
      </template>
      <template v-else>
        <h5>{{ forecast.main.temp }}</h5>
        <h5>{{ forecast.main.humidity }}</h5>
      </template>
    </div>
  </div>
  <div class="form-element__metrics">
    <div v-for="afterTitle in afterTitles" v-bind:key="afterTitle.id" class="form-element__metric">
      <h5>{{ afterTitle }}</h5>
    </div>
  </div>
</template>
