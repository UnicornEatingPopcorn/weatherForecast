<script setup lang="js">
import WeatherBlock from "./WeatherBlock.vue"

defineProps({
  coordinates: {
    type: Object,
    required: true,
    default: () => ({ lon: 0, lat: 0}),
  },
  todayWeather: {
    type: Object,
    required: true,
    default: () => ({ temp: 0, humidity: 0}),
  },
  date: {
    type: String,
    required: true,
  },
  isView: {
    type: Boolean,
    required: true,
  },
  weatherForecast: {
    type: Array,
    required: true,
  },
})

const titles = ["Tempreture", "Humidity"];
const afterTitles = ["°С", "%"];
</script>

<template>
  <div class="form-block">
    <div class="form-element" v-if="isView">
      <WeatherBlock
        :titles="titles"
        :todayWeather="todayWeather"
        :afterTitles="afterTitles"
        :date="date"
        data-attr="today"
      />
    </div>
    <div v-if="isView">
      <div class="form-element" v-for="forecast in weatherForecast" v-bind:key="forecast.id">
        <WeatherBlock
          :forecast="forecast"
          :titles="titles"
          :todayWeather="todayWeather"
          :afterTitles="afterTitles"
          data-attr="forecast"
        />
      </div>
    </div>
  </div>
</template>

<style lang="sass">
.form-block
  display: flex
  flex-direction: column
  justify-content: center
  width: 100%
  height: 360px
  padding: 20px
  background: #181818

.form-element
  display: grid
  grid-template-areas: "date title data metric"
  grid-template-columns: 2fr repeat(3, 1fr)
  grid-gap: 10px
  align-items: center
  font-size: 17px
  color: #9f9f9f
  padding: 5px 0 5px 35px
  border-bottom: 1px solid #216b4c7d
</style>
