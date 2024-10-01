<script setup lang="js">
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
  <p>FORM ELEMENT</p>
  <ul class="form-block">
    <li class="form-element">
      <p class="margin">{{ date }}</p>
      <div>
        <ul>
          <li v-for="title in titles" v-bind:key="title.id">
            <h5>{{ title }}</h5>
          </li>
        </ul>
      </div>
      <div>
        <ul>
          <li v-for="today in todayWeather" v-bind:key="today.id">
            <h5>{{ today }}</h5>
          </li>
        </ul>
      </div>
      <div>
        <ul>
          <li v-for="afterTitle in afterTitles" v-bind:key="afterTitle.id">
            <h5>{{ afterTitle }}</h5>
          </li>
        </ul>
      </div>
    </li>

    <li class="form-element" v-for="forecast in weatherForecast" v-bind:key="forecast.id">
      <p class="margin">{{ new Date(forecast.dt * 1000).toLocaleDateString() }}</p>
      <div>
        <ul>
          <li v-for="title in titles" v-bind:key="title.id">
            <h5>{{ title }}</h5>
          </li>
        </ul>
      </div>
      <div>
        <ul>
          <li>
            <h5>{{ forecast.main.temp }}</h5>
            <h5>{{ forecast.main.humidity }}</h5>
          </li>
        </ul>
      </div>
      <div>
        <ul>
          <li v-for="afterTitle in afterTitles" v-bind:key="afterTitle.id">
            <h5>{{ afterTitle }}</h5>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<style lang="sass">
li
  display: block
  font-size: 16px
  color: black

.form-block
  display: flex
  flex-direction: column
  justify-content: flex-start
  width: 100%
  height: 360px
  padding: 0
  background: white
  overflow: scroll

.form-element
  display: inherit

.margin
  margin-left: 26px
  margin-top: 20px
</style>
